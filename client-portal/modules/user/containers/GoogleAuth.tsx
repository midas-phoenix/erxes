import { useMutation } from '@apollo/client';
import gql from 'graphql-tag';
import { useRouter } from 'next/router';

import { Config } from '../../types';
import { mutations } from '../graphql';
import React from 'react';

type Props = {
  config: Config;
};

function VerifyContainer(props: Props) {
  const router = useRouter();
  const { code } = router.query;
  const { config } = props;
  const [googleAuth] = useMutation(gql(mutations.googleLogin));

  if (!code) {
    return <p>Invalid code</p>;
  }

  React.useEffect(() => {
    googleAuth({
      variables: {
        code,
        clientPortalId: config._id,
      },
    })
      .then((result) => {
        if (result?.data?.clientPortalGoogleAuthentication === 'loggedin') {
          window.location.href = '/';
        }
      })
      .catch((e) => {
        console.error('error: ', e.message);
      });
  }, [code]);

  return <p />;
}

export default VerifyContainer;
