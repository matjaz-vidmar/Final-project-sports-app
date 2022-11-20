import { css } from '@emotion/react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
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

export default function WelcomePage() {
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
    text-decoration: none;
    color: #fdfc8d;
    background-color: black;
    margin-top: 20px;
    :hover {
      background-color: #2f88ff;
      transition: 0.5s;
    }
  `;
  const h2Style = css`
    font-family: Verdana, Geneva, Tahoma, sans-serif;
    font-size: 30px;
    padding-top: 3px;
    font-weight: 650;
    color: #2f88ff;
    display: flex;
    justify-content: center;
    padding-top: 20px;
  `;
  const navStyleWelcome = css`
    display: flex;
    flex-flow: row;
  `;
  const iconDivStyle = css`
    padding-left: 300 px;
    padding-right: 300 px;
    nav-up: 50 px;
    padding-top: 50px;
    display: flex;
    flex-flow: column;
    gap: 60 px;
    justify-content: center;
    align-items: stretch;
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
  const textStyle = css`
    padding: 50px;
    margin: 50px;
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    align-content: space-between;
  `;
  return (
    <div css={navStyleWelcome}>
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
      <nav css={textStyle}>
        <h1>Welcome to Sportify!</h1>
        <h2 css={h2Style}>
          Sportify is a web application, where you can play sports together.
          <br /> Find other users who are looking for a sports partner. <br />
          Locate the venues, where you and your partner can meet and play your
          favorite sport!
        </h2>
        <Link href="./private-profile">
          <button css={buttonStyleSports}>Proceed</button>
        </Link>
      </nav>
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
    </div>
  );
}
