import { css } from '@emotion/react';
import Image from 'next/image';
import Link from 'next/link';
import iconJoggingHeader from '../public/iconJoggingHeader.svg';

const headerStyle = css`
  display: flex;

  justify-content: space-between;

  background-color: #e0e0e0;
  max-width: auto;
  position: sticky;
  top: 0;
  z-index: 2;
  padding: 20px;
`;
const h1Style = css`
  font-family: Verdana, Geneva, Tahoma, sans-serif;
  font-size: 30px;
  padding-top: 3px;
  font-weight: 650;
  color: #2f88ff;
`;
const faviconStyle = css`
  padding: 6px;
  border: solid 2px;
  border-radius: 40px;
  border-color: black;
`;
const buttonsNavStyle = css`
  gap: 20px;

  align-items: space-between;
  display: flex;
  justify-content: center;
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
  background-color: #e0e0e0;
  color: black;
  :hover {
    background-color: #2f88ff;
    transition: 0.5s;
  }
`;

export default function Header() {
  return (
    <div css={headerStyle}>
      <nav css={buttonsNavStyle}>
        <Link href="./">
          <button css={headerButtonStyle}>Home</button>
        </Link>
      </nav>

      <nav css={buttonsNavStyle}>
        <a css={faviconStyle}>
          <Image src={iconJoggingHeader} alt="icon jogging header" />
        </a>
        <nav css={h1Style}>Sportify</nav>
      </nav>

      <nav css={buttonsNavStyle}>
        <Link href="./register">
          <button css={headerButtonStyle}>Register</button>
        </Link>

        <Link href="./login">
          <button css={headerButtonStyle}>Login</button>
        </Link>
      </nav>
    </div>
  );
}
