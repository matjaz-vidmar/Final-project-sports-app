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

// insert into sports(name) values ('archery'), ('badminton'), ('basketball'), ('fitness'), ('golf'), ('martial arts'), ('mountain climbing'), ('swimming'), ('tennis'), ('volleyball'), ('table tennis'),
