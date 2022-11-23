import { css } from '@emotion/react';
import { GetServerSidePropsContext } from 'next';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { getValidSessionByToken } from '../database/sessions';
import { LoginResponseBody } from './api/login';

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
  color: #1a2169;
`;
const buttonStyle = css`
  border-radius: 5px;
  width: 170px;
  height: 50px;
  left: 85px;
  top: 250px;
  font-family: Verdana, Geneva, Tahoma, sans-serif;
  font-size: 25px;
  background-color: #1a2169;
  color: white;
  :hover {
    background-color: #dcdcdc;
    color: black;
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
export default function Login(props: Props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<{ message: string }[]>([]);
  const router = useRouter();

  async function loginHandler() {
    const loginResponse = await fetch('/api/login', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        username: username.toLowerCase(),
        password,
      }),
    });
    const loginResponseBody = (await loginResponse.json()) as LoginResponseBody;

    if ('errors' in loginResponseBody) {
      setErrors(loginResponseBody.errors);
      return console.log(loginResponseBody.errors);
    }

    console.log(router.query.returnTo);

    const returnTo = router.query.returnTo;

    if (
      returnTo &&
      !Array.isArray(returnTo) && // Security: Validate returnTo parameter against valid path
      // (because this is untrusted user input)
      /^\/[a-zA-Z0-9-?=/]*$/.test(returnTo)
    ) {
      // refresh the user on state
      await props.refreshUserProfile();
      return await router.push(returnTo);
    }

    // refresh the user on state
    await props.refreshUserProfile();
    // redirect user to user profile
    await router.push(`/private-profile`);
  }

  return (
    <div>
      <title>Login</title>
      <meta name="login page" content="login page" />

      <h2 css={h2Style}>Login</h2>
      {errors.map((error) => {
        return (
          <div
            css={css`
              background-color: red;
              color: white;
              padding: 5px;
            `}
            key={error.message}
          >
            ERROR: {error.message}
          </div>
        );
      })}
      <div css={inputDivStyle}>
        <label css={labelStyle}>Username </label>
        <input
          value={username}
          onChange={(event) => {
            setUsername(event.currentTarget.value.toLocaleLowerCase());
          }}
        />

        <label css={labelStyle}>Password</label>
        <input
          type="password"
          value={password}
          onChange={(event) => {
            setPassword(event.currentTarget.value);
          }}
        />

        <button
          onClick={async () => {
            await loginHandler();
          }}
          css={buttonStyle}
        >
          Login
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
