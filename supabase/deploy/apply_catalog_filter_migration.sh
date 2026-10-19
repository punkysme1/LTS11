#!/usr/bin/env bash
set -euo pipefail

ROOT="$(cd -- "$(dirname -- "${BASH_SOURCE[0]}")" && pwd)"
SQL_FILE="$ROOT/20261019120000_turots_catalog_filter_improvements.sql"
BACKUP_DIR=/opt/naracode/backups/turots
DB_CONTAINER=supabase-db

test -s "$SQL_FILE"
sudo docker inspect "$DB_CONTAINER" >/dev/null

STAMP=$(date +%Y%m%d-%H%M%S)
BACKUP="$BACKUP_DIR/catalog-filter-before-$STAMP.dump"
sudo mkdir -p "$BACKUP_DIR"
echo "Membuat backup database: $BACKUP"
sudo docker exec -i "$DB_CONTAINER" pg_dump -Fc -U supabase_admin -d postgres > "$BACKUP"
test -s "$BACKUP"
sudo docker exec -i "$DB_CONTAINER" pg_restore --list < "$BACKUP" >/dev/null
echo "Backup valid. Menerapkan migrasi katalog..."
sudo docker exec -i "$DB_CONTAINER" psql -X -v ON_ERROR_STOP=1 -U supabase_admin -d postgres < "$SQL_FILE"
sudo docker exec "$DB_CONTAINER" psql -X -v ON_ERROR_STOP=1 -U supabase_admin -d postgres -c "NOTIFY pgrst, 'reload schema';"
echo "Memastikan fungsi filter tersedia..."
sudo docker exec "$DB_CONTAINER" psql -X -v ON_ERROR_STOP=1 -U supabase_admin -d postgres -Atc "select to_regprocedure('public.search_turots_catalog(text,text,text,text,text,text,text,text,text,text,text,integer,integer)') is not null and to_regprocedure('public.get_turots_catalog_filter_options()') is not null;" | grep -qx t
echo "Selesai. Backup database: $BACKUP"
