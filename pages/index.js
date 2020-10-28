import Head from 'next/head';
import { Button, Heading } from '@chakra-ui/core';

export default function Home() {
  return (
    <div className="max-w-screen-lg max-h-full">
      <Head>
        <title>Worth Going Outside</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="flex m-4 text-3xl font-bold">
        <Heading className="text-center">Worth Going Outside?</Heading>
        <Button variantColor="green">Test</Button>
      </div>
    </div>
  );
}
