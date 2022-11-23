import { css } from '@emotion/react';
import { GetServerSidePropsResult } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { getSports, Sport } from '../../database/sports';

const sportStyles = css`
  border-radius: 15px;
  border: 1px solid #ccc;
  align-items: center;
  padding: 10px;
  display: flex;
  justify-content: center;
  gap: 20px;

  font-family: Verdana, Geneva, Tahoma, sans-serif;
  padding-top: 30px;
  font-size: 30px;
  div {
    color: #1a2169;
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
  sports: Sport[];
};

export default function Sports(props: Props) {
  return (
    <>
      <Head>
        <title>All of the sports</title>
        <meta name="description" content="List page of all sports" />
      </Head>

      <h1 css={h1Style}>List of sports</h1>

      {props.sports.map((sport) => {
        return (
          <div
            data-test-id={`sport-name-${sport.name}`}
            key={`sport-${sport.id}`}
            css={sportStyles}
          >
            <Image
              height={40}
              width={40}
              src={`/../public/${sport.id}.png`}
              alt={`${sport.name}${sport.id}`}
            />

            <div>
              <Link href={`/sports/${sport.id}`}>{sport.name}</Link>
            </div>
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
