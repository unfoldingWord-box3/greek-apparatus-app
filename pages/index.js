import React from 'react';
import { core } from 'scripture-resources-rcl';

export default function Home({ usfm }) {
  const rowHeight = 60;
  const scriptureHeight = rowHeight * 3;

  return (
    <Layout>
      <div className='flex'>
        <Card
          title='UGNT'
          content='Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed massa diam, vehicula ut ultrices vitae, porta eget libero. Proin blandit lectus eget ipsum scelerisque, id porta velit malesuada. Proin imperdiet sodales orci, vitae auctor sapien dictum congue.'
        />
        <Card
          title='UGNT'
          content='Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed massa diam, vehicula ut ultrices vitae, porta eget libero. Proin blandit lectus eget ipsum scelerisque, id porta velit malesuada. Proin imperdiet sodales orci, vitae auctor sapien dictum congue.'
        />
      </div>
      <pre>{usfm}</pre>
    </Layout>
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
