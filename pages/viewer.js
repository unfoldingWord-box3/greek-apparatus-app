import Layout from '@components/Layout'
import Viewer from '@components/Viewer';
import {core} from 'scripture-resources-rcl';

export default function ViewerPage({ usfm }) {
  return (
    <Layout>
      <Viewer usfm={usfm} />
    </Layout>
  )
}

ViewerPage.getInitialProps = async (ctx) => {
  const config = {
    server: 'https://bg.door43.org',
    cache: {
      maxAge: 1 * 1 * 1 * 60 * 1000, // override cache to 1 minute
    },
  };
  const params = { username: 'unfoldingword', repository: 'el-x-koine_ugnt', path: '42-MRK.usfm', tag: 'master', config };
  let usfm = '';
  try {
    usfm = await core.getFile(params);
  } catch(e) {
    console.log(e);
  }
  return { usfm }
}
