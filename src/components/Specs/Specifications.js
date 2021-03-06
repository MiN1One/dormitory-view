import { IoRestaurantOutline, IoSchoolOutline, IoWater, IoWifi } from "react-icons/io5";
import { BsLock } from "react-icons/bs";
import { FaMosque, FaRegHospital } from 'react-icons/fa';
import { GiBathtub, GiConsoleController, GiCookingPot, GiElectric, GiKeyLock, GiKnifeFork, GiMedicalThermometer, GiSofa,} from 'react-icons/gi';
import { RiComputerLine, RiForbid2Line, RiHealthBookLine, RiParkingBoxFill } from "react-icons/ri";
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
      parking: () => 
        <span className={className}>
          <RiParkingBoxFill className="icon--sm icon--grey mr-1" />
          Parking area
        </span>,
      kitchen: () =>
      <span className={className}>
        <GiKnifeFork className="icon--sm icon--grey mr-1" />
        Private kitchen
      </span>,
      bath: () =>
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
      gaming: () => 
        <span className={className}>
          <GiConsoleController className="icon--sm icon--grey mr-1" />
          Gaming area
        </span>,
      computer: () =>
        <span className={className}>
          <RiComputerLine className="icon--sm icon--grey mr-1" />
          Personal computer
        </span>,
      // public_libriary: () =>
      //   <span className={className}>
      //     <VscBook className="icon--sm icon--grey mr-1" />
      //     Public libriary
      //   </span>,
      // heating: () => 
      //   <span className={className}>
      //     <BiWater className="icon--sm icon--grey mr-1" />
      //     Heating
      //   </span>,
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
      bus_station: ({ spec }) =>
        <span className={className}>
          <BiBusSchool className="icon--sm icon--grey mr-1" />
          Bus station {spec}
        </span>,
      hospital: ({ spec }) =>
        <span className={className}>
          <FaRegHospital className="icon--sm icon--grey mr-1" />
          Hospital {spec}
        </span>,
      school: ({ spec }) =>
        <span className={className}>
          <IoSchoolOutline className="icon--sm icon--grey mr-1" />
          School {spec}
        </span>,
      libriary: ({ spec }) =>
        <span className={className}>
          <VscBook className="icon--sm icon--grey mr-1" />
          Libriary {spec}
        </span>,
      restaurant: ({ spec }) =>
        <span className={className}>
          <IoRestaurantOutline className="icon--sm icon--grey mr-1" />
          Restaurant {spec}
        </span>,
      market: ({ spec }) => 
        <span className={className}>
          <AiOutlineShop className="icon--sm icon--grey mr-1" />
          Shopping market {spec}
        </span>,
      mosque: ({ spec }) => 
        <span className={className}>
          <FaMosque className="icon--sm icon--grey mr-1" />
          Mosque {spec}
        </span>
    },

    placesOptions: {
      mosque: {
        title: 'Mosque name',
        spec: {
          type: 'text',
          placeholder: 'Name'
        }
      },
      bus_station: {
        title: 'Bus numbers (Optional)',
        spec: {
          type: 'text',
          placeholder: 'Buses e.g. 75, 90'
        }
      },
      school: {
        title: 'School number (Optional)',
        spec: {
          type: 'number',
          placeholder: 'School number'
        }
      },
      hospital: {
        title: 'Hospital name',
        spec: {
          type: 'text',
          placeholder: 'Name or number'
        }
      },
      libriary: {
        title: 'Bus numbers (Optional)',
        spec: {
          type: 'text',
          placeholder: 'Buses e.g. 75, 90'
        }
      },
      restaurant: {
        title: 'Name of the restaurant',
        spec: {
          type: 'text',
          placeholder: 'Name'
        }
      },
      market: {
        title: 'Market name',
        spec: {
          type: 'text',
          placeholder: 'Name'
        }
      }
    }
  };
};

export default Specifications;