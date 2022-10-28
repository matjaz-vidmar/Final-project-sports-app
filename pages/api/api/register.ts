import { NextApiRequest, NextApiResponse } from 'next';

export type RegisterResponseBody =
  | { errors: { message: string }[] }
  | { user: { username: string } };

export default function handler(
  request: NextApiRequest,
  response: NextApiResponse<RegisterResponseBody>,
) {
  if (request.method === 'POST') {
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
  }
}
// 2.we check if the user already exist
const user = await getUserByUsername(request.body.username);
if (user) {
  return response
    .status(401)
    .json({ errors: [{ message: 'username is already taken' }] });
}

// 3. we hash the password
const passwordHash = await bcrypt.hash(request.body.password, 12);

// 4. sql query to create the record
const userWithoutPassword = await createUser(
  request.body.username,
  passwordHash,
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
