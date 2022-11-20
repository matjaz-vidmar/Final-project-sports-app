import { css } from '@emotion/react';
import { Dropdown, StyledUserName } from '@nextui-org/react';
import { GetServerSidePropsContext } from 'next';
import { useRouter } from 'next/router';
import { useMemo, useState } from 'react';
import Header from '../components/Header';
import { getValidSessionByToken } from '../database/sessions';
import { getSportById, getSports, Sport } from '../database/sports';
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
  sport?: Sport;
  refreshUserProfile: () => Promise<void>;
};
export default function Register(props: Props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [errors, setErrors] = useState<{ message: string }[]>([]);
  const router = useRouter();
  const [selected, setSelected] = useState(new Set([]));
  const selectedValue = useMemo(
    () => Array.from(selected).join(', ').replaceAll('_', ' '),
    [selected],
  );
  async function registerHandler() {
    const registerResponse = await fetch('/api/register', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        username: username.toLowerCase(),
        password,
        email,
        address,
        selectedValue,
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
    // await router.push(`/private-profile`);
    await router.push('/welcome-page');
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
        <label css={labelStyle}>Email</label>
        <input
          value={email}
          onChange={(event) => {
            setEmail(event.currentTarget.value);
          }}
        />
        <label css={labelStyle}>Address</label>
        <input
          value={address}
          onChange={(event) => {
            setAddress(event.currentTarget.value);
          }}
        />
        <label css={labelStyle}>Select your sports here</label>
        <Dropdown>
          <Dropdown.Button shadow color="primary" css={{ tt: 'capitalize' }}>
            {selectedValue}
          </Dropdown.Button>

          <Dropdown.Menu
            aria-label="Multiple selection actions"
            background-color=" #2f88ff"
            disallowEmptySelection
            selectionMode="multiple"
            selectedKeys={selected}
            onSelectionChange={setSelected}
            text-color="primary"
            color="primary"
          >
            {props.sport?.map((sport) => {
              console.log(selectedValue);
              return (
                <Dropdown.Item
                  key={sport.name}
                  textColor="default"
                  variant="flat"
                >
                  {sport?.name}
                </Dropdown.Item>
              );
            })}
          </Dropdown.Menu>
        </Dropdown>
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
  const sport = await getSports();
  if (token && (await getValidSessionByToken(token))) {
    return {
      redirect: {
        destination: '/',
        permanent: true,
      },
    };
  }
  return {
    props: { sport },
  };
}
