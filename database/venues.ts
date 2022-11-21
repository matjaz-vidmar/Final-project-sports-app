import { sql } from './connect';

export type Venue = {
  id: number;
  sportId: number;
  name: string;
  address: string;
};

export async function getVenuesBySportId(sportId: number) {
  const venueBySport = await sql<Venue[]>`
    SELECT
      *
    FROM
      venues

    WHERE
      sport_id = ${sportId}

`;
  return venueBySport;
}
