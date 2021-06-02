import { BsPlus } from "react-icons/bs"
import { IoIosClose } from "react-icons/io";

const NumRoomsFilter = () => {

  return (
    <div className="filters__section" id="rooms">
      <div className="filters__title">By number of rooms</div>
      <div className="filters__form">
        <div className="flex jce mb-1">
          <button 
            className="filters__btn-close tooltip" 
            onClick={() => {}}>
              <IoIosClose className="icon icon--grey" />
              <span className="tooltip__text tooltip__text--top tooltip__text--center">
                Clear
              </span>
          </button>
        </div>
        <div className="flex jcsb w-100">
          <button className="filters__btn-inc filters__input">
            <BsPlus className="icon icon--grey" />
          </button>
          <input 
            className="filters__input filters__input--sm"
            placeholder="Room count"
            type="number" />
          <button className="filters__btn-inc filters__input">
            <BsPlus className="icon icon--grey" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default NumRoomsFilter;