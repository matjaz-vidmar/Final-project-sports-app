import { css } from '@emotion/react';
import { Dropdown, StyledUserName } from '@nextui-org/react';
import { validateHeaderValue } from 'http';
import { GetServerSidePropsContext } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useMemo, useState } from 'react';
import { getSportById, getSports, Sport } from '../database/sports';
import { getUserBySessionToken, User } from '../database/users';
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
  refreshUserProfile: () => Promise<void>;
};

export default function UserProfile(props: Props) {
  // const [username, setUsername] = useState('');
  // const [password, setPassword] = useState('');
  // const [email, setEmail] = useState('');
  // const [address, setAddress] = useState('');
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
    margin-bottom: 20px;
    font-family: Verdana, Geneva, Tahoma, sans-serif;
    font-size: 25px;
    a {
      text-decoration: none;
      color: #fdfc8d;
    }
    background-color: black;
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
  const [selected, setSelected] = useState(new Set([]));
  const selectedValue = useMemo(
    () => Array.from(selected).join(', ').replaceAll('_', ' '),
    [selected],
  );
  console.log(selectedValue);
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
          E-mail: {props.user.email}
          <br />
          Address: {props.user.address} <br />
          <button css={buttonStyle}>Delete user</button>
        </div>
        <div>
          <button css={buttonStyleSports}>
            <a href="./sports">Available sports</a>
          </button>

          <Dropdown>
            <Dropdown.Button shadow color="primary" css={{ tt: 'capitalize' }}>
              {selectedValue}
            </Dropdown.Button>

            <Dropdown.Menu
              aria-label="Multiple selection actions"
              background-color=" #2f88ff"
              disallowEmptySelection
              selectionMode="multiple"
              selectedKeys={selected}
              onSelectionChange={setSelected}
              text-color="primary"
              color="primary"
            >
              {props.sport?.map((sport) => {
                return (
                  <Dropdown.Item
                    key={sport.name}
                    textColor="default"
                    variant="flat"
                  >
                    {sport?.name}
                  </Dropdown.Item>
                );
              })}
            </Dropdown.Menu>
          </Dropdown>
          <button
            css={buttonStyleSports}
            onClick={async () => {
              await saveSportsHandler();
            }}
          >
            <a>Confirm selection</a>
          </button>
        </div>
      </nav>
    </>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const token = context.req.cookies.sessionToken;
  const user = token && (await getUserBySessionToken(token));
  const sport = await getSports();

  if (!user) {
    return {
      redirect: {
        destination: '/login?returnTo=/private-profile',
        permanent: false,
      },
    };
  }

  return {
    props: { user, sport },
  };
}
