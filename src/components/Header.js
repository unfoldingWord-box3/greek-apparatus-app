import { useContext } from 'react'
import Link from 'next/link'
import BibleReference, { useBibleReference } from 'bible-reference-rcl'
import { BibleReferenceContext } from '@context/BibleReferenceContext'
import Switch from '@components/Switch'

export default function Header({ title }) {
  const {
    isChapterView,
    setChapterView,
    bibleReference,
    onReferenceChange,
  } = useContext(BibleReferenceContext)

  const { state, actions } = useBibleReference({
    initialBook: bibleReference.bookId,
    initialChapter: bibleReference.chapter,
    initialVerse: bibleReference.verse,
    onChange: onReferenceChange,
  })

  return (
    <div className='h-32 w-screen flex flex-col items-center p-1 justify-between bg-white shadow-xs md:flex-row md: h-14'>
      <Link href='/'>
        <a className='no-underline cursor-pointer ml-8 text-lg text-gray-700 hidden md:flex'>
          {title}
        </a>
      </Link>
      <div className='flex items-center flex-col md:flex-row'>
        <BibleReference status={state} actions={actions} />
        <Switch checked={isChapterView} onChange={setChapterView} />
      </div>
      <div className='flex flex-row-reverse mr-8 md:flex'>
        {/** buttons go here */}
      </div>
    </div>
  )
}
