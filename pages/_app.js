import '@styles/globals.css'
import BibleReferenceContextProvider from '@context/BibleReferenceContext'

function Application({ Component, pageProps }) {
  return (
    <BibleReferenceContextProvider>
      <Component {...pageProps} />
    </BibleReferenceContextProvider>
  )
}

export default Application
