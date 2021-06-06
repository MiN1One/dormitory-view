import { useCallback, useState } from 'react';
import { useSelector } from 'react-redux';

const useFindRegions = () => {
  const { regions: regList } = useSelector(s => s.main);
  const [regions, setRegions] = useState({ ...regList });

  const onSearchForRegion = useCallback((search) => {
    if (search === '')
      return setRegions(regList);
      
    const newRegList = {};

    for (const [key, val] of Object.entries(regions)) {
      if (!val.hasOwnProperty('translated'))
        return setRegions(regList);

      const searchByReg = val.translated.regions.findIndex(el => el.toUpperCase().includes(search.toUpperCase())) > -1;
      const searchByCity = val.translated.city.toUpperCase().includes(search.toUpperCase());
      if (searchByReg || searchByCity) 
        newRegList[key] = val;
    }
    
    setRegions(newRegList);
  }, [regList, regions]);

  return { regions, onSearchForRegion }
}

export default useFindRegions;
