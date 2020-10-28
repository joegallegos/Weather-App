import Head from 'next/head';

export default function Home() {
  return (
    <div className="max-w-screen-lg max-h-full">
      <Head>
        <title>Worth Going Outside</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="flex m-4 text-3xl font-bold">
        <h1 className="text-center">Worth Going Outside?</h1>
      </div>
    </div>
  );
}
