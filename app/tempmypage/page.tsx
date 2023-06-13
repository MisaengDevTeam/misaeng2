'use client';

import { useSession } from 'next-auth/react';
import Container from '../components/Container';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Avatar from '../components/Avatar';
import MyPageInput from '../components/inputs/mypage/MyPageInput';
import {
  ChangeEvent,
  MouseEvent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import SelectComp from '../components/inputs/SelectComp';
import Button from '../components/Button';
import { STATUS_LIST, LOCATION_LIST } from '@/types/MyPageTypes';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import axios from 'axios';
import toast from 'react-hot-toast';
import LoadingScreen from '../components/LoadingScreen';
import { resizeProfileImage } from '../lib/imageResizer';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { DndProvider } from 'react-dnd';

interface pageProps {}

const MyPage: React.FC<pageProps> = ({}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState<string | undefined>(undefined);
  const [status, setStatus] = useState<string | null>(null);
  const [pictures, setPictures] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);

  const fileRef = useRef<HTMLInputElement | null>(null);

  const { data: session } = useSession();
  const currentUser = session?.user;

  const router = useRouter();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      uid: null,
      name: null,
      email: null,
      phone: null,
      nickname: null,
      kakaoId: null,
      status: null,
      newImage: null,
      jobLocation: null,
    },
  });

  const setCustomValue = useCallback(
    (id: string, value: any) => {
      setValue(id, value, {
        shouldDirty: true,
        shouldTouch: true,
        shouldValidate: true,
      });
    },
    [setValue]
  );

  const name = watch('name');
  const nickname = watch('nickname');
  const phone = watch('phone');
  const kakaoId = watch('kakaoId');
  const uStatus = watch('status');
  const jobLocation = watch('jobLocation');
  const newImage = watch('newImage');

  useEffect(() => {
    setEmail(currentUser?.email);
    setStatus(currentUser?.status as string);
    setCustomValue('nickname', currentUser?.nickname);
    setCustomValue('name', currentUser?.name);
    setCustomValue('phone', currentUser?.phone);
    setCustomValue('kakaoId', currentUser?.kakaoId);
    setCustomValue('status', currentUser?.status);
    setCustomValue('jobLocation', currentUser?.jobLocation);
    setCustomValue('newImage', currentUser?.newImage);
  }, [
    currentUser?.email,
    currentUser?.jobLocation,
    currentUser?.kakaoId,
    currentUser?.name,
    currentUser?.newImage,
    currentUser?.nickname,
    currentUser?.phone,
    currentUser?.status,
    setCustomValue,
  ]);

  const locationArray =
    LOCATION_LIST[status as keyof typeof LOCATION_LIST] || [];
  const locationOption = locationArray.map((item) => ({
    label: item,
    value: item,
  }));

  const handleFileChange = useCallback(
    async (event: ChangeEvent<HTMLInputElement>) => {
      if (event.target.files && event.target.files.length > 0) {
        setIsLoading(true);
        const file = event.target.files[0];
        setPictures([file]);

        const reader = new FileReader();
        const resizedFile = await resizeProfileImage(file);

        reader.onloadend = async () => {
          const preview = reader.result as string;
          setPreviews([preview]);
          setCustomValue('pictures', [preview]);

          // Fetch blob and upload
          const writeTime = new Date().toISOString();
          setCustomValue('writeTime', writeTime);

          const resPic = await fetch(preview);
          const blobPic = await resPic.blob();

          const url = await axios.post(
            `/api/pic/profileImage/${currentUser?.id}/${writeTime}`
          );

          const response = await fetch(url.data.signedUrl, {
            method: 'PUT',
            headers: {
              'Content-Type': 'multipart/form-data',
            },
            body: blobPic,
          });

          const resultPicture = response.url.split('?')[0];

          // update pictureURL
          setCustomValue('newImage', [resultPicture]);
          setIsLoading(false);
        };

        reader.readAsDataURL(resizedFile);
      } else {
        setPictures([]);
        setPreviews([]);
      }
    },
    [currentUser?.id, setCustomValue]
  );

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    setIsLoading(true);

    axios
      .post(`/api/userInfo/userInfo`, {
        ...data,
        uid: currentUser?.id,
        email: currentUser?.email,
      })
      .then((response) => {
        toast.success('정보가 변경되었습니다!');
        reset();
      })
      .catch((error) => {
        toast.error(`Something went wrong`);
        console.log(error);
      })
      .finally(() => {
        location.reload();
      });
  };

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <div className='w-full h-auto'>
      <Container>
        <div className='flex justify-start sm:justify-center w-full gap-8 p-5 pb-0 sm:pb-4 border-b border-neutral-200 overflow-x-auto whitespace-nowrap'>
          <div className='inline-flex'>개인 정보 관리</div>
          <div className='inline-flex'>렌트 목록 관리</div>
          <div className='inline-flex'>룸메 목록 관리</div>
          <div className='inline-flex'>사고팔기 목록 관리</div>
        </div>

        <div className='flex flex-col sm:flex-row justify-center w-full gap-4 py-4 sm:py-8'>
          <div className='flex flex-col justify-center items-center w-full sm:w-[340px] border-2 border-neutral-100 shadow-lg rounded-xl p-4 gap-6'>
            <div className='flex flex-col justify-center items-center w-full mt-4'>
              {previews.length != 0 ? (
                <DndProvider backend={HTML5Backend}>
                  <Avatar imgsrc={previews[0]} mypage />
                </DndProvider>
              ) : (
                <Avatar
                  imgsrc={
                    currentUser?.newImage
                      ? currentUser?.newImage[0]
                      : currentUser?.image
                  }
                  mypage
                />
              )}
            </div>
            {previews.length == 0 ? (
              <>
                <label
                  htmlFor='profilePic'
                  className='bg-orange-500 w-[50%] sm:w-[75%] text-center py-2 rounded-lg text-lg sm:text-base text-[#fff] font-semibold cursor-pointer hover:opacity-80'
                >
                  사진 변경
                </label>
                <input
                  ref={fileRef}
                  id='profilePic'
                  type='file'
                  accept='image/*'
                  hidden
                  onChange={handleFileChange}
                />
              </>
            ) : (
              <div className='font-semibold p-2 border-2 border-red-500 rounded-xl'>
                {`사진 변경을 위해 우측 또는 하단의 '회원 정보 수정' 버튼을 반드시 눌러주세요`}
              </div>
            )}
            <div className='flex flex-col gap-2 px-4'>
              <div
                className={`${
                  currentUser?.emailVerified
                    ? 'text-[#EC662A]'
                    : 'text-neutral-600'
                }`}
              >
                {currentUser?.emailVerified
                  ? '* 이메일 본인인증 완료'
                  : '* 이메일 본인인증 필요'}
              </div>

              <div className='text-neutral-500 font-light'>
                ** 회원님의 이미지는 본인을 나타낼 수 있는 가장 큰 요소입니다.
                타인에게 불쾌감을 줄 수 있는 사진은 저희 미생팀에서 삭제할 수
                있습니다.
              </div>
            </div>
          </div>
          <div className='flex flex-col sm:flex-row w-full max-w-[860px] border-2 border-neutral-100 shadow-lg rounded-xl p-4 sm:p-8 gap-6 sm:gap-8'>
            <div className='flex flex-col gap-6 w-full'>
              <MyPageInput
                label='이름'
                value={name ? name : ''}
                placeholder='이름'
                length={20}
                onChange={(value) => {
                  setCustomValue('name', value);
                }}
              />
              <MyPageInput
                label='이메일'
                value={currentUser?.email || ''}
                onChange={() => {}}
                disabled={currentUser?.email ? true : false}
              />
              <MyPageInput
                label='연락처'
                type='number'
                placeholder='전화번호'
                value={phone ? phone : ''}
                length={10}
                onChange={(value) => {
                  setCustomValue('phone', value);
                }}
              />
              <div>
                <MyPageInput
                  label='닉네임'
                  length={20}
                  value={nickname ? nickname : ''}
                  onChange={(value) => {
                    setCustomValue('nickname', value);
                  }}
                />
                <div className='text-neutral-500 font-light text-sm'>
                  ** 닉네임 설정시 작성자에 이름대신 닉네임이 표시됩니다.
                </div>
              </div>
            </div>
            <div className='flex flex-col w-full gap-6'>
              <MyPageInput
                label='카톡 아이디'
                value={kakaoId ? kakaoId : ''}
                length={32}
                onChange={(value) => {
                  setCustomValue('kakaoId', value);
                }}
              />
              <div className='flex flex-col gap-2'>
                <div>직업</div>
                <SelectComp
                  placeholder={'학생 / 직장인 / 비공개'}
                  defaultValue={uStatus}
                  options={STATUS_LIST}
                  onChange={(value) => {
                    setStatus(value);
                    setCustomValue('status', value);
                  }}
                  small
                />
              </div>
              <div className='flex flex-col gap-2'>
                <div>학교 및 직장 위치</div>
                <SelectComp
                  placeholder={'학교 및 직장 위치'}
                  defaultValue={jobLocation}
                  options={
                    status
                      ? locationOption!
                      : [{ label: '직업을 먼저 선택해주세요', value: null }]
                  }
                  onChange={(value) => {
                    setCustomValue('jobLocation', value);
                  }}
                  isSearchable
                  small
                />
              </div>
              <div className='mt-6'>
                <Button
                  disabled={isLoading}
                  onClick={handleSubmit(onSubmit)}
                  label='회원 정보 수정'
                />
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};
export default MyPage;
