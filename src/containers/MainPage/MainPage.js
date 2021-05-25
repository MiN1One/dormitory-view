import React from 'react';

import Header from './Header/Header';
import './Popular/Popular';
import Popular from './Popular/Popular';
import regions from '../../store/locales/regions_en';

const MainPage = () => {
  const temp = {};
  regions.forEach((el, i) => {
    const regions = el.regions.map(reg => reg.val);
    temp[el.val] = regions;
  });

  console.log([temp]);

  return (
    <main>
      <Header />
      <Popular />
    </main>
  );
};

export default MainPage;
