import ApparatusSource from '@components/ApparatusSource'

export default function ApparatusData({ filteredVariantObjects }) {
  return (
    <div className='apparatusRow flex flex-wrap'>
      {' '}
      {filteredVariantObjects.map((currentVariantObject, i) => (
        <div key={`${i}-variant`} className='mb-8'>
          <span className='table text-blue-700 text-lg'>
            {currentVariantObject.baseText}
          </span>
          {currentVariantObject.readings.map((currentReading, i) => (
            <div key={`${i}-readings`} className='flex flex-wrap'>
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
                {currentReading.sources.map((currentSource, i) => {
                  if (currentSource.title && currentSource.title.length > 0) {
                    if (currentSource.textClass == 'mod') {
                      return (
                        <div key={`${i}-source`} className='block ml-2'>
                          {'(' + currentSource.title + ')'}
                        </div>
                      )
                    } else {
                      return (
                        <div key={`${i}-source`} className='block ml-2'>
                          {
                            currentSource.title.split(' ').map(
                              (src, j) => (
                                <span key={i + '-source' + '-' + j + '-title'} className="tooltip mr-1">
                                  {src}
                                  <span className="tooltip-text">
                                    <ApparatusSource source={src}/>
                                  </span>
                                </span>
                              )
                            )
                          }
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
}
