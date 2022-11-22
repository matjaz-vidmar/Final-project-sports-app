import { sql } from './connect';
import { Sport, SportWithVenues } from './sports';
import { SelectedValue } from './sportsSelection';

export type User = {
  id: number;
  username: string;
  passwordHash: string;
  email: string;
  address: string;
  sportsSelection: SelectedValue[];
};

export type UserWithSports = {
  userId: number;
  userUsername: string;
  sportsId: string;
  sportName: string;
};

export type MatchedUsersContent = {
  id: number;
  username: string;
};

export async function getUserByUsername(username: string) {
  if (!username) return undefined;
  const [user] = await sql<{ id: number; username: string }[]>`
  SELECT
    id,
    username,
    email,
    address,
    sports_selection
  FROM
    users
  WHERE
    users.username = ${username}
  `;
  return user;
}
export async function getUserWithPasswordHashByUsername(username: string) {
  if (!username) return undefined;

  const [user] = await sql<User[]>`
  SELECT
    *
  FROM
    users
  WHERE
    users.username = ${username}
  `;

  return user;
}

export async function getEmailAddress(email: string) {
  if (!email) return undefined;

  const emailAddress = await sql<User[]>`
SELECT
  email
FROM
  users
WHERE
  email = ${email}
  `;
  return emailAddress;
}

export async function getUsers() {
  const users = await sql<{ id: number; username: string }[]>`
  SELECT
    id,
    username
  FROM
    users
`;
  return users;
}
export async function getAddress(address: string) {
  if (!address) return undefined;

  const addressPlace: string = await sql<[User[]]>`
SELECT
  address
FROM
  users
WHERE
  address = ${address}
  `;
  return addressPlace;
}
export async function getUserBySessionToken(token: string) {
  if (!token) return undefined;

  const [user] = await sql<
    {
      id: number;
      username: string;
      email: string;
      address: string;
      selectedValue: [];
    }[]
  >`
  SELECT
    users.id,
    users.username,
    users.email,
    users.address,
    sports_selection
  FROM
    users,
    sessions
  WHERE
    sessions.token = ${token} AND
    sessions.user_id = users.id AND
    sessions.expiry_timestamp > now();
  `;
  return user;
}

export async function createUser(
  username: string,
  password_hash: string,
  email: string,
  address: string,
  selectedValue: [],
) {
  const [userWithoutPassword] = await sql<
    {
      id: number;
      username: string;
      email: string;
      address: string;
      selectedValue: [];
    }[]
  >`
   INSERT INTO users
    (username, password_hash, email, address, sports_selection)
    VALUES
    (${username}, ${password_hash}, ${email}, ${address}, ${selectedValue})
    RETURNING
    id,
    username,
    email,
    address,
    sports_selection
  `;
  return userWithoutPassword!;
}
export async function getUserBySportId(sportId: Sport['id']) {
  const userWithSports = await sql<User[]>`
    SELECT
      users.*,
      sports.*,
      sports_selection.*
    FROM
      users
      sports
    WHERE
     users.sports_selection.id =${sportId}

  `;
  return userWithSports;
}

export async function getMatchedUserSportsByUsername(username: string) {
  if (!username) return undefined;
  const matchedUsers = await sql<MatchedUsersContent[]>`
      -- SELECT
      --   users.username AS username,
      --   users.sports_selection AS sportsSelection
      -- FROM
      --   users AS users_1
      -- LEFT JOIN
      --   users.username ON users_1
      -- WHERE
      --   users.username = ${username} AND
      --   users.sports_selection = sportsSelection

      SELECT
        users.username,
        users.sports_selection,
        sports_selection.name
      FROM users AS users_1
      LEFT JOIN users_2 ON users_1.username = users.username AND users_1.sports_selection = sports_selection

    `;
  return [matchedUsers];
}
