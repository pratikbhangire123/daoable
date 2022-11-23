import Head from "next/head";
import Intro from "../components/intro";

export default function Home() {
  return (
    <div>
      <Head>
        <title>Daoable</title>
        <meta name="description" content="DAO Management Tool" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex flex-col px-16 items-center justify-center">
        <Intro />
      </main>
    </div>
  );
}
