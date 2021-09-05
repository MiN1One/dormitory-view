import { Link } from 'react-router-dom';
import { FcPhone } from 'react-icons/fc';
import { useTranslation } from 'react-i18next';

import Modal from '../../../components/UI/Modal/Modal';
import Ratings from '../Ratings/Ratings';
import RatingsStars from '../../../components/UI/RatingStars/RatingsStars';
import { copyToClipboard } from '../../../utilities/utils';
import { memo } from 'react';

const Contact = ({ close, open, data }) => {
  const { t } = useTranslation();

  return (
    <Modal 
      close={close} 
      title="Contact"
      actionTitle="Call"
      action={() => window.open(data?.phone_number)}>
        <div className="c-grace f-thin f-lg mb-1">Landlord: </div>
        <div className="flex aic jcsb mb-2">
          <span className="f-sl f-light c-black">{data?.last_name} {data?.name}</span>
          <Link to="/" className="btn--sub">Profile</Link>
        </div>
        <div className="flex aic jcsb mb-2">
          <div className="flex aic">
            <RatingsStars initialRating={data?.averageRating} readonly />
            <span className="flex ml-1 f-thin f-xl c-grey">
              {(data && data.numberOfReviews > 0)
                ? `${data?.averageRating} (${data?.numberOfReviews})`
                : (
                  <span className="f-mid">
                    No reviews
                  </span>
                )
              }
            </span>
          </div>
          <Link to={`/users/${data._id}#reviews`} className="btn--sub">
            See all reviews
          </Link>
        </div>
        <div className="flex aic mb-1">
          <FcPhone className="icon--mid mr-5" />
          <span className="c-grace f-thin f-lg mr-1">Mobile: </span>
        </div>
        <div className="f-sl f-thin c-grey flex aic jcsb">
          +{data?.phone_number}
          <button 
            className="btn--sub" 
            onClick={() => copyToClipboard(`+${data?.phone_number}`)}>
              Copy
          </button>
        </div>
    </Modal>
  );
};

export default memo(Contact);