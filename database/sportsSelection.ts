import { sql } from './connect';

export type SelectedValue = {
  id: number;
  name: string;
};

export async function getAllSports() {
  const selectedValue = await sql<SelectedValue[]>`
    SELECT
      id,
      name
    FROM
      sports
  `;
  return selectedValue;
}
