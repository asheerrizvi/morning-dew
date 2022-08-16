import { SafeEventEmitterProvider } from '@web3auth/base';
import { Web3Auth } from '@web3auth/web3auth';

interface UnAuthenticatedAppProps {
  setProvider: (
    value: React.SetStateAction<SafeEventEmitterProvider | null>
  ) => void;
  web3auth: Web3Auth | null;
}

function UnAuthenticatedApp({
  setProvider,
  web3auth,
}: UnAuthenticatedAppProps) {
  const login = async () => {
    if (!web3auth) {
      console.log('web3auth not initialized yet');
      return;
    }
    const web3authProvider = await web3auth.connect();
    setProvider(web3authProvider);
  };

  return (
    <button onClick={login} className="card">
      Login
    </button>
  );
}

export default UnAuthenticatedApp;
