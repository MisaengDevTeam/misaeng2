'use client';

interface ReviewCategoryBoxProps {
  title: string;
  catRate: number;
  onChangeRate: (value: string) => void;
  onChangeText: (value: string) => void;
}

const ReviewCategoryBox: React.FC<ReviewCategoryBoxProps> = ({
  title,
  catRate,
  onChangeRate,
  onChangeText,
}) => {
  return (
    <div className='flex flex-col w-full max-w-[1280px]'>
      <div className='flex flex-row gap-2 my-2'>
        <div className='w-1/6 max-w-[60px] text-center'>{title}</div>
        <div className='w-1/6 max-w-[60px] text-center'>{catRate}</div>
        <input
          onChange={(e) => {
            onChangeRate(e.currentTarget.value);
          }}
          type='range'
          min={'0'}
          max={'5'}
          step={'0.5'}
          value={catRate}
          className='w-4/6 sm:w-[84%] my-2 h-1 bg-neutral-200 rounded-full appearance-none cursor-pointer accent-[#EC662A]'
        />
      </div>
      <textarea
        placeholder='회원님께서 현재 거주하시거나 과거에 거주하셨던 장소에 대해 리뷰를 남겨주세요'
        maxLength={360}
        onChange={(e) => {
          onChangeText(e.currentTarget.value);
        }}
        className='p-2 text-sm rounded-xl border border-[#EC662A] resize-none h-[10vh]'
      />
    </div>
  );
};
export default ReviewCategoryBox;
