import Head from 'next/head'
import PropTypes from 'prop-types'
import Header from '@components/Header'
import Footer from '@components/Footer'

export default function Layout({ children }) {
  return (
    <div className='h-screen w-screen flex flex-col'>
      <Head>
        <title>Greek Apparatus</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <Header title='Greek Apparatus' />
      <main className='flex flex-1 flex-col w-auto p-4 bg-gray-200'>
        {children}
      </main>
      <Footer />
    </div>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}
