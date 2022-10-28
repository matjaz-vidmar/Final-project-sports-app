import { css } from '@emotion/react';
import Image from 'next/image';
import Link from 'next/link';
import iconJoggingHeader from '../public/iconJoggingHeader.svg';

const headerStyle = css`
  display: flex;
  justify-content: space-between;
  background-color: #ecf8ce;
  padding: 20px 20px;
  position: sticky;
  top: 0;
  width: 90%;
  z-index: 2;
`;
const faviconStyle = css`
  padding: 5px;
  border: solid 2px;
  border-radius: 50px;
  border-color: black;
`;
const buttonsNavStyle = css`
  gap: 20px;
  align-items: space-between;
  display: flex;
  justify-content: space-between;
`;
const headerButtonStyle = css`
  border-radius: 5px;
  width: 100px;
  height: 40px;
  left: 85px;
  top: 250px;
  text-decoration: none;
  font-family: Verdana, Geneva, Tahoma, sans-serif;
  font-size: 15px;
  background-color: black;
  color: #fdfc8d;
  :hover {
    background-color: #2f88ff;
    transition: 0.5s;
  }
`;

export default function Header() {
  return (
    <nav css={headerStyle}>
      <nav css={buttonsNavStyle}>
        <a css={faviconStyle}>
          <Image src={iconJoggingHeader} alt="icon jogging header" />
        </a>
        <Link href="./">
          <button css={headerButtonStyle}>Home </button>
        </Link>
      </nav>
      <nav css={buttonsNavStyle}>
        <Link href="./register">
          <button css={headerButtonStyle}>Register</button>
        </Link>

        <Link href="./login">
          <button css={headerButtonStyle}>Login</button>
        </Link>
      </nav>
    </nav>
  );
}
