import { MBTI_TYPE, roommateContext } from '@/types/RoommateTypes';

export default function introductionGenerator(
  category: string,
  selfgender: string,
  selfstatus: string,
  selfage: string,
  selfmbti: string,
  selfpet: string,
  selfsmoke: string,
  rmpet: string,
  rmsmoke: string
): string {
  return `안녕하세요,

< ${MBTI_TYPE[selfmbti as keyof typeof MBTI_TYPE]} ${selfmbti} > 입니다!

  저는 현재 뉴욕에서 룸메이트를 찾고 있는 ${selfage}의 ${selfgender}입니다.

  ${
    roommateContext.status[selfstatus as keyof typeof roommateContext.status]
  } 서로 존중할 수 있는 룸메이트가 되었으면 좋겠습니다!

  반려동물은 현재 ${
    roommateContext.pet[selfpet as keyof typeof roommateContext.pet]
  }, 룸메이트는 ${
    roommateContext.rmpet[rmpet as keyof typeof roommateContext.rmpet]
  }

  흡연여부는 ${
    roommateContext.smoke[selfsmoke as keyof typeof roommateContext.smoke]
  }, 룸메이트의 흡연여부는 ${
    roommateContext.rmsmoke[rmsmoke as keyof typeof roommateContext.rmsmoke]
  }

  뉴욕에서 같이 즐겁게 생활하실 룸메이트 찾았으면 좋겠습니다.

  감사합니다!`;
}
