import { tokenize } from 'string-punctuation-tokenizer'

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

export default function tagVariantsInVerseObjects(
  currentVerseObjects,
  filteredVariantObjects
) {
  if (currentVerseObjects) {
    filteredVariantObjects.forEach(variant => {
      const variantBaseTextSplit = variant.baseText
        .split(' ')
        .filter(txt => txt.trim().length > 0)

      currentVerseObjects.verseObjects.forEach(vo => {
        if (
          normalizeString(vo.text) === normalizeString(variantBaseTextSplit[0])
        ) {
          vo.text = '⸢' + vo.text
        }
        if (
          normalizeString(vo.text) ===
          normalizeString(variantBaseTextSplit[variantBaseTextSplit.length - 1])
        ) {
          vo.text = vo.text + '⸣'
        }
      })
    })
  }

  return currentVerseObjects
}
