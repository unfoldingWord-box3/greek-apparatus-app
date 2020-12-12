import usfmJS from 'usfm-js'
import { Verses } from 'scripture-resources-rcl'
import { tokenize } from 'string-punctuation-tokenizer'
import Card from '@components/Card'

import apparatusData from '../mocks/ugnt_mrk_apparatus.js'

function Viewer({ usfm }) {
  const usfmJSON = usfmJS.toJSON(usfm)
  const { chapters } = usfmJSON
  const chapterKey = '2'

  const filterApparatusData = (referenceChapter, referenceVerse) => {
    let filtered = []
    if (apparatusData.chapters[referenceChapter]) {
      const chapter = apparatusData.chapters[referenceChapter]
      if (chapter[referenceVerse]) {
        filtered = apparatusData.chapters[referenceChapter][referenceVerse]
        filtered = filterApparatusReadings({
          variantObjects: filtered.variantObjects,
          requireIsTranslatable: false,
          requireAncient: false,
        })
      }
    }
    return filtered
  }

  const filterApparatusReadings = ({
    variantObjects,
    requireIsTranslatable,
    requireAncient,
  }) => {
    let filteredVariantObjects = []

    variantObjects.forEach(currentVariantObject => {
      const filteredReadings = currentVariantObject.readings.filter(
        vo => vo.isTranslatable || requireIsTranslatable == false
      )

      currentVariantObject.readings = []
      filteredReadings.forEach(rd => {
        // Filter sources:
        rd.sources = rd.sources.filter(
          src => src.textClass !== 'mod' || requireAncient == false
        )

        if (rd.sources.length > 0) {
          currentVariantObject.readings.push(rd)
        }
      })

      if (currentVariantObject.readings.length > 0) {
        filteredVariantObjects.push(currentVariantObject)
      }
    })

    return filteredVariantObjects
  }

  Array.prototype.insert = function (index, item) {
    this.splice(index, 0, item)
  }

  const tokenizer = text => {
    return tokenize({
      text: text,
      greedy: true,
      normalize: true,
    })
  }

  const normalizeString = string => {
    const normalized = tokenizer(string)
      .join(' ')
      .replace('ʼ', '')
      .replace('’', '')
    return normalized
  }

  const tagVariantsInVerseObjects = (
    currentVerseObjects,
    filteredVariantObjects
  ) => {
    if (currentVerseObjects) {
      filteredVariantObjects.forEach(variant => {
        const variantBaseTextSplit = variant.baseText
          .split(' ')
          .filter(txt => txt.trim().length > 0)

        currentVerseObjects.verseObjects.forEach(vo => {
          if (
            normalizeString(vo.text) ===
            normalizeString(variantBaseTextSplit[0])
          ) {
            vo.text = '⸢' + vo.text
          }
          if (
            normalizeString(vo.text) ===
            normalizeString(
              variantBaseTextSplit[variantBaseTextSplit.length - 1]
            )
          ) {
            vo.text = vo.text + '⸣'
          }
        })
      })
    }

    return currentVerseObjects
  }

  const verses = Object.keys(chapters[chapterKey])
    .filter(key => key.match(/^\d+$/))
    .map(currentVerseKey => {
      const filteredVariantObjects = filterApparatusData(
        chapterKey,
        currentVerseKey
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

      let apparatusData = (
        <div className='apparatusRow flex flex-wrap'>
          {' '}
          {filteredVariantObjects.map(currentVariantObject => (
            <div className='mb-8'>
              <span className='table text-blue-700 text-lg'>
                {currentVariantObject.baseText}
              </span>
              {currentVariantObject.readings.map(currentReading => (
                <div class='flex flex-wrap'>
                  <div className='text-black break-normal ml-2 text-lg'>
                    {currentReading.text.trim().length == 0
                      ? '(Omit)'
                      : currentReading.translations.filter(
                          tl => tl.languageId == 'en'
                        )[0].text}
                  </div>
                  <div className='text-trueGray-400 ml-2'>
                    {currentReading.text}
                  </div>
                  <div className='table text-trueGray-400 sm:flex sm:flex-wrap'>
                    {currentReading.sources.map(currentSource => {
                      if (
                        currentSource.title &&
                        currentSource.title.length > 0
                      ) {
                        if (currentSource.textClass == 'mod') {
                          return (
                            <div className='block ml-2'>
                              {'(' + currentSource.title + ')'}
                            </div>
                          )
                        } else {
                          return (
                            <div className='block ml-2'>
                              {currentSource.title}
                            </div>
                          )
                        }
                      }
                    })}
                  </div>
                </div>
              ))}
            </div>
          ))}{' '}
        </div>
      )

      return (
        <div className='flex flex-wrap'>
          <Card className='flex-shrink w-1/3'>
            <Verses
              verses={currentVerseObjects}
              paragraphs
              showUnsupported
              disableWordPopover={true}
              direction='auto'
            />
          </Card>

          <Card className='flex-1 w-1/3'>{apparatusData}</Card>
        </div>
      )
    })

  return <>{verses}</>
}

export default Viewer
