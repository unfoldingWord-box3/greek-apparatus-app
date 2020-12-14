import { useContext } from 'react'
import usfmJS from 'usfm-js'
import { Verses } from 'scripture-resources-rcl'
import Card from '@components/Card'
import ApparatusData from '@components/ApparatusData'
import filterApparatusData from '@utils/filterApparatusData'
import tagVariantsInVerseObjects from '@utils/tagVariantsInVerseObjects'
import { BibleReferenceContext } from '@context/BibleReferenceContext'

function Viewer({ usfm }) {
  const {
    isChapterView,
    bibleReference: { chapter, verse },
    isAncientSourcesRequired,
    isTranslatableVariantsRequired,
    languageID,
  } = useContext(BibleReferenceContext)

  const usfmJSON = usfmJS.toJSON(usfm)
  const { chapters } = usfmJSON
  const chapterKey = '2'

  let verseNumbers = Object.keys(chapters[chapterKey]).filter(key =>
    key.match(/^\d+$/)
  )

  if (!isChapterView) {
    verseNumbers = verseNumbers.filter(verseNumber => verseNumber === verse)
  }

  if (chapter !== chapterKey || !verseNumbers.includes(verse)) {
    return (
      <div className='flex items-center justify-center h-full'>
        Content Not Available
      </div>
    )
  }

  const verses = verseNumbers.map((currentVerseKey, i) => {
    const filteredVariantObjects = filterApparatusData(
      chapterKey,
      currentVerseKey,
      isAncientSourcesRequired,
      isTranslatableVariantsRequired
    )
    const currentVerseObjectsArrayContents = tagVariantsInVerseObjects(
      chapters[chapterKey][currentVerseKey],
      filteredVariantObjects
    )
    const currentVerseObjects = JSON.parse(
      '{"' +
        parseInt(currentVerseKey) +
        '": ' +
        JSON.stringify(currentVerseObjectsArrayContents) +
        '}'
    )

    return (
      <div key={`${i}-${currentVerseKey}`} className='flex w-full'>
        <Card className='w-full'>
          <>
            <Verses
              verses={currentVerseObjects}
              paragraphs
              showUnsupported
              disableWordPopover={true}
              direction='auto'
            />
            <br/>
            <ApparatusData filteredVariantObjects={filteredVariantObjects} languageID={languageID} />
          </>
        </Card>
      </div>
    )
  })

  return <>{verses}</>
}

export default Viewer
