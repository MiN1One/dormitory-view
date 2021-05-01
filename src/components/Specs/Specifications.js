import { IoChevronBackOutline, IoChevronForwardOutline, IoRestaurantOutline, IoSchoolOutline, IoWater, IoWaterOutline, IoWifi } from "react-icons/io5";
import { BsArrowsFullscreen, BsHouseDoorFill, BsLock, BsStar, BsStarFill } from "react-icons/bs";
import { FaMapMarkerAlt, FaRegClipboard, FaRegHospital } from 'react-icons/fa';
import { GiBathtub, GiConsoleController, GiCookingPot, GiElectric, GiKeyLock, GiKeyring, GiKnifeFork, GiMedicalThermometer, GiSofa, GiSpoon } from 'react-icons/gi';
import { IoIosSchool } from "react-icons/io";
import { RiComputerLine, RiForbid2Line, RiHealthBookLine } from "react-icons/ri";
import { VscBook, VscDeviceCameraVideo } from "react-icons/vsc";
import { AiOutlineIdcard, AiOutlineShop } from "react-icons/ai";
import { MdLocalLaundryService, MdSmokingRooms } from 'react-icons/md';
import { BiBusSchool, BiWater } from 'react-icons/bi';
import { GrInternetExplorer } from 'react-icons/gr';
import { useTranslation } from "react-i18next";

const Specifications = () => {
  const { t } = useTranslation();

  return {
    // FACILITIES
    facilities: {
      internet: () => 
        <span className="adview__specs-item">
          <IoWifi className="icon--sm icon--grey mr-1" />
          Internet connection
        </span>,
      private_kitchen: () =>
      <span className="adview__specs-item">
        <GiKnifeFork className="icon--sm icon--grey mr-1" />
        Private kitchen
      </span>,
      private_bath: () =>
        <span className="adview__specs-item">
          <GiBathtub className="icon--sm icon--grey mr-1" />
          Private bathroom
        </span>,
      furnitured: () =>
        <span className="adview__specs-item">
          <GiSofa className="icon--sm icon--grey mr-1" />
          Furnitured
        </span>,
      air_conditioner: () =>
        <span className="adview__specs-item">
          <GiMedicalThermometer className="icon--sm icon--grey mr-1" />
          Air conditioner
        </span>,
      washing_machine: () =>
        <span className="adview__specs-item">
          <MdLocalLaundryService className="icon--sm icon--grey mr-1" />
          Washing machine
        </span>,
      gaming_area: () => 
        <span className="adview__specs-item">
          <GiConsoleController className="icon--sm icon--grey mr-1" />
          Gaming area
        </span>,
      personal_computer: () =>
        <span className="adview__specs-item">
          <RiComputerLine className="icon--sm icon--grey mr-1" />
          Personal computer
        </span>,
      public_libriary: () =>
        <span className="adview__specs-item">
          <VscBook className="icon--sm icon--grey mr-1" />
          Public libriary
        </span>,
      others: (list) =>
        <div className="adview__specs-item--etc">
          <span className="f-bold">Others: </span>
          {list.join(', ')}
        </div>
    },

    // SECURITY
    security: {
      cctv: () =>
        <span className="adview__specs-item">
          <VscDeviceCameraVideo className="icon--sm icon--grey mr-1" />
          CCTV Cameras
        </span>,
      health: () =>
        <span className="adview__specs-item">
          <RiHealthBookLine className="icon--sm icon--grey mr-1" />
          Health maintenance
        </span>,
      controlled_access: () =>
        <span className="adview__specs-item">
          <BsLock className="icon--sm icon--grey mr-1" />
          Controlled access
        </span>,
      card_access: () =>
        <span className="adview__specs-item">
          <AiOutlineIdcard className="icon--sm icon--grey mr-1" />
          Access with cards
        </span>,
      additional_keys: () =>
        <span className="adview__specs-item">
          <GiKeyLock className="icon--sm icon--grey mr-1" />
          Additional keys
        </span>
    },
    
    // RULES
    rules: {
      no_smoking: () =>
        <span className="adview__specs-item">
          <MdSmokingRooms className="icon--sm icon--grey mr-1" />
          No smoking
        </span>,
      no_late_access: () =>
        <span className="adview__specs-item">
          <RiForbid2Line className="icon--sm icon--grey mr-1" />
          No late access
        </span>,
      
    },
    
    // BILLS
    bills: {
      water_bill: () => 
        <span className="adview__specs-item">
          <IoWater className="icon--sm icon--grey mr-1" />
          Water
        </span>,
      heating_bill: () => 
        <span className="adview__specs-item">
          <BiWater className="icon--sm icon--grey mr-1" />
          Heating
        </span>,
      internet_bill: () => 
        <span className="adview__specs-item">
          <GrInternetExplorer className="icon--sm icon--grey mr-1" />
          Internet
        </span>,
      electricity_bill: () => 
        <span className="adview__specs-item">
          <GiElectric className="icon--sm icon--grey mr-1" />
          Electricity
        </span>,
      gas_bill: () => 
        <span className="adview__specs-item">
          <GiCookingPot className="icon--sm icon--grey mr-1" />
          Gas
        </span>
    },
    
    // NEARBY PLACES
    places: {
      bus_station: () =>
        <span className="adview__specs-item">
          <BiBusSchool className="icon--sm icon--grey mr-1" />
          Bus station
        </span>,
      hospital: () =>
        <span className="adview__specs-item">
          <FaRegHospital className="icon--sm icon--grey mr-1" />
          Hospital
        </span>,
      school: () =>
        <span className="adview__specs-item">
          <IoSchoolOutline className="icon--sm icon--grey mr-1" />
          School №15
        </span>,
      libriary: () =>
        <span className="adview__specs-item">
          <VscBook className="icon--sm icon--grey mr-1" />
          Libriary
        </span>,
      restaurant: () =>
        <span className="adview__specs-item">
          <IoRestaurantOutline className="icon--sm icon--grey mr-1" />
          Restaurant
        </span>,
      market: () => 
        <span className="adview__specs-item">
          <AiOutlineShop className="icon--sm icon--grey mr-1" />
          Shopping market
        </span>
    }
  };
};

export default Specifications;