import { sql } from './connect';

export type SportsSelection = {
  id: number;
  name: string;
};

export async function getAllSports() {
  const sportsSelection = await sql<SportsSelection[]>`
    SELECT
      id,
      name
    FROM
      sports
  `;
  return sportsSelection;
}
