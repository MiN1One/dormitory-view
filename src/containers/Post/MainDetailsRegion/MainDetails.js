import React from 'react';
import { useTranslation } from 'react-i18next';

import Dropdown from '../../../components/UI/Dropdown/Dropdown';

const MainDetails = ({ data, setData }) => {
  const { t } = useTranslation();

  const onEnterInput = (e, name) => 
    setData(p => ({ ...p, [name]: e.target.value }));

  return (
    <div className="post__form">
      <label className="post__input-group input__label">
        <span className="post__title">Title</span>
        <input 
          className="input input--main post__input"
          placeholder="Main Title"
          minLength="5"
          maxLength="25"
          type="text"
          value={data.title}
          onChange={(e) => onEnterInput(e, 'title')} />
        <span className="input__label-text">{25 - data.title.length} Characters left</span>
      </label>
      <label className="post__input-group input__label">
        <span className="post__title">Address</span>
        <input 
          className="input input--main post__input"
          placeholder="Street, Apt, Post Index"
          type="text"
          value={data.address}
          onChange={(e) => onEnterInput(e, 'address')} />
      </label>
      <div className="post__input-group input__label">
        <span className="post__title">Property type</span>
        <Dropdown
          title={t(`ownership.${data.ownership}`)}
          positionX="left"
          className="input input--main post__input"
          items={[
            {
              title: 'Private',
              click: () => setData(p => ({ ...p, ownership: 'private' })),
              active: data.ownership === 'private'
            },
            {
              title: 'University property',
              click: () => setData(p => ({ ...p, ownership: 'university-owned' })),
              active: data.ownership === 'university-owned'
            }
          ]} />
      </div>
      {data.ownership === 'university-owned' && (
        <label className="post__input-group input__label">
          <span className="post__title">Organization / University name</span>
          <input 
            className="input input--main post__input"
            placeholder="Name of the institution"
            type="text"
            value={data.organization || ''}
            onChange={(e) => onEnterInput(e, 'organization')} />
        </label>
      )}
    </div>
  );
}

export default MainDetails;
