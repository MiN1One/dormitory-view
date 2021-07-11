import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import useTitle from '../../hooks/useTitle';
import Header from './Header/Header';
import Popular from './Popular/Popular';

const MainPage = () => {
  useTitle('HOLIS | Housing for students');

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
