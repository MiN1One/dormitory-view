import { useCallback, useState } from 'react';
import { useSelector } from 'react-redux';

const useFindRegions = (options = {
  getBySearch: false,
  regionSearch: false
}) => {
  const { regions: regList } = useSelector(s => s.main);
  const [regions, setRegions] = useState(options.getBySearch ? {} : { ...regList });

  const onSearchForRegion = useCallback((search) => {
    if (search === '')
      return setRegions(options.getBySearch ? {} : regList);
      
    const newRegList = {};

    for (const [key, val] of Object.entries(regList)) {
      if (!val.hasOwnProperty('translated'))
        return setRegions(options.getBySearch ? {} : regList);

      const regionIndex = val.translated.regions.findIndex(el => 
        el.toUpperCase().indexOf(search.toUpperCase()) !== -1
      );

      const searchByCity = val.translated.city.toUpperCase().indexOf(search.toUpperCase()) !== -1;

      if (regionIndex > -1 || searchByCity) {
        if (options.regionSearch && regionIndex > -1 && !searchByCity) {
          newRegList[val.regions[regionIndex]] = {
            city: key,
            regionOnly: true
          };
        } else {
          newRegList[key] = val;
        }
      }
    }
    
    setRegions({ ...newRegList });
  }, [regList, options.regionSearch, options.getBySearch]);

  return { regions, onSearchForRegion }
};

export default useFindRegions;