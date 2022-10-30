import { css } from '@emotion/react';
import Image from 'next/image';
import Link from 'next/link';
import Header from '../components/Header';
import iconArchery from '../public/iconArchery.svg';
import iconBadminton from '../public/iconBadminton.svg';
import iconBasketball from '../public/iconBasketball.svg';
import iconCycling from '../public/iconCycling.svg';
import iconFitness from '../public/iconFitness.svg';
import iconGolf from '../public/iconGolf.svg';
import iconJogging from '../public/iconJogging.svg';
import iconMartialArts from '../public/iconMartialArts.svg';
import iconMountainClimbing from '../public/iconMountainClimbing.svg';
import iconSwimming from '../public/iconSwimming.svg';
import iconTableTennis from '../public/iconTableTennis.svg';
import iconTennis from '../public/iconTennis.svg';
import iconVolleyBall from '../public/iconVolleyBall.svg';
import sportsBackground from '../public/sportsBackground.jpg';

const iconDivStyle = css`
  padding-left: 300 px;
  padding-right: 300 px;
  nav-up: 50 px;
  padding-top: 50px;
  display: flex;
  gap: 60 px;
  justify-content: center;
  align-items: stretch;
`;
const backgroundPicture = css`
  max-width: 100%;
  height: auto;
  background-size: cover;
`;
const iconStyle = css`
  @keyframes float {
    0% {
      box-shadow: 0 5px 15px 0px rgba(0, 0, 0, 0.6);
      transform: translatey(0px);
    }
    50% {
      box-shadow: 0 25px 15px 0px rgba(0, 0, 0, 0.2);
      transform: translatey(-20px);
    }
    100% {
      box-shadow: 0 5px 15px 0px rgba(0, 0, 0, 0.6);
      transform: translatey(0px);
    }
  }
  margin: 10px;
  transition: 0.15s;
  padding: 10px;
  box-sizing: border-box;
  border: solid 2px;
  border-radius: 20px;
  border-color: black;
  box-shadow: 0 5px 15px 0px rgba(0, 0, 0, 0.6);
  transform: translatey(0px);
  animation: float 4s ease-in-out infinite;
`;

const buttonStyle = css`
  border-radius: 5px;

  width: 170px;
  height: 50px;
  left: 85px;
  top: 250px;
  font-family: Verdana, Geneva, Tahoma, sans-serif;
  font-size: 25px;
  background-color: black;
  color: #fdfc8d;
  :hover {
    background-color: #2f88ff;
    transition: 0.5s;
  }
`;
const navButtonsStyle = css`
  padding-top: 100px;
  display: flex;
  justify-content: center;
  gap: 30px;
`;

export default function Home() {
  return (
    <body>
      <Header />

      <a css={backgroundPicture}>
        <Image src={sportsBackground} />
      </a>
      <div css={iconDivStyle}>
        <a css={iconStyle}>
          <Image src={iconBasketball} alt="icon basketball" />
        </a>
        <a css={iconStyle}>
          <Image src={iconArchery} alt="icon archery" />
        </a>
        <a css={iconStyle}>
          <Image src={iconBadminton} alt="icon badminton" />
        </a>
        <a css={iconStyle}>
          <Image src={iconCycling} alt="icon cycling" />
        </a>
        <a css={iconStyle}>
          <Image src={iconFitness} alt="icon fitness" />
        </a>
        <a css={iconStyle}>
          <Image src={iconGolf} alt="icon golf" />
        </a>
        <a css={iconStyle}>
          <Image src={iconJogging} alt="icon jogging" />
        </a>
      </div>
      <div css={iconDivStyle}>
        <a css={iconStyle}>
          <Image src={iconMartialArts} alt="icon martial arts" />
        </a>
        <a css={iconStyle}>
          <Image src={iconMountainClimbing} alt="icon mountain climbing" />
        </a>
        <a css={iconStyle}>
          <Image src={iconSwimming} alt="icon swimming" />
        </a>
        <a css={iconStyle}>
          <Image src={iconTableTennis} alt="icon table tennis" />
        </a>
        <a css={iconStyle}>
          <Image src={iconTennis} alt="icon tennis" />
        </a>
        <a css={iconStyle}>
          <Image src={iconVolleyBall} alt="icon volleyball" />
        </a>
      </div>
      <nav css={navButtonsStyle}>
        <Link href="/login">
          <button css={buttonStyle}>Login</button>
        </Link>
        <Link href={'/register'}>
          <button css={buttonStyle}>Register</button>
        </Link>
      </nav>
    </body>
  );
}
