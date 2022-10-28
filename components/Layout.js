import { css } from '@emotion/react';
import Head from 'next/head';
import Header from './Header';

const mainStyles = css`
  border: solid 1px;
  margin-left: 400px;
  margin-right: 400px;
  border-top: 30px;
  margin-bottom: 200px;
  padding-bottom: 1000px;
  position: relative;
  background-color: #ecf8ce;
`;

export default function Layout(props) {
  return (
    <>
      <main css={mainStyles}>{props.children}</main>
    </>
  );
}