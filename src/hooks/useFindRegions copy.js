import { useCallback, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

const useFindRegions = (options) => {
  const { regions } = useSelector(s => s.main);
  const { t } = useTranslation('regions');

  const AdjacentR = options.regionAdjacent && options.regionAdjacent;  
  const AdjacentC = options.cityAdjacent && options.cityAdjacent;

  const regionsList = useRef();
  if (!regionsList.current && options.getAll) {
    const citiesEl = [];
    for (let key in regions) {
      citiesEl.push((
        <li 
          tabIndex="0"
          className={options.className} 
          onMouseDown={() => {
            options.clickCity({
              city: key,
              regions: regions[key].regions
            });
          }}>
            {t(`regions:${key}.title`)}
            <AdjacentC />
        </li>
      ));
      regionsList.current = citiesEl;
    }
  }

  if (options.selectedCity && options.getAll) {
    const sub = regions[options.selectedCity].regions.map((el) => (
      <li 
          key={el}
          tabIndex="0"
          className={options.className} 
          onMouseDown={() => options.clickRegion(el)}>
            {t(`regions:${options.selectedCity}.regions.${el}`)}
            <AdjacentR click={() => 
              options.clickAdjacentR && options.clickAdjacentR(el)
            } />
        </li>
    ));
    regionsList.current = sub;
  }

  const [elements, setElements] = useState([]);

  const onSearchForRegion = useCallback((search) => {
    if (search === '') {
      return setElements([]);
    }
      
    const regionsEl = [];

    for (const [key, val] of Object.entries(regions)) {
      if (!val.hasOwnProperty('translated')){
        return setElements([]);
      }

      const regionIndex = val.translated.regions.findIndex(el => 
        el.toUpperCase().indexOf(search.toUpperCase()) !== -1
      );
      const searchByCity = val.translated.city.toUpperCase().indexOf(search.toUpperCase()) !== -1;

      if (regionIndex > -1 || searchByCity) {
        let el;
        if (options.searchByRegion && regionIndex > -1) {
          // newRegList[val.regions[regionIndex]] = key;
          el = (
            <li 
              tabIndex="0"
              className={options.className} 
              key={val.regions[regionIndex]} 
              onMouseDown={() => options.clickRegion({
                city: key,
                region: val.regions[regionIndex]
              })}>
                <div className="flex fdc">
                  {val.translated.regions[regionIndex]}
                  <span className="c-grey-l mt-5"> {val.translated.city}</span>
                </div>
                <AdjacentR click={() => 
                  options.clickAdjacentR && options.clickAdjacentR(val.regions[regionIndex])
                } />
            </li>
          )
        } else {
          // newRegList[key] = val;
          el = (
            <li 
              tabIndex="0"
              className={options.className} 
              key={key}
              onMouseDown={() => options.clickCity({
                city: key,
                regions: val.regions
              })}>
                {val.translated.city}
                <AdjacentC />
            </li>
          );
        }
        
        regionsEl.push(el);
        setElements(regionsEl);
      }
    }
  }, [regions, options]);

  return {
    regions,
    onSearchForRegion,
    elements: elements.length > 0 ? elements : (regionsList.current || [])
  };
}

export default useFindRegions;
