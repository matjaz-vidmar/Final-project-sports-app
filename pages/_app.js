import { css, Global } from '@emotion/react';
import { NextUIProvider } from '@nextui-org/react';
import { useCallback, useEffect, useState } from 'react';
import Layout from '../components/Layout';

function MyApp({ Component, pageProps }) {
  const [user, setUser] = useState();
  const refreshUserProfile = useCallback(async () => {
    const profileResponse = await fetch('/api/profile');
    const profileResponseBody = await profileResponse.json();

    if ('errors' in profileResponseBody) {
      setUser(undefined);
    } else {
      setUser(profileResponseBody.user);
    }
  }, []);
  useEffect(() => {
    refreshUserProfile().catch(() => console.log('fetch api failed'));
  }, [refreshUserProfile]);
  return (
    <>
      <Layout user={user}>
        <NextUIProvider>
          <Component {...pageProps} refreshUserProfile={refreshUserProfile} />;
        </NextUIProvider>
      </Layout>
    </>
  );
}

export default MyApp;
