import type { VillageOrgStructure, OfficialItem, OfficialCategory } from '@/types/profile';

export interface DatabaseOfficialRow {
  id: string;
  name: string;
  role: string;
  category: OfficialCategory;
  image_url: string | null;
  hierarchy_level: number;
  order_index: number;
}

export function transformOfficialsData(
  rows: DatabaseOfficialRow[] | null
): VillageOrgStructure | null {
  if (!rows || rows.length === 0) {
    return null;
  }

  const mapItem = (row: DatabaseOfficialRow): OfficialItem => ({
    id: row.id,
    name: row.name,
    role: row.role,
    category: row.category,
    photoUrl: row.image_url || undefined,
    hierarchyLevel: row.hierarchy_level,
  });

  // Level 1: Kepala Desa
  const headRow = rows.find(
    (r) =>
      r.hierarchy_level === 1 ||
      r.category === 'pimpinan' ||
      r.role.toLowerCase().includes('kepala desa')
  );
  const head = headRow ? mapItem(headRow) : null;

  // Level 2: Sekretaris Desa
  const secretaryRow = rows.find(
    (r) =>
      (r.hierarchy_level === 2 && r.id !== headRow?.id) ||
      (r.role.toLowerCase().includes('sekretaris') && r.id !== headRow?.id)
  );
  const secretary = secretaryRow ? mapItem(secretaryRow) : null;

  // Level 3: Urusan Kesekretariatan (Kaur)
  const kaursRows = rows.filter(
    (r) =>
      r.id !== headRow?.id &&
      r.id !== secretaryRow?.id &&
      (r.category === 'sekretariat' ||
        r.role.toLowerCase().startsWith('kaur') ||
        (r.hierarchy_level === 3 && r.role.toLowerCase().includes('urusan')))
  );
  const kaurs = kaursRows.map(mapItem);

  // Level 3: Pelaksana Teknis (Kasi)
  const kasisRows = rows.filter(
    (r) =>
      r.id !== headRow?.id &&
      r.id !== secretaryRow?.id &&
      !kaursRows.some((k) => k.id === r.id) &&
      (r.category === 'teknis' ||
        r.role.toLowerCase().startsWith('kasi') ||
        r.role.toLowerCase().includes('seksi'))
  );
  const kasis = kasisRows.map(mapItem);

  // Level 4: Pelaksana Kewilayahan (Kadus)
  const kadusesRows = rows.filter(
    (r) =>
      r.id !== headRow?.id &&
      r.id !== secretaryRow?.id &&
      !kaursRows.some((k) => k.id === r.id) &&
      !kasisRows.some((ks) => ks.id === r.id) &&
      (r.category === 'kewilayahan' ||
        r.hierarchy_level === 4 ||
        r.role.toLowerCase().startsWith('kadus') ||
        r.role.toLowerCase().includes('kepala dusun') ||
        r.role.toLowerCase().includes('dusun'))
  );
  const kaduses = kadusesRows.map(mapItem);

  return {
    head,
    secretary,
    kaurs,
    kasis,
    kaduses,
  };
}
