#!/usr/bin/env bash
set -Eeuo pipefail
umask 077
task_dir="$(cd -- "$(dirname -- "${BASH_SOURCE[0]}")" && pwd)"
task_mode="${1:-check}"
task_container="${DB_CONTAINER:-supabase-db}"
task_database="${DB_NAME:-postgres}"
case "$task_mode" in check|apply) ;; *) printf 'Gunakan: bash run.sh check | apply\n' >&2; exit 2;; esac
cd "$task_dir"
sha256sum -c SHA256SUMS
sudo -v
psql_task() { sudo -n docker exec -i "$task_container" psql -X -w -U postgres -d "$task_database" -v ON_ERROR_STOP=1 "$@"; }
printf '\nMemeriksa database %s pada container %s (hanya baca).\n' "$task_database" "$task_container"
psql_task < preflight.sql
if [[ "$task_mode" == check ]]; then
  printf '\nBelum ada perubahan. Untuk menerapkan: bash "%s/run.sh" apply\n' "$task_dir"
  exit 0
fi
task_stamp="$(date -u +%Y%m%dT%H%M%SZ)"
task_backup_dir="$(mktemp -d "$task_dir/backup-${task_stamp}-XXXXXX")"
task_dump="$task_backup_dir/database-before.dump"
printf '\nMembuat backup lengkap database sebelum migrasi: %s\n' "$task_dump"
sudo -n docker exec "$task_container" pg_dump -w -U postgres -d "$task_database" -Fc > "$task_dump"
test -s "$task_dump"
sudo -n docker exec -i "$task_container" pg_restore --list < "$task_dump" > "$task_backup_dir/backup-contents.txt"
sha256sum "$task_dump" > "$task_backup_dir/backup.sha256"
printf '\nMenerapkan migrasi metadata Turots dalam satu transaksi.\n'
psql_task < 202611130001_turots_metadata_v2.sql 2>&1 | tee "$task_backup_dir/migration.log"
psql_task <<'SQL' | tee "$task_backup_dir/verification.txt"
select to_regprocedure('public.apply_turots_title_metadata_v2(jsonb)') rpc_baru;
select b.bundle_code,u.record_no,u.display_id,u.category_sequence_no,u.title_original
from public.turots_text_units u join public.turots_bundles b on b.id=u.bundle_id
where u.archived_at is null order by public.turots_affiliation_code(b.bundle_code),public.turots_natural_key(b.bundle_code),u.record_no limit 20;
select count(*) riwayat_nomor from public.turots_number_history;
select 'Migration selesai. Tidak ada frontend Cloudflare atau layanan lain yang dideploy.' status;
SQL
printf '\nBackup dan log: %s\nUji localhost; frontend publik tetap di Cloudflare.\n' "$task_backup_dir"
