import { ObjectId } from 'mongodb';

export const RENT_TYPE = [
  {
    rentCategory: '단기 렌트',
    rentDescription: '일/주 단위',
    icon: 'MdCardTravel',
  },
  {
    rentCategory: '중기 렌트',
    rentDescription: '월 단위',
    icon: 'BsHouses',
  },
  {
    rentCategory: '장기 렌트',
    rentDescription: '연 단위',
    icon: 'BsBuildings',
  },
];

export const ROOM_TYPE = {
  bedroom: ['Studio', '1 Bedroom', '2 Bedroom', '3 Bedroom', '4+ Bedroom'],
  bathroom: ['Share', '1 Bathroom', '2 Bathroom', '3+ Bathroom'],
  bfee: ['중개비 있음', '중개비 없음'],
  utility: ['유틸리티 포함', '유틸리티 별도'],
};

export interface IAmenity {
  label: string;
  value: string;
  icon: string;
}

export interface IBuildingToSubwayInfo {
  _id: ObjectId;
  buildingId: ObjectId;
  name: string;
  distance: number;
  lines: string[];
}

export const AMENITY = [
  { label: '24h도어맨', value: 'Doorman', icon: 'MdSecurity' },
  { label: '헬스장', value: 'Gym', icon: 'CgGym' },
  { label: '엘리베이터', value: 'Elevator', icon: 'TbElevator' },
  { label: '로비', value: 'Lobby', icon: 'TbSofa' },
  { label: '주차장', value: 'Garage', icon: 'MdOutlineGarage' },
  { label: '루프탑', value: 'Roof', icon: 'TbLiveView' },
  { label: '세탁실', value: 'WashRoom', icon: 'MdOutlineLocalLaundryService' },
  {
    label: '실내농구장',
    value: 'IndoorBasket',
    icon: 'MdOutlineSportsBasketball',
  },
  { label: '스크린골프', value: 'IndoorGolf', icon: 'MdOutlineSportsGolf' },
  { label: '공용주방', value: 'CommonKitchen', icon: 'MdOutlineSoupKitchen' },
  { label: '수영장', value: 'Pool', icon: 'MdOutlinePool' },
  { label: '요가룸', value: 'YogaRoom', icon: 'MdOutlineSportsGymnastics' },
  { label: '와이파이', value: 'Wifi', icon: 'MdOutlineWifi' },
  { label: 'BBQ그릴', value: 'BBQ', icon: 'MdOutlineOutdoorGrill' },
];

export const FEATURE = [
  { label: '전자레인지', value: 'Microwave', icon: 'MdMicrowave' },
  { label: '냉난방', value: 'AC', icon: 'TbAirConditioning' },
  { label: '세탁기', value: 'Washer', icon: 'TbWashMachine' },
  { label: '건조기', value: 'Dryer', icon: 'MdOutlineLocalLaundryService' },
  { label: '식기세척기', value: 'Dishwasher', icon: 'TbWashMachine' },
  { label: '욕조', value: 'Bathtube', icon: 'MdOutlineBathtub' },
  { label: '발코니', value: 'Balcony', icon: 'MdOutlineBalcony' },
];

interface Building {
  buildingId: string;
  coordinate: [number, number];
  price: number[];
}

export interface MapListing {
  [key: string]: Building;
}
