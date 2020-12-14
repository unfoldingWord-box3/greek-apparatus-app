import { useContext } from 'react'
import Link from 'next/link'
import BibleReference, { useBibleReference } from 'bible-reference-rcl'
import { BibleReferenceContext } from '@context/BibleReferenceContext'
import Switch from '@components/Switch'
import LanguageSelect from '@components/LanguageSelect'

export default function Header({ title }) {
  const {
    isChapterView,
    setChapterView,
    bibleReference: { bookId, chapter, verse },
    onReferenceChange,
    languageID,
    setLanguageID,
    isAncientSourcesRequired,
    setAncientSourcesRequired,
    isTranslatableVariantsRequired,
    setTranslatableVariantsRequired,
  } = useContext(BibleReferenceContext)

  const { state, actions } = useBibleReference({
    initialBook: bookId,
    initialChapter: chapter,
    initialVerse: verse,
    onChange: onReferenceChange,
  })

  return (
    <div className='h-20 w-screen flex flex-col items-center p-1 justify-between bg-white shadow-xs md:flex-row md: h-14'>
      <Link href='/'>
        <a className='no-underline cursor-pointer ml-8 text-lg text-gray-700 hidden md:flex'>
          {title}
        </a>
      </Link>
      <div className='flex items-center flex-col md:flex-row'>
        <div className='hidden md:contents'>
          <BibleReference status={state} actions={actions} />
        </div>
        <div className='flex p-1 md:hidden'>
          <button
            className='bg-transparent border-transparent text-2xl mx-2'
            onClick={actions.goToPrevChapter}
          >
            {'<<'}
          </button>
          <button
            className='bg-transparent border-transparent text-2xl mx-2'
            onClick={actions.goToPrevVerse}
          >
            {'<'}
          </button>
          <div className='font-bold p-1 leading-8 mx-2'>{`${bookId} ${chapter}:${verse}`}</div>
          <button
            className='bg-transparent border-transparent text-2xl mx-2'
            onClick={actions.goToNextVerse}
          >
            {'>'}
          </button>
          <button
            className='bg-transparent border-transparent text-2xl mx-2'
            onClick={actions.goToNextChapter}
          >
            {'>>'}
          </button>
        </div>
        <Switch id="chapter-view" label={"Chapter View"} checked={isChapterView} onChange={setChapterView} />
        <LanguageSelect languageID={languageID} onChange={(value) => setLanguageID(value)} />
        <Switch id={"require-sources"} label={"Require Ancient Sources"} checked={isAncientSourcesRequired} onChange={setAncientSourcesRequired} />
        <Switch id={"require-variants"} label={"Require Translatable Variants"} checked={isTranslatableVariantsRequired} onChange={setTranslatableVariantsRequired} />
      </div>
      <div className='flex flex-row-reverse mr-8 md:flex'>
        {/** buttons go here */}
      </div>
    </div>
  )
}
