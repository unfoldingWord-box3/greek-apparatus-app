import React, { useState, createContext } from 'react'

export const BibleReferenceContext = createContext({})

export default function BibleReferenceContextProvider(props) {
  const [languageID, setLanguageID] = useState('en')
  const [isChapterView, setChapterView] = useState(true)
  const [isAncientSourcesRequired, setAncientSourcesRequired] = useState(false)
  const [
    isTranslatableVariantsRequired,
    setTranslatableVariantsRequired,
  ] = useState(false)

  const [bibleReference, setBibleReference] = useState({
    bookId: 'mrk',
    chapter: '2',
    verse: '1',
  })

  function onReferenceChange(bookId, chapter, verse) {
    console.info(`Reference: ${bookId} - ${chapter}:${verse}\n`)
    setBibleReference(prevState => ({
      ...prevState,
      bookId,
      chapter,
      verse,
    }))
  }

  const value = {
    isChapterView,
    bibleReference,
    languageID,
    isAncientSourcesRequired,
    isTranslatableVariantsRequired,
    setLanguageID,
    setChapterView,
    onReferenceChange,
    setAncientSourcesRequired,
    setTranslatableVariantsRequired,
  }

  return (
    <BibleReferenceContext.Provider value={value}>
      {props.children}
    </BibleReferenceContext.Provider>
  )
}
