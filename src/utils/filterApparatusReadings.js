export default function filterApparatusReadings({
  variantObjects,
  requireIsTranslatable,
  requireAncient,
}) {
  let filteredVariantObjects = []

  variantObjects.forEach(currentVariantObject => {
    const filteredReadings = currentVariantObject.readings.filter(
      vo => vo.isTranslatable || requireIsTranslatable == false
    )

    currentVariantObject.readings = []
    filteredReadings.forEach(rd => {
      // Filter sources:
      rd.sources = rd.sources.filter(
        src => (src.textClass !== 'mod' || requireAncient == false) && src.title.trim().length > 0
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
