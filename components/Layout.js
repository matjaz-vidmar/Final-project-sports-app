import { css } from '@emotion/react';
import Head from 'next/head';
import Image from 'next/image';
import Header from './Header';

const mainStyles = css`
  border: solid 1px;
  margin-left: 300px;
  margin-right: 300px;
  margin-bottom: 200px;
  padding-bottom: 1000px;
  position: relative;
  background-color: #e0e0e0;
`;
const backgroundDivStyle = css`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 0px 0px;
  position: absolute;
  width: 100%;
  height: 100%;

  background: linear-gradient(180deg, #2f88ff 0%, rgba(30, 100, 200, 0) 80%);
  filter: blur(2px);
`;

export default function Layout(props) {
  return (
    <>
      <Header user={props.user} />
      <div css={backgroundDivStyle}></div>
      <main css={mainStyles}>{props.children}</main>
    </>
  );
}
