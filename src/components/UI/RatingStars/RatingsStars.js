import { BsStarFill } from 'react-icons/bs';
import Rating from 'react-rating';

const RatingsStars = ({ initialRating, readonly, onChange }) => (
  <Rating
    readonly={readonly}
    onChange={(onChange && !readonly) && onChange}
    emptySymbol={<BsStarFill className="icon--xs icon--star-e mx-25" />}
    fullSymbol={<BsStarFill className="icon--xs icon--yellow mx-25" />}
    initialRating={initialRating || 1}
    fractions={2} />
);

export default RatingsStars;
