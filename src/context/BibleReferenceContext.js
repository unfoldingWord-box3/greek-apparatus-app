import React, { useState, createContext } from 'react'

export const BibleReferenceContext = createContext({})

export default function BibleReferenceContextProvider(props) {
  const [isChapterView, setChapterView] = useState(true)
  const [bibleReference, setBibleReference] = useState({
    bookId: 'mrk',
    chapter: '2',
    verse: '1',
  })
  const [languageID, setLanguageID] = useState('en')
  const [isAncientSourcesRequired, setAncientSourcesRequired] = useState(true)
  const [isTranslatableVariantsRequired, setTranslatableVariantsRequired] = useState(true)


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
    setChapterView,
    onReferenceChange,
    setLanguageID,
    setAncientSourcesRequired,
    setTranslatableVariantsRequired,
  }

  return (
    <BibleReferenceContext.Provider value={value}>
      {props.children}
    </BibleReferenceContext.Provider>
  )
}
