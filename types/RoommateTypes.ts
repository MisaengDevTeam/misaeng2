export const ROOMMATE_TYPE = [
  {
    roommateCategory: '룸메 찾아요',
    roommateCategoryDescription:
      '계약하신 방이 이미 있으신 분께서 빈 방에 입주할 룸메이트를 찾는 카테고리입니다.',
    icon: 'SlPeople',
  },
  {
    roommateCategory: '방 찾아요',
    roommateCategoryDescription:
      '빈 방에 입주를 원하시는 분들을 위한 카테고리입니다.',
    icon: 'BsHouseUp',
  },
  {
    roommateCategory: '같이 방 찾아요',
    roommateCategoryDescription:
      '앞으로 방을 계약하실 계획이 있지만, 같이 입주하실 룸메를 구하고 계신 분들을 위한 카테고리입니다.',
    icon: 'SlPencil',
  },
];

export const ROOMMATE_SELF_PRE = {
  본인성별: ['남자', '여자'],
  본인연령대: [
    '19-23세',
    '24-28세',
    '29-33세',
    '34-38세',
    '39-43세',
    '44-49세',
    '50세 이상',
  ],
  본인학생: ['학생', '직장인', '비공개'],
  본인반려동물: ['강아지', '고양이', '그 외', '없음'],
  본인흡연여부: ['흡연', '비흡연'],
  본인MBTI: [
    'ENTP',
    'ESTP',
    'ESFP',
    'ENFP',
    'INTP',
    'ISTP',
    'ISFP',
    'INFP',
    'ESFJ',
    'ENFJ',
    'ENTJ',
    'ESTJ',
    'ISFJ',
    'INFJ',
    'INTJ',
    'ISTJ',
  ],
};

export const ROOMMATE_ROOMMATE_PRE = {
  상대성별: ['남자', '여자', '성별무관'],
  상대연령대: [
    '19-23세',
    '24-28세',
    '29-33세',
    '34-38세',
    '39-43세',
    '44-49세',
    '50세 이상',
    '연령무관',
  ],
  상대학생: ['학생', '직장인', '학생무관'],
  상대반려동물: ['강아지', '고양이', '그 외', '반려동물무관'],
  상대흡연여부: ['흡연', '비흡연', '흡연무관'],
};

export const ROOMMATE_MAP = {
  Manhattan: [
    { value: 'Downtown', label: 'Downtown' },
    { value: 'West Village', label: 'West Village' },
    { value: 'SoHo', label: 'SoHo' },
    { value: 'East Village', label: 'East Village' },
    { value: 'Midtown West', label: 'Midtown West' },
    { value: 'Midtown Center', label: 'Midtown Center' },
    { value: 'Midtown East', label: 'Midtown East' },
    { value: 'Upper West Side', label: 'Upper West Side' },
    { value: 'Upper East Side', label: 'Upper East Side' },
    { value: 'Upper Manhattan', label: 'Upper Manhattan' },
    { value: 'Roosevelt Island', label: 'Roosevelt Island' },
    { value: 'Etc', label: 'Etc' },
  ],
  Queens: [
    { value: 'Long Island City', label: 'Long Island City' },
    { value: 'Astoria', label: 'Astoria' },
    { value: 'Jackson Heights', label: 'Jackson Heights' },
    { value: 'Elmhurst', label: 'Elmhurst' },
    { value: 'Flushing', label: 'Flushing' },
    { value: 'Bayside', label: 'Bayside' },
    { value: 'Great Neck', label: 'Great Neck' },
    { value: 'Little Neck', label: 'Little Neck' },
    { value: 'Etc', label: 'Etc' },
  ],
  Brooklyn: [
    { value: 'Williamsburg', label: 'Williamsburg' },
    { value: 'Bedford-stuyvesant', label: 'Bedford-stuyvesant' },
    { value: 'Downtown Brooklyn', label: 'Downtown Brooklyn' },
    { value: 'Prospect Heights', label: 'Prospect Heights' },
    { value: 'Etc', label: 'Etc' },
  ],
  NewJersey: [
    { value: 'Englewood', label: 'Englewood' },
    { value: 'Fort Lee', label: 'Fort Lee' },
    { value: 'Edgewater', label: 'Edgewater' },
    { value: 'Palisades Park', label: 'Palisades Park' },
    { value: 'West New York', label: 'West New York' },
    { value: 'Weehawken', label: 'Weehawken' },
    { value: 'Hoboken', label: 'Hoboken' },
    { value: 'Jersey City', label: 'Jersey City' },
  ],
  Bronx: [
    { value: 'Morrisania', label: 'Morrisania' },
    { value: 'Hunts Point', label: 'Hunts Point' },
    { value: 'Parkchester', label: 'Parkchester' },
    { value: 'West Bronx', label: 'West Bronx' },
    { value: 'Morris Park', label: 'Morris Park' },
    { value: 'East Bronx', label: 'East Bronx' },
  ],
  StatenIsland: [{ value: 'Staten Island', label: 'Staten Island' }],
};

export const ROOMMATE_ROOM_INFO = {
  roomtypeArr: ['MasterBedroom', 'Second', 'Flexed', 'Other'],
  lengthArr: ['단기 (주 단위)', '중기 (월 단위)', '장기 (연 단위)'],
  utilityArr: ['유틸리티 포함', '유틸리티 별도'],
  amenityArr: [
    '24h도어맨',
    '헬스장',
    '엘리베이터',
    '로비',
    '주차장',
    '루프탑',
    '세탁실',
    '실내농구장',
    '스크린골프',
    '공용주방',
    '수영장',
    '요가룸',
    '와이파이',
    'BBQ그릴',
  ],
  featureArr: [
    '전자레인지',
    '에어컨',
    '히터',
    '세탁기',
    '건조기',
    '식기세척기',
    '욕조',
    '발코니',
  ],
};
