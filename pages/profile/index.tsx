import { css } from '@emotion/react';
import { GetServerSidePropsContext, GetServerSidePropsResult } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import {
  getUserBySessionToken,
  getUserByUsername,
  User,
} from '../../database/users';

const userStyles = css`
  border-radius: 15px;
  border: 1px solid #ccc;
  align-items: center;
  padding: 10px;
  display: flex;
  justify-content: center;
  justify-items: center;
  h2 {
    margin-left: 15px;
  }

  & + & {
    margin-top: 25px;
  }
`;
const h1Style = css`
  display: flex;
  justify-content: center;
`;

type Props = {
  user?: User[];
};

export default function Profile(props: Props) {
  if (!props.user) {
    return (
      <>
        <Head>
          <title>User not found</title>
          <meta name="description" content="User not found" />
        </Head>
        <h1>404 - User not found</h1>
      </>
    );
  }
  return (
    <>
      <Head>
        <title>User profile</title>
        <meta name="description" content="List page of all users" />
      </Head>

      <h1 css={h1Style}>{`${props.user.username}'s public profile`}</h1>

      {props.user.map((user) => {
        return (
          <div
            data-test-id={`sport-name-${user.username}`}
            key={`sport-${user.username}`}
            css={userStyles}
          >
            <h2>
              <Link href={`/profile/${user.username}`}>{user.username}</Link>
            </h2>
          </div>
        );
      })}
    </>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const username = context.query.username as string;
  const user = await getUserByUsername(username?.toLowerCase());
  if (!user) {
  }
  if (!user) {
    context.res.statusCode = 404;
    return { props: {} };
  }

  return {
    props: {
      user: username,
    },
  };
}
