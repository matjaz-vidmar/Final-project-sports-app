import { sql } from './connect';

export type User = {
  id: number;
  username: string;
  passwordHash: string;
  email: string;
  address: string;
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
    username
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
export async function getUserBySessionToken(token: string) {
  if (!token) return undefined;

  const [user] = await sql<{ id: number; username: string }[]>`
  SELECT
    users.id,
    users.username

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
export async function createUser(username: string, password_hash: string) {
  const [userWithoutPassword] = await sql<{ id: number; username: string }[]>`
  INSERT INTO users
    (username, password_hash)
  VALUES
    (${username}, ${password_hash})
  RETURNING
    id,
    username
  `;

  return userWithoutPassword!;
}
export async function getUserByIdWithSports(userId: number) {
  const userWithSports = await sql<UserWithSports[]>`
    SELECT
      users.id AS user_id,
      users.username AS user_username,
      sports.id AS sports_id,
      sports.name AS sports_name
    FROM
      users
    INNER JOIN
      user_sports ON users.id = user_sports.users_id
    INNER JOIN
      sports ON user_sports.sport_id = sports.id
    WHERE
      users.id = ${userId}
  `;
  return userWithSports;
}
