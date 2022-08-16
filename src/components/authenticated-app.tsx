import { SafeEventEmitterProvider } from '@web3auth/base';
import { Web3Auth } from '@web3auth/web3auth';
import { useState } from 'react';
import RPC from '../web3RPC';

interface AuthenticatedAppProps {
  provider: SafeEventEmitterProvider | null;
  setProvider: (
    value: React.SetStateAction<SafeEventEmitterProvider | null>
  ) => void;
  web3auth: Web3Auth | null;
}

function AuthenticatedApp({
  provider,
  setProvider,
  web3auth,
}: AuthenticatedAppProps) {
  const [chainId, setChainId] = useState<string | null>();
  const [balance, setBalance] = useState<string | null>();

  const logout = async () => {
    if (!web3auth) {
      console.log('web3auth not initialized yet');
      return;
    }
    await web3auth.logout();
    setProvider(null);
  };

  const getChainId = async () => {
    if (!provider) {
      console.log('provider not initialized yet');
      return;
    }
    const rpc = new RPC(provider);
    const chainId = await rpc.getChainId();
    setChainId(chainId);
  };

  const getBalance = async () => {
    if (!provider) {
      console.log('provider not initialized yet');
      return;
    }
    const rpc = new RPC(provider);
    const balance = await rpc.getBalance();
    setBalance(balance);
  };

  const sendTransaction = async () => {
    if (!provider) {
      console.log('provider not initialized yet');
      return;
    }
    const rpc = new RPC(provider);
    const receipt = await rpc.sendTransaction();
    console.log(receipt);
  };

  return (
    <>
      <button onClick={getChainId} className="card">
        Get Chain ID
      </button>

      <button onClick={getBalance} className="card">
        Get Balance
      </button>

      <button onClick={sendTransaction} className="card">
        Send Transaction
      </button>
      <button onClick={logout} className="card">
        Log Out
      </button>

      <div id="console" style={{ whiteSpace: 'pre-line' }}>
        <p style={{ whiteSpace: 'pre-line' }}></p>
      </div>

      {chainId ? <span>Chain ID: {chainId}</span> : null}
      {balance ? <span>Balance: {balance}</span> : null}
    </>
  );
}

export default AuthenticatedApp;
