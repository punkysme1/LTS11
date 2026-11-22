-- Migration: Lightweight aggregation RPC for Turots Home (/) and Profile (/profil) pages (PRF-01)
-- Eliminates full-database & full-turots_pages download on landing pages.

BEGIN;

CREATE OR REPLACE FUNCTION public.get_turots_home_summary()
RETURNS jsonb
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = ''
AS $$
  WITH published_bundles AS (
    SELECT
      b.id,
      b.bundle_code,
      b.display_title,
      coalesce(nullif(btrim(b.affiliation), ''), nullif(btrim(c.source_project), ''), 'Lainnya') AS affiliation_name,
      c.name AS collection_name
    FROM public.turots_bundles b
    LEFT JOIN public.turots_collections c ON c.id = b.collection_id
    WHERE b.publication_status = 'published'
      AND b.access_level IN ('public_preview', 'public_full')
  ),
  published_units AS (
    SELECT
      u.id,
      u.bundle_id,
      u.display_id,
      u.title_original,
      nullif(btrim(u.category_primary), '') AS category_primary,
      b.bundle_code,
      b.display_title,
      b.collection_name
    FROM public.turots_text_units u
    JOIN published_bundles b ON b.id = u.bundle_id
    WHERE u.archived_at IS NULL
      AND u.metadata_status IN ('imported', 'curated', 'verified')
  ),
  page_totals AS (
    SELECT count(*)::bigint AS total_pages
    FROM public.turots_pages p
    JOIN published_bundles b ON b.id = p.bundle_id
    WHERE p.source_missing_at IS NULL
      AND p.access_level IN ('public_preview', 'public_full')
  ),
  affiliation_counts AS (
    SELECT
      affiliation_name AS name,
      count(*)::bigint AS count
    FROM published_bundles
    GROUP BY affiliation_name
    ORDER BY count(*) DESC, affiliation_name ASC
  ),
  category_counts AS (
    SELECT
      category_primary AS name,
      count(*)::bigint AS count
    FROM published_units
    WHERE category_primary IS NOT NULL
    GROUP BY category_primary
    ORDER BY count(*) DESC, category_primary ASC
    LIMIT 8
  ),
  popular_units AS (
    SELECT
      u.id AS text_unit_id,
      u.bundle_id,
      u.bundle_code,
      u.display_id,
      u.title_original,
      u.display_title,
      u.category_primary,
      u.collection_name,
      count(v.visitor_id)::bigint AS views
    FROM published_units u
    LEFT JOIN public.turots_monthly_manuscript_views v
      ON v.text_unit_id = u.id
     AND v.view_month = date_trunc('month', now() AT TIME ZONE 'Asia/Bangkok')::date
    GROUP BY
      u.id,
      u.bundle_id,
      u.bundle_code,
      u.display_id,
      u.title_original,
      u.display_title,
      u.category_primary,
      u.collection_name
    ORDER BY count(v.visitor_id) DESC, u.title_original ASC
    LIMIT 10
  ),
  popular_with_covers AS (
    SELECT
      p.text_unit_id,
      p.bundle_id,
      p.bundle_code,
      p.display_id,
      p.title_original,
      p.display_title,
      p.category_primary,
      p.collection_name,
      p.views,
      coalesce(unit_cover.cover_url, bundle_cover.cover_url) AS cover_url
    FROM popular_units p
    LEFT JOIN LATERAL (
      SELECT coalesce(nullif(pg.thumbnail_url, ''), nullif(pg.image_url, '')) AS cover_url
      FROM public.turots_pages pg
      WHERE pg.bundle_id = p.bundle_id
        AND pg.text_unit_id = p.text_unit_id
        AND pg.source_missing_at IS NULL
        AND pg.access_level IN ('public_preview', 'public_full')
        AND coalesce(nullif(pg.thumbnail_url, ''), nullif(pg.image_url, '')) IS NOT NULL
      ORDER BY pg.page_order ASC, pg.id ASC
      LIMIT 1
    ) unit_cover ON true
    LEFT JOIN LATERAL (
      SELECT coalesce(nullif(pg.thumbnail_url, ''), nullif(pg.image_url, '')) AS cover_url
      FROM public.turots_pages pg
      WHERE pg.bundle_id = p.bundle_id
        AND pg.source_missing_at IS NULL
        AND pg.access_level IN ('public_preview', 'public_full')
        AND coalesce(nullif(pg.thumbnail_url, ''), nullif(pg.image_url, '')) IS NOT NULL
      ORDER BY pg.page_order ASC, pg.id ASC
      LIMIT 1
    ) bundle_cover ON unit_cover.cover_url IS NULL
  )
  SELECT jsonb_build_object(
    'stats', jsonb_build_object(
      'titles', (SELECT count(*)::bigint FROM published_units),
      'bundles', (SELECT count(*)::bigint FROM published_bundles),
      'pages', coalesce((SELECT total_pages FROM page_totals), 0),
      'categories', (SELECT count(DISTINCT category_primary)::bigint FROM published_units WHERE category_primary IS NOT NULL)
    ),
    'affiliations', coalesce(
      (SELECT jsonb_agg(jsonb_build_object('name', name, 'count', count) ORDER BY count DESC, name ASC) FROM affiliation_counts),
      '[]'::jsonb
    ),
    'categories', coalesce(
      (SELECT jsonb_agg(jsonb_build_object('name', name, 'count', count) ORDER BY count DESC, name ASC) FROM category_counts),
      '[]'::jsonb
    ),
    'popular', coalesce(
      (SELECT jsonb_agg(
        jsonb_build_object(
          'text_unit_id', text_unit_id,
          'bundle_id', bundle_id,
          'bundle_code', bundle_code,
          'display_id', display_id,
          'title_original', title_original,
          'display_title', display_title,
          'category_primary', category_primary,
          'collection_name', collection_name,
          'views', views,
          'cover_url', cover_url
        )
        ORDER BY views DESC, title_original ASC
      ) FROM popular_with_covers),
      '[]'::jsonb
    )
  );
$$;

REVOKE ALL ON FUNCTION public.get_turots_home_summary() FROM public;
GRANT EXECUTE ON FUNCTION public.get_turots_home_summary() TO anon, authenticated;

NOTIFY pgrst, 'reload schema';

COMMIT;
