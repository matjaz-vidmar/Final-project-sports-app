import { sql } from './connect';

export type Sport = {
  id: number;
  name: string;
};

export async function getSports() {
  const sports = await sql<Sport[]>`
    SELECT
      *
    FROM
      sports
  `;
  return sports;
}
export async function getSportByIdAndValidSessionToken(
  id: number,
  token: string | undefined,
) {
  if (!token) return undefined;
  // STRETCH: Update this adding a role to the users and matching it with the session token
  const [sport] = await sql<Sport[]>`
    SELECT
      sports.*
    FROM
      sports,
      sessions
    WHERE
      sessions.token = ${token}
    AND
      sessions.expiry_timestamp > now()
    AND
      sports.id = ${id}
  `;
  return sport;
}

export async function getSportById(id: number) {
  const [sport] = await sql<Sport[]>`
    SELECT
      *
    FROM
      sports
    WHERE
      id = ${id}
  `;
  return sport;
}
