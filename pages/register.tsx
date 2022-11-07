import { css } from '@emotion/react';
import { GetServerSidePropsContext } from 'next';
import { useRouter } from 'next/router';
import { useState } from 'react';
import Header from '../components/Header';
import { getValidSessionByToken } from '../database/sessions';
import { RegisterResponseBody } from './api/register';

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

type Props = {
  refreshUserProfile: () => Promise<void>;
};
export default function Register(props: Props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<{ message: string }[]>([]);
  const router = useRouter();
  async function registerHandler() {
    const registerResponse = await fetch('/api/register', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        username: username.toLowerCase(),
        password,
      }),
    });
    const registerResponseBody =
      (await registerResponse.json()) as RegisterResponseBody;

    if ('errors' in registerResponseBody) {
      setErrors(registerResponseBody.errors);
      return console.log(registerResponseBody.errors);
    }

    const returnTo = router.query.returnTo;
    if (
      returnTo &&
      !Array.isArray(returnTo) && // Security: Validate returnTo parameter against valid path
      // (because this is untrusted user input)
      /^\/[a-zA-Z0-9-?=/]*$/.test(returnTo)
    ) {
      return await router.push(returnTo);
    }

    // refresh the user on state
    await props.refreshUserProfile();
    // redirect user to user profile
    await router.push(`/private-profile`);
  }

  return (
    <div>
      <title>Register</title>
      <meta name="register page" content="register page" />

      <h2 css={h2Style}>Register</h2>
      {errors.map((error) => {
        return (
          <p
            css={css`
              background-color: red;
              color: white;
              padding: 5px;
            `}
            key={error.message}
          >
            ERROR: {error.message}
          </p>
        );
      })}
      <div css={inputDivStyle}>
        <label css={labelStyle}>Username</label>
        <input
          value={username}
          onChange={(event) => {
            setUsername(event.currentTarget.value.toLowerCase());
          }}
        />

        <label css={labelStyle}>Password</label>
        <input
          value={password}
          onChange={(event) => {
            setPassword(event.currentTarget.value);
          }}
        />

        <button
          css={buttonStyle}
          onClick={async () => {
            await registerHandler();
          }}
        >
          Register
        </button>
      </div>
    </div>
  );
}
export async function getServerSideProps(context: GetServerSidePropsContext) {
  const token = context.req.cookies.sessionToken;

  if (token && (await getValidSessionByToken(token))) {
    return {
      redirect: {
        destination: '/',
        permanent: true,
      },
    };
  }
  return {
    props: {},
  };
}
