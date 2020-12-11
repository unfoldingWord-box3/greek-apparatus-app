import React from 'react';
import Head from 'next/head';
import Header from '@components/Header';
import Footer from '@components/Footer';
import Scripture from '@components/Scripture';
import { core } from 'scripture-resources-rcl';

export default function Home({ usfm }) {
  const rowHeight = 60;
  const scriptureHeight = rowHeight * 3;

  return (
    <div className="h-screen flex flex-col justify-center items-center">
      <Head>
        <title>Next.js Starter!</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className='flex-1 flex flex-col justify-center items-center py-20'>
        <pre>{usfm}</pre>
        <Scripture height={scriptureHeight} />
      </main>
      <Footer />
    </div>
  )
}

Home.getInitialProps = async (ctx) => {
  const resourceLink = 'unfoldingWord/el-x-koine/ugnt/master/mrk';
  const reference = {bookId: 'mrk', chapter: 1, verse: 1};
  const config = {
    server: 'https://bg.door43.org',
    cache: {
      maxAge: 1 * 1 * 1 * 60 * 1000, // override cache to 1 minute
    },
  };

  console.log(core.resourceFromResourceLink);

  const json = await core.resourceFromResourceLink({resourceLink, reference, config});
  return { usfm: JSON.stringify(json, null, 4) }
}
