import { css } from '@emotion/react';
import { Dropdown, StyledUserName } from '@nextui-org/react';
import { validateHeaderValue } from 'http';
import { GetServerSidePropsContext } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useMemo, useState } from 'react';
import { getSportById, getSports, Sport } from '../database/sports';
import {
  getMatchedUserSportsByUsername,
  getUserBySessionToken,
  User,
} from '../database/users';
import badminton2 from '../public/badminton2.svg';
import basketball3 from '../public/basketball3.svg';
import fitness4 from '../public/fitness4.svg';
import golf5 from '../public/golf5.svg';
import archery1 from '../public/icons/archery1.svg';
import martialArts6 from '../public/martialArts6.svg';
import mountainClimbing7 from '../public/mountainClimbing7.svg';
import swimming8 from '../public/swimming8.svg';
import tableTennis11 from '../public/tableTennis11.svg';
import tennis9 from '../public/tennis9.svg';
import volleyball10 from '../public/volleyball10.svg';
import { parseIntFromContextQuery } from '../utils/contextQuery';
import Sports from './sports';

type Props = {
  user?: User;
  sport?: Sport;
  matchedUser?: User;
  refreshUserProfile: () => Promise<void>;
};

export default function UserProfile(props: Props) {
  const [errors, setErrors] = useState<{ message: string }[]>([]);
  const router = useRouter();

  // async function saveSportsHandler() {
  //   const saveSportsResponse = await fetch('api/userWithSports', {
  //     method: 'POST',
  //     headers: {
  //       'content-type': 'application/json',
  //     },
  //     body: JSON.stringify({
  //       sportId: selectedValue,
  //     }),
  //   });
  //   const saveSportsResponseBody =
  //     (await saveSportsResponse.json()) as userWiResponseBody;
  //   if ('errors' in saveSportsResponseBody) {
  //     return console.log(saveSportsResponseBody.errors);
  //     await props.refreshUserProfile();
  //   }
  // }
  if (!props.user) {
    return (
      <div>
        <title>User not found</title>
        <meta name="description" content="User not found" />
        <h1>404 - User not found</h1>
        Better luck next time
      </div>
    );
  }

  const h2Style = css`
    font-family: Verdana, Geneva, Tahoma, sans-serif;
    padding-top: 30px;
    font-size: 50px;
    display: flex;
    justify-content: center;
    font-size: 70px;
    font-weight: 600;
    color: #1a2169;
    background-clip: text;
    -webkit-background-clip: text;
  `;
  const h3Style = css`
    font-family: Verdana, Geneva, Tahoma, sans-serif;
    padding-top: 30px;
    display: flex;
    justify-content: center;
    font-size: 35px;
    font-weight: 600;

    color: #1a2169;
  `;

  const personalInfoStyles = css`
    font-size: 20px;
    font-family: Verdana, Geneva, Tahoma, sans-serif;
    display: flex;
    justify-content: center;
    flex-direction: column;
    text-align: center;
    align-items: center;
    background: #dcdcdc;
    margin: 40px;
    border: solid;
    h4 {
      margin: 20px;
    }
  `;

  const buttonStyleSports = css`
    border-radius: 5px;
    width: 250px;
    height: 50px;
    margin-top: 50px;
    margin-bottom: 30px;
    font-family: Verdana, Geneva, Tahoma, sans-serif;
    font-size: 25px;
    text-decoration: none;
    background-color: #1a2169;
    color: white;
    :hover {
      background-color: #dcdcdc;
      color: black;
      transition: 0.5s;
    }
  `;

  const gridWrapperStyle = css`
    display: grid;
    grid-template-columns: 1fr 1fr;
    align-items: center;
    padding-left: 20px;
  `;

  return (
    <>
      <Head>
        <meta name="description" content="Biography of the person" />
      </Head>
      <h2 css={h2Style}>Personal Profile</h2>
      <nav css={gridWrapperStyle}>
        <div css={personalInfoStyles}>
          <h4> Username:</h4> {props.user.username}
          <br />
          <h4>E-mail:</h4> {props.user.email}
          <br />
          <h4>Address:</h4> {props.user.address} <br />
          <button css={buttonStyleSports}>Delete user</button>
        </div>

        <div css={personalInfoStyles}>
          <label>
            <h3 css={h3Style}>Selected sports:</h3>
          </label>
          <br /> <h3>{props.user.sportsSelection}</h3>
          <h3 css={h3Style}>Find partners for each selected sport:</h3>
          <Link href="./sports">
            <button css={buttonStyleSports}>Available sports</button>
          </Link>
        </div>
      </nav>
    </>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const token = context.req.cookies.sessionToken;
  const user = token && (await getUserBySessionToken(token));
  const sport = await getSports();
  // const matchedUsers = await getMatchedUserSportsByUsername(username);

  if (!user) {
    return {
      redirect: {
        destination: '/login?returnTo=/private-profile',
        permanent: false,
      },
    };
  }

  return {
    props: {
      user,
      sport,
    },
  };
}
