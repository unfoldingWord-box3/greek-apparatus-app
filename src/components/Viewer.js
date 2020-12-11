import Card from '@components/Card'

import {Verses} from "scripture-resources-rcl";
import usfmJS from 'usfm-js';
import {tokenize} from 'string-punctuation-tokenizer';

import { parseResourceLink, extendProject, resourceFromResourceLink, getResourceManifest } from 'scripture-resources-rcl';
import { versesFromReferenceIdAndBooks, referenceIdFromReference } from 'scripture-resources-rcl';

import ugnt_mrk from '../mocks/ugnt_mrk.usfm';
import apparatusData from '../mocks/ugnt_mrk_apparatus.js';

// let verses = [];
// verses[1] = chapters[chapterKey][1];

function Viewer ({
}) {
  // TODO: Download from door43.
  
  const usfmJSON = usfmJS.toJSON(ugnt_mrk);
  //console.log(usfmJSON);
  const {chapters} = usfmJSON;
  const chapterKey = '2';

  console.log("--- --- ---");
  //console.log(JSON.stringify(usfmJSON));
  console.log("--- --- ---");

  const filterApparatusData = (referenceChapter, referenceVerse) => {
    let filtered = [];
    if (apparatusData.chapters[referenceChapter])
    {
      const chapter = apparatusData.chapters[referenceChapter];
      if (chapter[referenceVerse])
      {
        filtered = apparatusData.chapters[referenceChapter][referenceVerse];
        filtered = filterApparatusReadings({
            variantObjects: filtered.variantObjects, 
            requireIsTranslatable: false,
            requireAncient: false
        });
      }
    }
    return filtered;
  };

  const filterApparatusReadings = ({variantObjects, requireIsTranslatable, requireAncient}) => {
    let filteredVariantObjects = [];

    variantObjects.forEach(
      currentVariantObject => {
        const filteredReadings = currentVariantObject.readings.filter(vo => 
          vo.isTranslatable || requireIsTranslatable == false
        );

        currentVariantObject.readings = [];
        filteredReadings.forEach(rd => {
          // Filter sources:
          rd.sources = rd.sources.filter(src => 
            src.textClass !== "mod" || requireAncient == false
          );

          if (rd.sources.length > 0) {
            currentVariantObject.readings.push(rd);
          }
        });

        filteredVariantObjects.push(currentVariantObject);
      }
    );

    return variantObjects;
  };

  Array.prototype.insert = function ( index, item ) {
    this.splice( index, 0, item );
  };
  
  const tokenizer = (text) => {
    return tokenize({
      text: text,
      greedy: true,
      normalize: true,
    });
  };

  const normalizeString = (string) => {
    const normalized = tokenizer(string).join(' ').replace('ʼ', '').replace('’', '');
    return normalized;
  };

  const tagVariantsInVerseObjects = (currentVerseObjects, filteredVariantObjects) =>
  {
      // {"type":"text","text":", "}
      //currentVerseObjects[1].verseObjects.insert(3, {type: 'text', text: '⸢'});

      if (currentVerseObjects)
      {
        filteredVariantObjects.forEach(variant =>{
          const variantBaseTextSplit = variant.baseText.split(" ").filter(txt => txt.trim().length > 0);

          currentVerseObjects.verseObjects.forEach(vo => {
            if (normalizeString(vo.text) === normalizeString(variantBaseTextSplit[0]))
            {
              vo.text = '⸢' + vo.text;
            }
            if (normalizeString(vo.text) === normalizeString(variantBaseTextSplit[variantBaseTextSplit.length-1]))
            {
              vo.text = vo.text + '⸣';
            }
          });
        });
      }

      return currentVerseObjects;
  };
  
  const verses = Object.keys(chapters[chapterKey]).filter(key => key.match(/^\d+$/)).map(
    (currentVerseKey) => {
      let currentVerseObjects = [];
      currentVerseObjects[1] = chapters[chapterKey][currentVerseKey];

      const filteredVariantObjects = filterApparatusData(chapterKey, currentVerseKey);

      currentVerseObjects[1] = tagVariantsInVerseObjects(currentVerseObjects[1], filteredVariantObjects);

      //const apparatusData = JSON.stringify(filterApparatusData(chapterKey, currentVerseKey), null, 4)
      let apparatusData = <div> {
        filteredVariantObjects.map(
            currentVariantObject => (
              <>
                <br/>
                <span className="apparatusBaseText">{currentVariantObject.baseText}</span>
                {
                  currentVariantObject.readings.map(
                    currentReading => (
                      <>
                        <span className="apparatusTranslationText">{(currentReading.text.trim().length == 0)? '(Omit)' : currentReading.translations.filter(tl => tl.languageId == "ru")[0].text}</span>
                        <span className="apparatusVariantText">{currentReading.text}</span>
                          <span className="apparatusSourceContainer tooltip">
                            <span className="tooltiptext">Sources</span>
                            {
                            currentReading.sources.map(
                              currentSource => {
                                if (currentSource.title && currentSource.title.length > 0)
                                {
                                  if (currentSource.textClass == "mod") {
                                    return <span className="apparatusSource">{'(' + currentSource.title + ')'}</span>
                                  } 
                                  else {
                                    return <span className="apparatusSource">{currentSource.title}</span>;
                                  }
                                }
                                }
                              )
                            }
                            </span>
                        <br/>
                      </>
                    )
                  )
                }
                <br/>
              </>
            )
        ) } </div>;

      return (
        <div className='flex'>
          <div className="m-2 bg-white border border-gray-300 p-5 rounded-md shadow-lg">
            {currentVerseKey}<Verses verses={currentVerseObjects} paragraphs showUnsupported />
          </div>
          
          <div className="m-2 bg-white border border-gray-300 p-5 rounded-md shadow-lg">
            <pre>{apparatusData}</pre>
          </div>
        </div>
      );
    }
  );

  return (<>{verses}</>);
};

export default Viewer;