import crypto from 'node:crypto';
import bcrypt from 'bcrypt';
import { NextApiRequest, NextApiResponse } from 'next';
import { createSession } from '../../database/sessions';
import {
  createUser,
  getAddress,
  getEmailAddress,
  getUserByIdWithSports,
  getUserByUsername,
} from '../../database/users';
import { createSerializedRegisterSessionTokenCookie } from '../../utils/cookies';
import { createCsrfSecret } from '../../utils/csrf';

export type RegisterResponseBody =
  | { errors: { message: string }[] }
  | { user: { username: string } };

export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse<RegisterResponseBody>,
) {
  if (request.method === 'POST') {
    // 1. make sure the data exist
    if (
      typeof request.body.username !== 'string' ||
      typeof request.body.password !== 'string' ||
      typeof request.body.email !== 'string' ||
      typeof request.body.address !== 'string' ||
      typeof request.body.sportsSelection !== 'string' ||
      !request.body.username ||
      !request.body.password ||
      !request.body.email ||
      !request.body.address ||
      !request.body.sportsSelection
    ) {
      return response.status(400).json({
        errors: [
          {
            message:
              'username, password, email, address or sports selection not provided',
          },
        ],
      });
    }
    // 2.we check if the user already exist
    // const userByIdWithSports = await getUserByIdWithSports(
    //   request.body.userId,
    //   request.cookies.sessionToken,
    // );

    // if (userByIdWithSports?.length) {
    //   return response
    //     .status(401)
    //     .json({ errors: [{ message: 'username is already taken' }] });
    // }

    // const userId = request.body?.userId;
    // const sportsSelection = request.body?.sportsSelection;

    // 2.we check if the user already exist
    const email = await getEmailAddress(request.body.email);

    if (!email) {
      return response.status(401).json({
        errors: [
          {
            message: 'e-mail format is not correct or e-mail is already taken',
          },
        ],
      });
    }
    const address = await getAddress(request.body.address);
    if (!address) {
      return response.status(401).json({
        errors: [
          {
            message: 'given address is already taken',
          },
        ],
      });
    }
    // 3. we hash the password
    const passwordHash = await bcrypt.hash(request.body.password, 12);

    // 4. sql query to create the record
    const userWithoutPassword = await createUser(
      request.body.username,
      passwordHash,
      request.body.email,
      request.body.address,
      request.body.sportsSelection,
    );

    // 5. create a csrf secret
    const secret = await createCsrfSecret();
    // 6.Create a session token and serialize a cookie with the token
    const session = await createSession(
      userWithoutPassword.id,
      crypto.randomBytes(80).toString('base64'),
      secret,
    );

    const serializedCookie = createSerializedRegisterSessionTokenCookie(
      session.token,
    );

    response
      .status(200)
      .setHeader('Set-Cookie', serializedCookie)
      .json({ user: { username: userWithoutPassword.username } });
  } else {
    response.status(401).json({ errors: [{ message: 'Method not allowed' }] });
  }
}
