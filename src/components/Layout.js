import Head from 'next/head'
import PropTypes from 'prop-types'
import Header from '@components/Header'
import Footer from '@components/Footer'

export default function Layout({
  children
}) {
  return (
    <div className="h-screen flex flex-col justify-center items-center">
      <Head>
        <title>Greek Apparatus</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header title='Greek Apparatus!'/>
      <main className='flex-1 flex flex-col justify-center items-center py-4 px-6 bg-gray-200'>
        {children}
      </main>
      <Footer/>
    </div>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}
