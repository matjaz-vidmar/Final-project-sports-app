import { css } from '@emotion/react';
import { Dropdown } from '@nextui-org/react';
import { GetServerSidePropsContext } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { useState } from 'react';
import { getSportById, Sport } from '../database/sports';
import { getUserBySessionToken, User } from '../database/users';
import { parseIntFromContextQuery } from '../utils/contextQuery';

type Props = {
  user?: User;
  sport: Sport;
};

export default function UserProfile(props: Props) {
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
    background-image: linear-gradient(to left, #553c9a, #2f88ff);
    color: transparent;
    background-clip: text;
    -webkit-background-clip: text;
  `;

  const personalInfoStyles = css`
    font-size: 30px;
    font-family: Verdana, Geneva, Tahoma, sans-serif;
  `;
  const buttonStyle = css`
    border-radius: 5px;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 200px;
    height: 50px;
    left: 85px;
    top: 250px;
    font-family: Verdana, Geneva, Tahoma, sans-serif;
    font-size: 25px;
    background-color: black;
    color: #fdfc8d;
    margin-top: 20px;
    :hover {
      background-color: #2f88ff;
      transition: 0.5s;
    }
  `;
  const buttonStyleSports = css`
    border-radius: 5px;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 250px;
    height: 50px;
    left: 85px;
    top: 250px;
    font-family: Verdana, Geneva, Tahoma, sans-serif;
    font-size: 25px;
    text-decoration: none;
    background-color: black;
    color: #fdfc8d;
    margin-top: 20px;
    :hover {
      background-color: #2f88ff;
      transition: 0.5s;
    }
  `;
  const gridWrapperStyle = css`
    display: grid;
    grid-template-columns: 1fr 1fr;
    padding-left: 20px;
  `;
  const [selected, setSelected] = useState(false);
  return (
    <>
      <Head>
        <meta name="description" content="Biography of the person" />
      </Head>
      <h2 css={h2Style}>Personal Profile</h2>
      <nav css={gridWrapperStyle}>
        <div css={personalInfoStyles}>
          Username: {props.user.username}
          <br />
          E-mail: vidmar@sports.io
          <br />
          Address: Alser Straße 21, <br />
          1080 Wien <br />
          Personal description: ...
          <button css={buttonStyle}>Delete user</button>
        </div>
        <div>
          <a href="./sports">
            <button css={buttonStyleSports}>Available sports</button>
          </a>
          <Dropdown>
            <Dropdown.Button
              flat
              color="secondary"
              css={{ tt: 'capitalize' }}
            ></Dropdown.Button>
            <Dropdown.Menu
              aria-label="Multiple selection actions"
              color="secondary"
              disallowEmptySelection
              selectionMode="multiple"
              // selectedKeys={selected}
              // onSelectionChange={setSelected}
            >
              <Dropdown.Item key="text">{props.sport.name}</Dropdown.Item>
              <Dropdown.Item key="number">Number</Dropdown.Item>
              <Dropdown.Item key="date">Date</Dropdown.Item>
              <Dropdown.Item key="single_date">Single Date</Dropdown.Item>
              <Dropdown.Item key="iteration">Iteration</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
      </nav>
    </>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const sportId = parseIntFromContextQuery(context.query.sportId);
  const token = context.req.cookies.sessionToken;

  const user = token && (await getUserBySessionToken(token));
  const sport = sportId && (await getSportById(sportId));

  if (typeof sport === 'undefined') {
    context.res.statusCode = 404;
    return {
      props: {
        error: 'Sport not found',
      },
    };
  }
  if (!user) {
    return {
      redirect: {
        destination: '/login?returnTo=/private-profile',
        permanent: false,
      },
    };
  }

  return {
    props: { user: user, sport: sport },
  };
}
