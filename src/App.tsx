import { useEffect, useState } from 'react';
import { Web3Auth } from '@web3auth/web3auth';
import { CHAIN_NAMESPACES, SafeEventEmitterProvider } from '@web3auth/base';
import './App.css';
import AuthenticatedApp from './components/authenticated-app';
import UnAuthenticatedApp from './components/unauthenticated-app';

const clientId =
  'BGRnCkilP79ARUcJIDa4My4ab7WBrVB4iBgMkkARgaluLj3aRR1BLiWo61QpLKZEkX-8c-SRvC1NABhwQEpseQg'; // get from https://dashboard.web3auth.io

function App() {
  const [web3auth, setWeb3auth] = useState<Web3Auth | null>(null);
  const [provider, setProvider] = useState<SafeEventEmitterProvider | null>(
    null
  );

  useEffect(() => {
    const init = async () => {
      try {
        const web3auth = new Web3Auth({
          clientId,
          chainConfig: {
            chainNamespace: CHAIN_NAMESPACES.EIP155,
            chainId: '0x1',
            rpcTarget: 'https://rpc.ankr.com/eth', // This is the public RPC we have added, please pass on your own endpoint while creating an app
          },
        });

        setWeb3auth(web3auth);

        await web3auth.initModal();
        if (web3auth.provider) {
          setProvider(web3auth.provider);
        }
      } catch (error) {
        console.error(error);
      }
    };

    init();
  }, []);

  const authenticatedApp = (
    <AuthenticatedApp
      provider={provider}
      setProvider={setProvider}
      web3auth={web3auth}
    />
  );

  const unAuthenticatedApp = (
    <UnAuthenticatedApp setProvider={setProvider} web3auth={web3auth} />
  );

  return (
    <div className="container">
      <h1 className="title">Morning Dew</h1>

      <div className="grid">
        {provider ? authenticatedApp : unAuthenticatedApp}
      </div>
    </div>
  );
}

export default App;
