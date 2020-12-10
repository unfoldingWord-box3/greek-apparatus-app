import Head from 'next/head'
import Header from '@components/Header'
import Footer from '@components/Footer'

export default function Home() {
  return (
    <div className="h-screen flex flex-col justify-center items-center">
      <Head>
        <title>Next.js Starter!</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className='flex-1 flex flex-col justify-center items-center py-20'>
        <Header title="Welcome to my app!" />
        <p className="text-center leading-normal text-base">
          Get started by editing <code className='bg-gray-50 rounded p-3 font-menlo'>pages/index.js</code>
        </p>
      </main>

      <Footer />
    </div>
  )
}
