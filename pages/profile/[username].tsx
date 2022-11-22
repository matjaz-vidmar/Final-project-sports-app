import { GetServerSidePropsContext } from 'next';
import Head from 'next/head';
import { getValidSessionByToken } from '../../database/sessions';
import { getUserByUsername, User } from '../../database/users';
import { createTokenFromSecret } from '../../utils/csrf';

type Props = {
  user?: User;
};

export default function UserProfile(props: Props) {
  if (!props.user) {
    return (
      <>
        <Head>
          <title>User not found</title>
          <meta name="description" content="User not found" />
        </Head>
        <h1>404 - User not found</h1>
        Better luck next time
      </>
    );
  }

  return (
    <>
      <Head>
        <title>Personal Information</title>
        <meta name="description" content="Biography of the person" />
      </Head>
      <h1>Personal Information</h1>
      id: {props.user.id} username: {props.user.username}
    </>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  // Retrieve the username from the URL
  const token = context.req.cookies.sessionToken;

  const session = token && (await getValidSessionByToken(token));

  if (!session) {
    context.res.statusCode = 401;
    return { props: { errors: [{ message: 'User not authorized' }] } };
  }
  console.log(context.query);
  const csrfToken = await createTokenFromSecret(session.csrfSecret);

  const user = await getUserByUsername(username);

  if (!user) {
    context.res.statusCode = 404;
    return { props: {} };
  }

  return {
    csrfToken,
    props: { user },
  };
}
