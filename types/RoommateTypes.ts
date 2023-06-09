// export const ROOMMATE_TYPE = [
//   {
//     roommateCategory: '拼室友',
//     roommateCategoryDescription: '米生算法为你匹配最佳室友！',
//     icon: 'SlPencil',
//   },
//   {
//     roommateCategory: '个人转租',
//     roommateCategoryDescription: '',
//     icon: 'SlPeople',
//   },
//   {
//     roommateCategory: '寻找转租',
//     roommateCategoryDescription: '',
//     icon: 'BsHouseUp',
//   },
// ];

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
    { value: 'Etc', label: 'Etc' },
  ],
  Bronx: [
    { value: 'Morrisania', label: 'Morrisania' },
    { value: 'Hunts Point', label: 'Hunts Point' },
    { value: 'Parkchester', label: 'Parkchester' },
    { value: 'West Bronx', label: 'West Bronx' },
    { value: 'Morris Park', label: 'Morris Park' },
    { value: 'East Bronx', label: 'East Bronx' },
    { value: 'Etc', label: 'Etc' },
  ],
  StatenIsland: [{ value: 'Staten Island', label: 'Staten Island' }],
};

export const ROOMMATE_ROOM_INFO = {
  roomtypeArr: ['화장실 있는 방', '화장실 없는 방'],
  lengthArr: ['단기 (주 단위)', '중기 (월 단위)', '장기 (연 단위)'],
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

export const SEARCH_TYPES = {
  CATEGORY: [
    { label: '전체 검색', value: null },
    { label: '룸메 찾아요', value: '룸메 찾아요' },
    { label: '방 찾아요', value: '방 찾아요' },
    { label: '같이 방 찾아요', value: '같이 방 찾아요' },
  ],

  GENDER: [
    { label: '전체 검색', value: null },
    { label: '남자', value: '남자' },
    { label: '여자', value: '여자' },
  ],
  STATUS: [
    { label: '전체 검색', value: null },
    { label: '학생', value: '학생' },
    { label: '직장인', value: '직장인' },
    { label: '비공개', value: '비공개' },
  ],
  ROOMTYPE: [
    { label: '전체 검색', value: null },
    { label: 'MasterBedroom', value: 'MasterBedroom' },
    { label: 'Second', value: 'Second' },
    { label: 'Flexed', value: 'Flexed' },
    { label: 'Other', value: 'Other' },
  ],
  LENGTH: [
    { label: '전체 검색', value: null },
    { label: '단기 (주 단위)', value: 'short' },
    { label: '중기 (월 단위)', value: 'mid' },
    { label: '장기 (연 단위)', value: 'long' },
  ],
  AGE: [
    { label: '전체 검색', value: null },
    { label: '19-23세', value: '19-23세' },
    { label: '24-28세', value: '24-28세' },
    { label: '29-33세', value: '29-33세' },
    { label: '34-38세', value: '34-38세' },
    { label: '39-43세', value: '39-43세' },
    { label: '44-49세', value: '44-49세' },
    { label: '50세이상', value: '50세이상' },
  ],
  PET: [
    { label: '전체 검색', value: null },
    { label: '강아지', value: '강아지' },
    { label: '고양이', value: '고양이' },
    { label: '그 외', value: '그 외' },
    { label: '없음', value: '없음' },
  ],
  SMOKE: [
    { label: '전체 검색', value: null },
    { label: '흡연', value: '흡연' },
    { label: '비흡연', value: '비흡연' },
  ],
  MBTI: [
    { label: '전체 검색', value: null },
    { label: 'ENTP', value: 'ENTP' },
    { label: 'ESTP', value: 'ESTP' },
    { label: 'ESFP', value: 'ESFP' },
    { label: 'ENFP', value: 'ENFP' },
    { label: 'INTP', value: 'INTP' },
    { label: 'ISTP', value: 'ISTP' },
    { label: 'ISFP', value: 'ISFP' },
    { label: 'INFP', value: 'INFP' },
    { label: 'ESFJ', value: 'ESFJ' },
    { label: 'ENFJ', value: 'ENFJ' },
    { label: 'ENTJ', value: 'ENTJ' },
    { label: 'ESTJ', value: 'ESTJ' },
    { label: 'ISFJ', value: 'ISFJ' },
    { label: 'INFJ', value: 'INFJ' },
    { label: 'INTJ', value: 'INTJ' },
    { label: 'ISTJ', value: 'ISTJ' },
  ],
  CITY: [
    { label: '', value: '' },
    { label: '', value: '' },
    { label: '', value: '' },
  ],
  NEIGHBORHOOD: [
    { label: '', value: '' },
    { label: '', value: '' },
    { label: '', value: '' },
  ],
};

export const MBTI_TYPE = {
  ENTP: '뜨거운 논쟁을 즐기는 변론가',
  ESTP: '모험을 즐기는 사업가',
  ESFP: '자유로운 영혼의 연예인',
  ENFP: '재기발랄한 활동가',
  INTP: '논리적인 사색가',
  ISTP: '만능재주꾼',
  ISFP: '호기심 많은 예술가',
  INFP: '열정적인 중재자',
  ESFJ: '사교적 외교관',
  ENFJ: '정의로운 사회운동가',
  ENTJ: '대담한 통솔자',
  ESTJ: '엄격한 관리자',
  ISFJ: '용감한 수호자',
  INFJ: '선의의 옹호자',
  INTJ: '용의주도한 전략가',
  ISTJ: '청렴결백한 논리주의자',
};

export const roommateContext = {
  category: {
    '방 찾아요': '입주할 수 있는 방을 찾고 있는',
    '룸메 찾아요': '같이 살 룸메이트를 찾고 있는',
    '같이 방 찾아요': '룸메이트도 찾고 같이 입주할 방도 찾고 있는',
  },
  status: {
    학생: '앞으로 공부하는 학생으로 지낼 예정이며, ',
    직장인: '앞으로 직장인으로 일하게 될 예정이며, ',
    비공개: '직업은 자세히 알려드리기는 조금 어렵습니다만, ',
  },
  pet: {
    '강아지': '너무나 사랑스러운 강아지가 있고',
    '고양이': '너무나 사랑스러운 고양이가 있고',
    '그 외': '강아지나 고양이와는 다른 동물을 키우고 있고',
    '없음': '없지만',
  },
  rmpet: {
    '강아지': '강아지가 있으신 분이었으면 좋겠습니다!',
    '고양이': '고양이가 있으신 분이었으면 좋겠습니다!',
    '그 외': '강아지와 고양이를 제외하면 다른 동물은 괜찮습니다!',
    '반려동물무관': '반려동물이 있으셔도 없으셔도 무관합니다!',
  },
  smoke: {
    흡연: '실외에서만 흡연하며',
    비흡연: '비흡연으로 전혀 흡연 하지 않으며',
  },
  rmsmoke: {
    흡연: '무관하지만 실외에서만 부탁드리겠습니다.',
    비흡연: '흡연은 하지 않으시는 분이었으면 좋겠습니다.',
    흡연무관: '크게 신경쓰지 않습니다.',
  },
};
