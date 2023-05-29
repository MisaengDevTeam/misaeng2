export const ROOMMATE_TYPE = [
  {
    roommateCategory: '룸메 찾아요',
    roommateCategoryDescription:
      '계약하신 방이 이미 있으신 분께서 빈 방에 입주하실 룸메이트를 찾응 카테고리입니다.',
    icon: 'SlPeople',
  },
  {
    roommateCategory: '방 찾아요',
    roommateCategoryDescription:
      '계약하신 방이 없으시거나 분께서 빈 방에 입주하실 룸메이트를 찾응 카테고리입니다.',
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
  성별: ['남자', '여자'],
  연령대: [
    '19-23세',
    '24-28세',
    '29-33세',
    '34-38세',
    '39-43세',
    '44-49세',
    '50세 이상',
  ],
  학생: ['학생', '직장인', '비공개'],
  반려동물: ['강아지', '고양이', '그 외', '없음'],
  흡연여부: ['흡연', '비흡연'],
  MBTI: [
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
  성별: ['남자', '여자', '성별무관'],
  연령대: [
    '19-23세',
    '24-28세',
    '29-33세',
    '34-38세',
    '39-43세',
    '44-49세',
    '50세 이상',
    '연령무관',
  ],
  학생: ['학생', '직장인', '학생무관'],
  반려동물: ['강아지', '고양이', '그 외', '반려동무관'],
  흡연여부: ['흡연', '비흡연', '흡연무관'],
};
