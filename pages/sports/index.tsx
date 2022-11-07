import { css } from '@emotion/react';
import { GetServerSidePropsResult } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { getSports, Sport } from '../../database/sports';

const sportStyles = css`
  border-radius: 15px;
  border: 1px solid #ccc;
  padding: 20px;

  h2 {
    margin-top: 0;
  }

  & + & {
    margin-top: 25px;
  }
`;

type Props = {
  sports: Sport[];
};

export default function Sports(props: Props) {
  return (
    <>
      <Head>
        <title>All of the sports</title>
        <meta name="description" content="List page of all sports" />
      </Head>

      <h1>Sports</h1>

      {props.sports.map((sport) => {
        return (
          <div
            data-test-id={`sport-name-${sport.name}`}
            key={`sport-${sport.id}`}
            css={sportStyles}
          >
            <h2>
              <Link href={`/sports/${sport.id}`}>{sport.name}</Link>
            </h2>

            <Link href={`/sports/${sport.id}`}>
              <a>
                {/* <Image
                  src={`/${sport.id}-${sport.name.toLowerCase()}.jpeg`}
                  alt=""
                  width="150"
                  height="150"
                /> */}
              </a>
            </Link>

            <div>Type: {sport.name}</div>
          </div>
        );
      })}
    </>
  );
}

export async function getServerSideProps(): Promise<
  GetServerSidePropsResult<Props>
> {
  const sports = await getSports();
  return {
    props: {
      sports: sports,
    },
  };
}
