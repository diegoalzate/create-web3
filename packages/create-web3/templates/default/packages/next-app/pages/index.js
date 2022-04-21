import Head from 'next/head';
import styles from '../styles/Home.module.css';

import { useConnect } from 'wagmi';

import { Connect, Disconnect, SwitchNetwork } from '../components/wallet';
import { Greeter } from '../components/contract/Greeter';

import { useNetwork } from 'wagmi';
import config from '../config.json';

export default function Home() {
  const [{ data: connectData }] = useConnect();
  const [{ data: networkData }] = useNetwork();

  return (
    <div className={styles.container}>
      <Head>
        <title>Create Web3 App</title>
        <meta name="description" content="Generated by create web3 app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        {/* Check if wallet is connected */}
        {connectData.connected ? (
          <>
            <Disconnect />
            {/* Check if connected to correct network */}
            {networkData.chain?.id &&
            config.network.id !== networkData.chain.id ? (
              <SwitchNetwork />
            ) : (
              <Greeter />
            )}
          </>
        ) : (
          <Connect />
        )}
      </main>

      <footer className={styles.footer}></footer>
    </div>
  );
}
