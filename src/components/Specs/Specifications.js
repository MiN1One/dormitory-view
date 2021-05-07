import { IoRestaurantOutline, IoSchoolOutline, IoWater, IoWifi } from "react-icons/io5";
import { BsLock } from "react-icons/bs";
import { FaRegHospital } from 'react-icons/fa';
import { GiBathtub, GiConsoleController, GiCookingPot, GiElectric, GiKeyLock, GiKnifeFork, GiMedicalThermometer, GiSofa,} from 'react-icons/gi';
import { RiComputerLine, RiForbid2Line, RiHealthBookLine } from "react-icons/ri";
import { VscBook, VscDeviceCameraVideo } from "react-icons/vsc";
import { AiOutlineIdcard, AiOutlineShop } from "react-icons/ai";
import { MdLocalLaundryService, MdSmokingRooms } from 'react-icons/md';
import { BiBusSchool, BiWater } from 'react-icons/bi';
import { GrInternetExplorer } from 'react-icons/gr';
import { useTranslation } from "react-i18next";

const Specifications = (className) => {
  const { t } = useTranslation();

  return {
    // FACILITIES
    facilities: {
      internet: () => 
        <span className={className}>
          <IoWifi className="icon--sm icon--grey mr-1" />
          Internet connection
        </span>,
      private_kitchen: () =>
      <span className={className}>
        <GiKnifeFork className="icon--sm icon--grey mr-1" />
        Private kitchen
      </span>,
      private_bath: () =>
        <span className={className}>
          <GiBathtub className="icon--sm icon--grey mr-1" />
          Private bathroom
        </span>,
      furnitured: () =>
        <span className={className}>
          <GiSofa className="icon--sm icon--grey mr-1" />
          Furnitured
        </span>,
      air_conditioner: () =>
        <span className={className}>
          <GiMedicalThermometer className="icon--sm icon--grey mr-1" />
          Air conditioner
        </span>,
      washing_machine: () =>
        <span className={className}>
          <MdLocalLaundryService className="icon--sm icon--grey mr-1" />
          Washing machine
        </span>,
      gaming_area: () => 
        <span className={className}>
          <GiConsoleController className="icon--sm icon--grey mr-1" />
          Gaming area
        </span>,
      personal_computer: () =>
        <span className={className}>
          <RiComputerLine className="icon--sm icon--grey mr-1" />
          Personal computer
        </span>,
      public_libriary: () =>
        <span className={className}>
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
        <span className={className}>
          <VscDeviceCameraVideo className="icon--sm icon--grey mr-1" />
          CCTV Cameras
        </span>,
      health: () =>
        <span className={className}>
          <RiHealthBookLine className="icon--sm icon--grey mr-1" />
          Health maintenance
        </span>,
      controlled_access: () =>
        <span className={className}>
          <BsLock className="icon--sm icon--grey mr-1" />
          Controlled access
        </span>,
      card_access: () =>
        <span className={className}>
          <AiOutlineIdcard className="icon--sm icon--grey mr-1" />
          Access with cards
        </span>,
      additional_keys: () =>
        <span className={className}>
          <GiKeyLock className="icon--sm icon--grey mr-1" />
          Additional keys
        </span>
    },
    
    // RULES
    rules: {
      no_smoking: () =>
        <span className={className}>
          <MdSmokingRooms className="icon--sm icon--grey mr-1" />
          No smoking
        </span>,
      no_late_access: () =>
        <span className={className}>
          <RiForbid2Line className="icon--sm icon--grey mr-1" />
          No late access
        </span>,
      
    },
    
    // BILLS
    bills: {
      water_bill: () => 
        <span className={className}>
          <IoWater className="icon--sm icon--grey mr-1" />
          Water
        </span>,
      heating_bill: () => 
        <span className={className}>
          <BiWater className="icon--sm icon--grey mr-1" />
          Heating
        </span>,
      internet_bill: () => 
        <span className={className}>
          <GrInternetExplorer className="icon--sm icon--grey mr-1" />
          Internet
        </span>,
      electricity_bill: () => 
        <span className={className}>
          <GiElectric className="icon--sm icon--grey mr-1" />
          Electricity
        </span>,
      gas_bill: () => 
        <span className={className}>
          <GiCookingPot className="icon--sm icon--grey mr-1" />
          Gas
        </span>
    },
    
    // NEARBY PLACES
    places: {
      bus_station: () =>
        <span className={className}>
          <BiBusSchool className="icon--sm icon--grey mr-1" />
          Bus station
        </span>,
      hospital: () =>
        <span className={className}>
          <FaRegHospital className="icon--sm icon--grey mr-1" />
          Hospital
        </span>,
      school: () =>
        <span className={className}>
          <IoSchoolOutline className="icon--sm icon--grey mr-1" />
          School №15
        </span>,
      libriary: () =>
        <span className={className}>
          <VscBook className="icon--sm icon--grey mr-1" />
          Libriary
        </span>,
      restaurant: () =>
        <span className={className}>
          <IoRestaurantOutline className="icon--sm icon--grey mr-1" />
          Restaurant
        </span>,
      market: () => 
        <span className={className}>
          <AiOutlineShop className="icon--sm icon--grey mr-1" />
          Shopping market
        </span>
    }
  };
};

export default Specifications;