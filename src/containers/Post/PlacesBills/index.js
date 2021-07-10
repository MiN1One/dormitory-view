import Bills from './Bills';
import Places from './Places';

const PlacesBills = (props) => {
  return (
    <div className="post__section" id="placesbills">
      <div className="container">
        <div className="post__section__item">
          <div className="post__list-wrapper">
            <Bills {...props} />
          </div>
          <div className="post__list-wrapper">
            <Places {...props} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default PlacesBills;
