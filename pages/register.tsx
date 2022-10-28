import { css } from '@emotion/react';
import Head from 'next/head';
import { useState } from 'react';
import Header from '../components/Header';

const h2Style = css`
  font-family: Verdana, Geneva, Tahoma, sans-serif;
  padding-top: 30px;
  font-size: 50px;
  display: flex;
  justify-content: center;

  font-size: 70px;
  font-weight: 600;
  background-image: linear-gradient(to left, #553c9a, #2f88ff);
  color: transparent;
  background-clip: text;
  -webkit-background-clip: text;
`;
const labelStyle = css`
  font-family: Verdana, Geneva, Tahoma, sans-serif;
  font-size: 20px;
  font-weight: bold;
  color: #2f88ff;
`;
const buttonStyle = css`
  border-radius: 5px;

  width: 130px;
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
const inputDivStyle = css`
  display: flex;
  flex-direction: column;
  gap: 15px;
  justify-content: center;
  padding: 30px;
  margin-left: 20px;
  align-items: center;
`;
export default function REgister() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  return (
    <div>
      <Header />
      <title>Register</title>
      <meta name="login page" content="login page" />

      <h2 css={h2Style}>Register</h2>
      <div css={inputDivStyle}>
        <label css={labelStyle}>
          Username
          <input
            value={username}
            onChange={(event) => {
              setUsername(event.currentTarget.value);
            }}
          />
        </label>
        <label css={labelStyle}>
          Password
          <input
            value={password}
            onChange={(event) => {
              setPassword(event.currentTarget.value);
            }}
          />
        </label>
        <button css={buttonStyle}>Register</button>
      </div>
    </div>
  );
}
