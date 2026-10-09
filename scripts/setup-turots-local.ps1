param(
  [Parameter(Mandatory = $false)] [string]$SupabaseDir = 'C:\Naracode\Services\Supabase\turots-local\supabase',
  [Parameter(Mandatory = $false)] [string]$AdminUserId
)

$ErrorActionPreference = 'Stop'
$supabase = Get-Command supabase -ErrorAction SilentlyContinue
$runSupabase = {
  param([Parameter(ValueFromRemainingArguments = $true)] [string[]]$Arguments)
  if ($supabase) { & supabase @Arguments } else { & npx.cmd supabase @Arguments }
}
if (-not (Test-Path -LiteralPath $SupabaseDir)) { throw "Folder Supabase tidak ditemukan: $SupabaseDir" }

$projectDir = Split-Path -Parent $SupabaseDir
Push-Location $projectDir
try {
  & $runSupabase start
  & $runSupabase db reset
  if ($AdminUserId) {
    $sql = "insert into public.turots_admins (user_id, display_name) values ('$AdminUserId', 'Admin Turots') on conflict (user_id) do nothing;"
    & $runSupabase db execute --sql $sql
  }
  & $runSupabase status
} finally { Pop-Location }
