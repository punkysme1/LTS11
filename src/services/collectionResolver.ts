type Collection = { id: string; code: string; name: string; source_project: string };
const clean = (value: string) => value.normalize('NFKC').trim().replace(/\s+/g, ' ');
const identity = (value: string) => clean(value).toLowerCase();

export async function resolveCatalogCollection(client: any, name: string, project: string): Promise<string> {
  name = clean(name); project = clean(project);
  if (!name || !project) throw new Error('Nama koleksi dan proyek wajib diisi.');
  const code = `${project.toUpperCase()}-${name.toUpperCase().replace(/\s+/g, '-')}`;
  async function findExisting() {
    const { data, error } = await client.from('turots_collections').select('id,code,name,source_project');
    if (error) throw error;
    const rows: Collection[] = data || [];
    const matches = rows.filter(row => identity(row.name) === identity(name) && identity(row.source_project) === identity(project));
    if (matches.length > 1) throw new Error(`Ada beberapa koleksi bernama ${name} pada proyek ${project}. Perlu pemeriksaan koleksi sebelum impor.`);
    if (matches.length === 1) return matches[0].id;
    const collision = rows.find(row => row.code === code);
    if (collision) throw new Error(`Kode koleksi ${code} sudah dipakai oleh ${collision.name} / ${collision.source_project}. Gunakan nama koleksi dan proyek tersebut jika memang koleksi yang sama.`);
    return null;
  }
  const existing = await findExisting();
  if (existing) return existing;
  const { data, error } = await client.from('turots_collections').insert({ code, name, source_project: project }).select('id').single();
  if (!error) return data.id;
  if (error.code === '23505') {
    const concurrent = await findExisting();
    if (concurrent) return concurrent;
  }
  throw error;
}
