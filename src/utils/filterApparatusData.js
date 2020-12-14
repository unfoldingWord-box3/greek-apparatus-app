import apparatusData from '../mocks/ugnt_mrk_apparatus.js'
import filterApparatusReadings from '@utils/filterApparatusReadings'

export default function filterApparatusData(referenceChapter, referenceVerse, isAncientSourcesRequired, isTranslatableVariantsRequired) {
  let filtered = []
  if (apparatusData.chapters[referenceChapter]) {
    const chapter = apparatusData.chapters[referenceChapter]
    if (chapter[referenceVerse]) {
      filtered = apparatusData.chapters[referenceChapter][referenceVerse]
      filtered = filterApparatusReadings({
        variantObjects: filtered.variantObjects,
        requireAncient: isAncientSourcesRequired,
        requireIsTranslatable: isTranslatableVariantsRequired,
      })
    }
  }
  return filtered
}
