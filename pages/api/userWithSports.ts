import crypto from 'node:crypto';
import bcrypt from 'bcrypt';
import { NextApiRequest, NextApiResponse } from 'next';
import { createSession, getValidSessionByToken } from '../../database/sessions';
import { getSports } from '../../database/sports';
import { getUserByIdWithSports, getUserByUsername } from '../../database/users';
import { createSerializedRegisterSessionTokenCookie } from '../../utils/cookies';
import { createCsrfSecret } from '../../utils/csrf';

// export type UserWithSportsResponseBody =
//   | { errors: { message: string }[] }
//   | { user: { username: string } }
//   | { sport: { name: string } };

export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse,
  // <UserWithSportsResponseBody>,
) {
  const session =
    request.cookies.sessionToken &&
    (await getValidSessionByToken(request.cookies.sessionToken));

  if (!session) {
    response
      .status(400)
      .json({ errors: [{ message: 'No valid session token passed' }] });
    return;
  }

  if (request.method === 'GET') {
    const sports = await getSports();
    return response.status(200).json(sports);
  }
  if (request.method === 'POST') {
    console.log(request.body);
    // 1. make sure the data exist
    if (
      typeof request.body.username !== 'string' ||
      typeof request.body.password !== 'string' ||
      !request.body.username ||
      !request.body.password
    ) {
      return response
        .status(400)
        .json({ errors: [{ message: 'username or password not provided' }] });
    }
    // 2.we check if the user already exist
    const user = await getUserByUsername(request.body.username);

    if (user) {
      return response
        .status(401)
        .json({ errors: [{ message: 'username is already taken' }] });
    }
//   //   const userWithSports = await getUserByIdWithSports(request.body.id);
//   //   response.status(200).json({ user: { username: userWithSports } });
//   // } else {
//   //   response.status(401).json({ errors: [{ message: 'Method not allowed' }] });
 }
// }