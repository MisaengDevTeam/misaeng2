'use client';

interface pageProps {}

const UseOfTermsPage = ({}) => {
  return (
    <div className='flex justify-center w-full'>
      <div className='w-full md:w-[70%] max-w-[1440px] py-8'>
        <div className='flex w-full justify-center mb-8'>
          <h1 className='text-xl font-bold'>MisaengUSA 이용 약관</h1>
        </div>
        <div className='flex flex-col items-start justify-center gap-4'>
          <p>
            1. Misaeng USA (https://misaengusa.com) 웹사이트 (이하 미생)의 모든
            컨텐츠 및 데이터는 Simon Lee, Robin Lee에 의해 제작되었습니다.
          </p>
          <p>2. 무단 도용 및 배포는 법적 처벌을 받을 수 있습니다.</p>
          <p>
            3. 자료 및 데이터의 사용 또는 각종 문의는 info@misaengusa.com 로
            보내주시기 바랍니다.
          </p>
        </div>
      </div>
    </div>
  );
};
export default UseOfTermsPage;
