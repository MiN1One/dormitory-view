import { memo } from 'react';
import Region from './Region';
import MainDetails from './MainDetails'

const MainDetailsRegion = ({ error, data, setData }) => (
  <div className="w-100" id="main">
    <div className="container">
      {error && (
        <div className="post__error">
          {error}
        </div>
      )}
      <MainDetails setData={setData} data={data} />
    </div>
    <div className="post__section">
      <div className="container">
        <Region setData={setData} data={data} />
      </div>
    </div>
  </div>
);

export default memo(MainDetailsRegion);
