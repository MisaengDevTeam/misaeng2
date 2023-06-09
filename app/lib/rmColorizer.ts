export const categoryColorizer = (category: string) => {
  switch (category) {
    case '방 찾아요':
      return ' bg-[#192D5F] ';
    case '룸메 찾아요':
      return ' bg-[#669681] ';
    case '같이 방 찾아요':
      return ' bg-[#EC662A] ';

    default:
      return '';
  }
};

export const genderColorizer = (gender: string) => {
  switch (gender) {
    case '남자':
      return ' bg-[#7078F7] ';
    case '여자':
      return ' bg-[#ED7268] ';
    default:
      return '';
  }
};

export const ageColorizer = () => {};

export const statusColorizer = (status: string) => {
  switch (status) {
    case '학생':
      return ' bg-[#57BD50] ';
    case '직장인':
      return ' bg-[#3F3F3F] ';
    case '비공개':
      return ' bg-[#CCCCCC] ';
    default:
      return '';
  }
};

export const Colorizer = () => {};
