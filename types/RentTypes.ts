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

export const SEARCH_OPTIONS = {
  bed: [
    { label: 'Studio', value: 'Studio' },
    { label: '1 Bedroom', value: '1 Bedroom' },
    { label: '2 Bedroom', value: '2 Bedroom' },
    { label: '3 Bedroom', value: '3 Bedroom' },
    { label: '4+ Bedroom', value: '4+ Bedroom' },
  ],
  bath: [
    { label: 'Share', value: 'Share' },
    { label: '1 Bathroom', value: '1 Bathroom' },
    { label: '2 Bathroom', value: '2 Bathroom' },
    { label: '3+ Bathroom', value: '3+ Bathroom' },
  ],
  subway: [
    { label: '1', value: '1' },
    { label: '2', value: '2' },
    { label: '3', value: '3' },
    { label: '4', value: '4' },
    { label: '5', value: '5' },
    { label: '6', value: '6' },
    { label: '7', value: '7' },
    { label: 'A', value: 'A' },
    { label: 'C', value: 'C' },
    { label: 'E', value: 'E' },
    { label: 'B', value: 'B' },
    { label: 'D', value: 'D' },
    { label: 'F', value: 'F' },
    { label: 'M', value: 'M' },
    { label: 'G', value: 'G' },
    { label: 'L', value: 'L' },
    { label: 'J', value: 'J' },
    { label: 'Z', value: 'Z' },
    { label: 'N', value: 'N' },
    { label: 'Q', value: 'Q' },
    { label: 'R', value: 'R' },
    { label: 'W', value: 'W' },
  ],
  category: [
    { label: '단기 렌트', value: '단기 렌트' },
    { label: '중기 렌트', value: '중기 렌트' },
    { label: '장기 렌트', value: '장기 렌트' },
  ],
  review: [
    { label: '1점 이상', value: '1' },
    { label: '2점 이상', value: '2' },
    { label: '3점 이상', value: '3' },
    { label: '4점 이상', value: '4' },
  ],
  broker: [
    { label: '중개비 있음', value: '중개비 있음' },
    { label: '중개비 없음', value: '중개비 없음' },
  ],
};
