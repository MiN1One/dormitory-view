const defaultRoom = {
  air_conditioner: false,
  bath: false,
  gaming: false,
  washing_machine: false,
  condition: 'good',
  numberOfRooms: 0,
  rooms: {},
  computer: false,
  parking: false,
  internet: false,
  furnitured: false,
  price: '',
  kitchen: false,
  offers: []
};

const rooms = {
  living_room: {
    maxcount: 5,
    countable: true  
  },
  dining_room: {
    maxcount: 5,
    countable: true
  },
  bedroom: {
    maxcount: 5,
    countable: true
  },
  kitchen: {
    maxcount: 1,
    countable: false
  },
  guest_room: {
    maxcount: 2,
    countable: true
  },
  bathroom: {
    maxcount: 2,
    countable: false
  },
  basement: {
    maxcount: 1,
    countable: false
  },
  home_office: {
    maxcount: 5,
    countable: true
  },
  storage_room: {
    maxcount: 1,
    countable: false
  },
  gym_room: {
    maxcount: 2,
    countable: false
  }
};

const CONFIG = {
  defaultRoom,
  condition: ['good', 'medium', 'poor'],
  kitchen: ['private', 'public'],
  bath: ['private', 'public'],
  rooms
};

export default CONFIG;