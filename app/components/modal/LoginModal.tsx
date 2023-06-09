'use client';

import { signIn } from 'next-auth/react';
import { MouseEvent, useRef, useState } from 'react';
import Modal from './Modal';
import useLoginModal from '../hooks/useLoginModal';
import { useRouter } from 'next/navigation';
import Button from '../Button';
import { FcGoogle } from 'react-icons/fc';
import { RiKakaoTalkFill } from 'react-icons/ri';
import { SiNaver } from 'react-icons/si';
import Input from '../inputs/Input';
import {
  RegisterOptions,
  FieldValues,
  UseFormRegisterReturn,
  useForm,
  SubmitHandler,
} from 'react-hook-form';
import LoadingSpinner from '../LoadingSpinner';
import Image from 'next/image';
import LoadingScreen from '../LoadingScreen';

interface LoginModalProps {}

const LoginModal: React.FC<LoginModalProps> = ({}) => {
  const router = useRouter();
  const loginModal = useLoginModal();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      email: '',
    },
  });

  const email = watch('email');

  const onEmailLoginSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);
    const email = data.email;
    signIn('email', { email, callbackUrl: 'http://localhost:3000' });
    setIsLoading(false);
  };

  // const bodyContent = (
  // <div
  //   // onSubmit={handleSubmit(onEmailLoginSubmit)}
  //   className='flex flex-col gap-4 mb-4'
  // >
  //   <Input
  //     id={'email'}
  //     label={'Email'}
  //     register={register}
  //     errors={errors}
  //     onChange={(value) => {
  //       setValue('email', value.currentTarget.value);
  //     }}
  //     required
  //     disabled={isLoading}
  //   />
  //   <Button
  //     onClick={() => {
  //       signIn('email', { email, callbackUrl: 'http://localhost:3000' });
  //     }}
  //     type='submit'
  //     outline
  //     label={isLoading ? <LoadingSpinner /> : 'Login with your email'}
  //     disabled={isLoading}
  //   />
  // </div>
  // );

  const bodyContent = (
    <div className='flex flex-col gap-4'>
      <Button
        onClick={() => {
          setIsLoading(true);
          signIn('google');
        }}
        icon={FcGoogle}
        label={'Continue with Gooogle'}
        outline
        disabled={isLoading}
      />
      {/* <Button
        onClick={() => {
          setIsLoading(true);
          signIn('kakao', { callbackUrl: '/' });
        }}
        icon={RiKakaoTalkFill}
        label={'Continue with KakaoTalk'}
        outline
        disabled={isLoading}
      /> */}
      {/* <Button
        onClick={() => signIn('naver', { callbackUrl: '/' })}
        icon={SiNaver}
        iconSize={16}
        label={'Continue with Naver'}
        outline
      /> */}
    </div>
  );

  return (
    <Modal
      disabled={isLoading}
      isOpen={loginModal.isOpen}
      onClose={loginModal.onClose}
      title={'간편 로그인하기'}
      body={bodyContent}
      footer={''}
      loadingScreen={
        <LoadingScreen
          messagetitle='로그인 중 입니다.'
          messagesubtitle='잠시만 기다려주시기 바랍니다.'
        />
      }
    />
  );
};
export default LoginModal;
