import { css } from '@emotion/react';
import { GetServerSidePropsContext, GetServerSidePropsResult } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { getSportById, Sport } from '../../database/sports';
import { parseIntFromContextQuery } from '../../utils/contextQuery';

type Props =
  | {
      sport: Sport;
    }
  | {
      error: string;
    };

export default function SingleSport(props: Props) {
  if ('error' in props) {
    return (
      <div>
        <Head>
          <title>Sport not found</title>
          <meta name="sport" content="Sport not found" />
        </Head>
        <h1>{props.error}</h1>
        Sorry, try the <Link href="/sports">sports page </Link>
      </div>
    );
  }

  return (
    <div>
      <title>{props.sport.name}</title>
      <meta name="sport" content={`${props.sport.name} `} />

      <h2>{props.sport.name}</h2>

      <div>Id: {props.sport.id}</div>
      <div>Name: {props.sport.name}</div>
    </div>
  );
}

export async function getServerSideProps(
  context: GetServerSidePropsContext,
): Promise<GetServerSidePropsResult<Props>> {
  const sportId = parseIntFromContextQuery(context.query.sportId);

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
      sport: foundSport,
    },
  };
}
