import { sql } from './connect';

export type Sport = {
  id: number;
  name: string;
};

export type Venue = {
  id: number;
  name1: string;
  address1: string;
  name2: string;
  address2: string;
};

export type SportWithVenues = {
  sportId: number;
  sportName: string;
  venueName1: string;
  venueAddress1: string;
  venueName2: string | null;
  venueAddress2: string | null;
};

export async function getSportsByIdWithVenues(sportId: number) {
  const sportWithVenues = await sql<SportWithVenues[]>`
    SELECT
      sports.id AS sport_id,
      sports.name AS sports_name,
      venues.name1 AS venues_name1,
      venues.address1 AS venues_address1,
      venues.name2 AS venues_name2,
      venues.address2 AS venues_address2
    FROM
      sports
    INNER JOIN
      sports_venues ON sports.id = sports_venues.sports_id
    INNER JOIN
      venues ON sports_venues.venues_id = foods.id
    WHERE
      sports.id = ${sportId}
`;
  return sportWithVenues;
}

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
