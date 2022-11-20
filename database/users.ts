import { sql } from './connect';
import { SportsSelection } from './sportsSelection';

export type User = {
  id: number;
  username: string;
  passwordHash: string;
  email: string;
  address: string;
  sportsSelection: SportsSelection[];
};

export type UserWithSports = {
  userId: number;
  userUsername: string;
  sportsId: string;
  sportName: string;
};

export async function getUserByUsername(username: string) {
  if (!username) return undefined;
  const [user] = await sql<{ id: number; username: string }[]>`
  SELECT
    id,
    username,
    email,
    address,
    sportsSelection
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
      sportsSelection: [];
    }[]
  >`
  SELECT
    users.id,
    users.username,
    email,
    address,
    sportsSelection
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
// export async function createUser(
//   username: string,
//   password_hash: string,
//   email: string,
//   address: string,
// ) {
//   const [userWithoutPassword] = await sql<
//     { id: number; username: string; email: string; address: string }[]>`
//   INSERT INTO users
//     (username, password_hash, email, address)
//   VALUES
//     (${username}, ${password_hash}, ${email}, ${address})
//   RETURNING
//     id,
//     username,
//     email,
//     address
//   `;

//   return userWithoutPassword!;
// }
export async function createUser(
  username: string,
  password_hash: string,
  email: string,
  address: string,
  sportsSelection: [],
) {
  const [userWithoutPassword] = await sql<
    {
      id: number;
      username: string;
      email: string;
      address: string;
      sportsSelection: [];
    }[]
  >`
   INSERT INTO users
    (username, password_hash, email, address, sportsSelection)
    VALUES
    (${username}, ${password_hash}, ${email}, ${address}, ${sportsSelection})
    RETURNING
    id,
    username,
    email,
    address,
    sportsSelection
  `;

  return userWithoutPassword!;
}
export async function getUserByIdWithSports(userId: number, token: string) {
  if (!token) return undefined;
  const userWithSports = await sql<UserWithSports[]>`
    SELECT
      users.id AS user_id,
      users.username AS user_username,
      sports.id AS sports_id,
      sports.name AS sports_name
    FROM
      users
      sports
    WHERE
      users.id = ${userId} AND
      sports.user_id = ${userId} AND
      sports.id = users_sports.sport.id
  `;
  return userWithSports;
}
// export async function getUserByIdWithSports(userId: number) {
//   const userWithSports = await sql<UserWithSports[]>`
//     SELECT
//       users.id AS user_id,
//       users.username AS user_username,
//       sports.id AS sports_id,
//       sports.name AS sports_name
//     FROM
//       users
//     INNER JOIN
//       user_sports ON users.id = user_sports.users_id
//     INNER JOIN
//       sports ON user_sports.sport_id = sports.id
//     WHERE
//       users.id = ${userId}
//   `;
//   return userWithSports;
// }
