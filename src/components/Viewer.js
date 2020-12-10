import {Verses} from "scripture-resources-rcl";
import usfmJS from 'usfm-js';

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
  
  const verses = Object.keys(chapters[chapterKey]).filter(key => key.match(/^\d+$/)).map(
    (currentVerseKey) => {
      let currentVerseObjects = [];
      currentVerseObjects[1] = chapters[chapterKey][currentVerseKey];

      const filteredVariantObjects = filterApparatusData(chapterKey, currentVerseKey);

      //const apparatusData = JSON.stringify(filterApparatusData(chapterKey, currentVerseKey), null, 4)
      let apparatusData = <div> {
        filteredVariantObjects.map(
            currentVariantObject => (
              <>
                <br/>
                <span>[{currentVariantObject.baseText}]</span>
                <br/>
                {
                  currentVariantObject.readings.map(
                    currentReading => (
                      <>
                        <span>{currentReading.text}</span>
                        <span>-</span>
                        <span>{currentReading.translations[1].text}</span>
                        {
                          currentReading.sources.map(
                            currentSource => ((currentSource.textClass == "mod")?
                              <><span>(</span><span>{currentSource.title}</span><span>)</span></>
                              : <span>{currentSource.title}</span>
                              )
                            )
                        }
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
        <div>
          <div>
            {currentVerseKey}<Verses verses={currentVerseObjects} paragraphs showUnsupported />
          </div>
          <br/>
          <div>
            <pre>{apparatusData}</pre>
          </div>
          <hr/>
        </div>
      );
    }
  );

  return (<>{verses}</>);
};

export default Viewer;