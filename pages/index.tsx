import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import Task from "../features/tasks/Task";
import styles from "../styles/Home.module.css";
import * as React from "react";

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
    </div>
  );
};

export default Home;
