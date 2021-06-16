import React, { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import useFetchData from '../../hooks/useFetchData';

import Header from './Header/Header';
import './Popular/Popular';
import Popular from './Popular/Popular';

const MainPage = () => {
  const [activeRegion, setActiveRegion] = useState();
  const { popular } = useSelector(s => s.main);

  useEffect(() => {
    if (popular) {
      setActiveRegion(Object.keys(popular)[0]);
    }
  }, [popular]);

  return (
    <main>
      <Header data={popular} />
      <Popular 
        data={popular} 
        activeRegion={activeRegion}
        setActiveRegion={setActiveRegion} />
    </main>
  );
};

export default React.memo(MainPage);
