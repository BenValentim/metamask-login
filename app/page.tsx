'use client';

import styles from "./page.module.css";
import axios from "axios";
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { ethers } from "ethers";
import { useState } from "react";

export default function Home() {
  const [havePermission, setHavePermission] = useState(false);
  const [authMessage, setAuthMessage] = useState('');

  async function handleSignMessage() {
    const windowProp: any = window;

    try {
      if (windowProp?.ethereum && windowProp?.ethereum.selectedAddress) {
        const provider = new ethers.BrowserProvider(windowProp.ethereum);
        const signer = new ethers.JsonRpcSigner(
          provider,
          windowProp?.ethereum.selectedAddress
        );

        const address = signer.address;

        const response = await axios.post(`${process.env.NEXT_PUBLIC_BASE_APP_URL}/api/user/getSignMessage`);
        const message = response.data.message;
        const signature = await signer.signMessage(message);
        console.log('signature', signature);

        const authResponse = await axios.post(`${process.env.NEXT_PUBLIC_BASE_APP_URL}/api/user/auth`, {
          address,
          message,
          signature
        });

        console.log('authResponse', authResponse);

        if (authResponse.data.status) {
          setAuthMessage('Permission is granted');
          setHavePermission(true);
        } else {
          setAuthMessage(authResponse.data.message);
          setHavePermission(false);
        }
      } else {
        setHavePermission(false);
      }
    } catch (error) {
      console.log('handleSignMessage', error);
    }
  };

  return (
    <main className={styles.main}>
      <div className={styles.description}>
        <p>
          MetaMask RainbowKit Login
        </p>
        <div>
          <a
            href="https://github.com/QuasarwayGit"
            target="_blank"
            rel="noopener noreferrer"
          >
            By: {"Quasarway"}
          </a>
        </div>
        <ConnectButton chainStatus="icon" showBalance={false} />
      </div>

      {
        !havePermission ?
          <button type="button" onClick={() => { handleSignMessage(); }}>GET AUTH PERMISSION</button>
          :
          <p>{authMessage}</p>
      }

      <div className={styles.grid}>
        <a
          href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          className={styles.card}
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2>
            Docs <span>-&gt;</span>
          </h2>
          <p>Find in-depth information about Next.js features and API.</p>
        </a>

        <a
          href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          className={styles.card}
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2>
            Learn <span>-&gt;</span>
          </h2>
          <p>Learn about Next.js in an interactive course with&nbsp;quizzes!</p>
        </a>

        <a
          href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          className={styles.card}
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2>
            Templates <span>-&gt;</span>
          </h2>
          <p>Explore starter templates for Next.js.</p>
        </a>

        <a
          href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          className={styles.card}
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2>
            Deploy <span>-&gt;</span>
          </h2>
          <p>
            Instantly deploy your Next.js site to a shareable URL with Vercel.
          </p>
        </a>
      </div>
    </main>
  );
}
