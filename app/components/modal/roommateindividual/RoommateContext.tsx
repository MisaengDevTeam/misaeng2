'use client';

import { roommateContext, MBTI_TYPE } from '@/types/RoommateTypes';
import { CgSmile } from 'react-icons/cg';

interface RoommateContextProps {
  title: string;
  category: string;
  selfgender: string;
  selfstatus: string;
  selfage: string;
  selfmbti: string;
  selfpet: string;
  selfsmoke: string;
  rmgender: string;
  rmstatus: string;
  rmage: string;
  rmpet: string;
  rmsmoke: string;
}

const RoommateContext: React.FC<RoommateContextProps> = ({
  title,
  category,
  selfgender,
  selfstatus,
  selfage,
  selfmbti,
  selfpet,
  selfsmoke,
  rmgender,
  rmstatus,
  rmage,
  rmpet,
  rmsmoke,
}) => {
  return (
    <div className='flex flex-col gap-2'>
      <div className='font-semibold text-lg'>{title}</div>
      <div className='font-light whitespace-pre-wrap'>
        <p className='mb-1'>{`안녕하세요,`}</p>
        <p className='mb-1'>{`< ${
          MBTI_TYPE[selfmbti as keyof typeof MBTI_TYPE]
        } ${selfmbti} > 입니다!`}</p>
        <p className='mb-1'>{`  저는 현재 뉴욕에서 ${
          roommateContext.category[
            category as keyof typeof roommateContext.category
          ]
        } ${selfage}의 ${selfgender}입니다.`}</p>
        <p className='mb-1'>{`  직업에 대해서는 ${
          roommateContext.status[
            selfstatus as keyof typeof roommateContext.status
          ]
        }서로 존중할 수 있는 룸메이트가 되었으면 좋겠습니다!`}</p>
        <p className='mb-1'>{`  반려동물은 현재 ${
          roommateContext.pet[selfpet as keyof typeof roommateContext.pet]
        }, 룸메이트는 ${
          roommateContext.rmpet[rmpet as keyof typeof roommateContext.rmpet]
        }`}</p>
        <p className='mb-1'>{`  흡연여부는 ${
          roommateContext.smoke[selfsmoke as keyof typeof roommateContext.smoke]
        }, 룸메이트의 흡연여부는 ${
          roommateContext.rmsmoke[
            rmsmoke as keyof typeof roommateContext.rmsmoke
          ]
        }`}</p>
        <p className='mb-1'>{`  뉴욕에서 같이 즐겁게 생활하실 룸메이트 찾았으면 좋겠습니다.`}</p>
        <p className='mb-1 flex items-center'>
          {`감사합니다 `}
          <CgSmile />
        </p>
      </div>
    </div>
  );
};
export default RoommateContext;
