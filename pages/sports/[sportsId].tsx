import { css } from '@emotion/react';
import { GetServerSidePropsContext, GetServerSidePropsResult } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { relative } from 'path';
import { inherits } from 'util';
import { getSportById, Sport } from '../../database/sports';
import { parseIntFromContextQuery } from '../../utils/contextQuery';

type Props =
  | {
      error: string;
    }
  | {
      singleSport: Sport;
    };
const sportDivStyle = css`
  display: grid;
  flex-direction: column;
  max-width: 600px;
  justify-content: center;
  align-items: center;
  padding: 20px 20px;
  margin-left: auto;
  margin-right: auto;
  text-align: center;
  border-radius: 6px;
  border-style: solid;
`;
const navStyle = css`
  width: 100%;
  height: 100%;
  position: relative;
  border-radius: 20px;
`;
export default function SingleSport(props: Props) {
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
      <h2>{props.singleSport.name}</h2>
      <nav css={navStyle}>
        <Image
          src={`/../public/${props.singleSport.name}.png`}
          alt={props.singleSport.name}
          width={500}
          height={500}
          objectFit={'contain'}
        />
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
    },
  };
}
