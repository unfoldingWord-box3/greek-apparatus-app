import Head from 'next/head'
import Header from '@components/Header'
import Footer from '@components/Footer'
import Card from '@components/Card'

export default function Home() {
  return (
    <div className="h-screen flex flex-col justify-center items-center">
      <Head>
        <title>Greek Apparatus</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className='flex-1 flex flex-col justify-center items-center py-4 px-6 bg-gray-200'>
        <Header title="Greek Apparatus!" />
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
      </main>
      <Footer />
    </div>
  )
}
