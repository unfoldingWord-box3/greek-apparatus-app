import Layout from '@components/Layout'
import Viewer from '@components/Viewer';
import {core} from 'scripture-resources-rcl';

export default function Home({ usfm }) {
  return (
    <Layout>
      <Viewer usfm={usfm} />
    </Layout>
  )
}

export async function getStaticProps() {
  const params = {
    username: 'unfoldingword',
    repository: 'el-x-koine_ugnt',
    path: '42-MRK.usfm',
    tag: 'master', 
    config: {
      server: 'https://git.door43.org',
      cache: {
        maxAge: 1 * 1 * 1 * 60 * 1000, // override cache to 1 minute
      },
    },
  };
  let usfm = '';
  try {
    usfm = await core.getFile(params);
  } catch(e) {
    console.log(e);
  }
  if (! usfm) {
    return {
      notFound: true,
    };
  }
  return { props: { usfm } };
}
