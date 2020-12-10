import Head from 'next/head'
import Header from '@components/Header'
import Footer from '@components/Footer'

import Viewer from '../src/components/Viewer';

export default function Home() {
  return (
    <div className="h-screen flex flex-col">
      <Head>
        <title>unfoldingWord UGNT Apparatus</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className='flex-1 flex flex-col'>
        <Header title="UGNT Apparatus" />
        
        <Viewer/>
      </main>

      <Footer />
    </div>
  )
}
