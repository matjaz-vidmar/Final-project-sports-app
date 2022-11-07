import { css } from '@emotion/react';
import Head from 'next/head';
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

export default function Layout(props) {
  return (
    <>
      <Header user={props.user} />
      <main css={mainStyles}>{props.children}</main>
    </>
  );
}
