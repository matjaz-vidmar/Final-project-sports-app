import { NextApiRequest, NextApiResponse } from 'next';
import { getValidSessionByToken } from '../../../database/sessions';
import { getSportByIdAndValidSessionToken } from '../../../database/sports';
import { validateTokenWithSecret } from '../../../utils/csrf';

export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse,
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

  const sportId = Number(request.query.sportId);

  // check if the id is a number
  if (!sportId) {
    return response.status(404).json({ message: 'Not a valid Id' });
  }

  if (request.method === 'GET') {
    // no validation example
    // const animal = await getAnimalById(animalId);

    // TODO add an example of a query that requires session token validation
    const sport = await getSportByIdAndValidSessionToken(
      sportId,
      request.cookies.sessionToken,
    );

    // check if animal exists on the database
    if (!sport) {
      return response
        .status(404)
        .json({ message: 'Not a valid Id or not a valid session token' });
    }

    return response.status(200).json(sport);
  }

  // prevent the endpoint to be accessed by cross site requests
  const csrfToken = request.body?.csrfToken;

  if (!(await validateTokenWithSecret(session.csrfSecret, csrfToken))) {
    return response.status(401).json({ message: 'csrf_token is not valid' });
  }
}
