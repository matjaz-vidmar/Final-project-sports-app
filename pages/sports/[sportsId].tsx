import { css } from '@emotion/react';
import { GetServerSidePropsContext, GetServerSidePropsResult } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { relative } from 'path';
import { getSportById, Sport } from '../../database/sports';
import {
  getSportNameById,
  getUserBySportName,
  getUserByUsername,
  getUsers,
  User,
} from '../../database/users';
import { getVenuesBySportId, Venue } from '../../database/venues';
import { parseIntFromContextQuery } from '../../utils/contextQuery';

// type Props =
//   | {
//       error: string;
//     }
//   | {
//       singleSport: Sport;
//     }
//   | {
//       venueBySport: Venue[];
//     }
//   | {
//       userWithSports: User;
//     };

const sportDivStyle = css`
  display: grid;
  flex-direction: column;
  align-items: center;
  padding: 20px 20px;
  text-align: center;
  border-radius: 6px;
  border-style: solid;
`;
const h2Style = css`
  font-family: Verdana, Geneva, Tahoma, sans-serif;
  padding-top: 30px;
  font-size: 50px;
  display: flex;
  justify-content: center;
  font-size: 70px;
  font-weight: 600;
  background-image: linear-gradient(to left, #553c9a, #1e2789);
  color: transparent;
  background-clip: text;
  -webkit-background-clip: text;
`;
const navStyle = css`
  width: 100%;
  height: 100%;
  position: relative;

  overflow: hidden;
`;
const navUserVenue = css`
  display: grid;
  grid-template-columns: 1fr 1fr;
  align-items: flex-start;
`;
const h3Style = css`
  font-family: Verdana, Geneva, Tahoma, sans-serif;
  padding-top: 30px;
  display: flex;
  justify-content: flex-start;
  font-size: 35px;
  font-weight: 600;
  padding-bottom: 30px;
  color: #1e2789;
  background-clip: text;
  -webkit-background-clip: text;
`;
const divWrapper = css`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  font-size: large;
  align-items: center;
`;
const divStyleUserVenue = css`
  border-radius: 5px;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  border: solid 2px;
  width: 300px;
  height: 300px;
  margin: 15px;
  font-family: Verdana, Geneva, Tahoma, sans-serif;
  font-size: 20px;
  background-color: #dcdcdc;
`;
const emailButtonStyle = css`
  width: 90%;
  height: 38px;
  padding-left: 20px;
  align-content: center;
  font-weight: 700;
  font-size: 16px;
  background-image: url('/email.svg');
  background-repeat: no-repeat;
  background-size: 25px;
  background-position-y: center;
  background-position-x: 6px;
  :hover {
    text-decoration: underline;
  }
`;
export default function SingleSport(props) {
  const router = useRouter();
  if ('error' in props) {
    return (
      <div>
        <Head>
          <title>Sport not found</title>
        </Head>
        <meta name="sport" content="Sport not found" />
        <h1>{props.error}</h1>
        Sorry, try the <Link href="/sports">sports page </Link>
      </div>
    );
  }

  return (
    <div css={sportDivStyle}>
      <Head>
        <title>{props.singleSport.name}</title>
        <meta name="sport" content={`${props.singleSport.name}`} />
      </Head>
      <h2 css={h2Style}>{props.singleSport.name}</h2>
      <nav css={navStyle}>
        <Image
          src={`/../public/${props.singleSport.name}.png`}
          alt={props.singleSport.name}
          width={600}
          height={600}
          objectFit={'contain'}
        />
        <nav css={navUserVenue}>
          <div css={divWrapper}>
            <h3 css={h3Style}>Venues:</h3>
            {props.venueBySport.map((venue) => {
              return (
                <div css={divStyleUserVenue}>
                  <h4> {venue.name}</h4> {venue.address}
                </div>
              );
            })}
          </div>

          <div css={divWrapper}>
            <h3 css={h3Style}>Find your sports partners:</h3>
            {props.userWithSports.map((user) => {
              return (
                <div css={divStyleUserVenue}>
                  <h4>Username:</h4> {user.username} <br /> <h4>Address:</h4>
                  {user.address} <br /> <h4>Email:</h4>
                  <button
                    css={emailButtonStyle}
                    onClick={async () =>
                      await router.push(
                        `mailto:${user.email}?subject=Sportify&body=Hi, ${user.username}! Want to play sports with me? I like playing ${props.singleSport.name}!. Let's meet up at ${props.venueBySport[0].name}! See you soon!`,
                      )
                    }
                  >
                    {user.email}
                  </button>
                </div>
              );
            })}
          </div>
        </nav>
      </nav>
    </div>
  );
}

export async function getServerSideProps(
  context: GetServerSidePropsContext,
): Promise<GetServerSidePropsResult<Props>> {
  const sportId = parseIntFromContextQuery(context.query.sportsId);

  if (typeof sportId === 'undefined') {
    context.res.statusCode = 404;
    return {
      props: {
        error: 'Sport not found',
      },
    };
  }

  const foundSport = await getSportById(sportId);
  const foundSportWithVenue = await getVenuesBySportId(sportId);
  const sportName = await getSportNameById(sportId);
  const foundUserWithSports = await getUserBySportName(sportName[0].name);

  if (typeof foundSportWithVenue === 'undefined') {
    context.res.statusCode = 404;
    return {
      props: {
        error: 'Venue not found',
      },
    };
  }
  if (typeof foundSport === 'undefined') {
    context.res.statusCode = 404;
    return {
      props: {
        error: 'Sport not found',
      },
    };
  }

  return {
    props: {
      singleSport: foundSport,
      venueBySport: foundSportWithVenue,
      userWithSports: foundUserWithSports,
    },
  };
}
