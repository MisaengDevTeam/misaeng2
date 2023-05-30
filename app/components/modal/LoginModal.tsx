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

  const bodyContent = (
    <div
      // onSubmit={handleSubmit(onEmailLoginSubmit)}
      className='flex flex-col gap-4'
    >
      <Input
        id={'email'}
        label={'Email'}
        register={register}
        errors={errors}
        onChange={(value) => {
          setValue('email', value.currentTarget.value);
        }}
        required
      />
      <Button
        onClick={() => {
          signIn('email', { email, callbackUrl: 'http://localhost:3000' });
          // setIsLoading(true);
          // setTimeout(() => {
          //   setIsLoading(false);
          // }, 2000);
        }}
        type='submit'
        outline
        label={isLoading ? <LoadingSpinner /> : 'Login with your email'}
        disabled={isLoading}
      />
    </div>
  );

  const footerContent = (
    <div className='flex flex-col gap-4 mt-3'>
      <Button
        onClick={() =>
          signIn('google', {
            callbackUrl: 'https://misaengusa.com/api/auth/callback/google',
          })
        }
        icon={FcGoogle}
        label={'Continue with Gooogle'}
        outline
      />
      <Button
        onClick={() => {
          signIn('kakao');
        }}
        icon={RiKakaoTalkFill}
        label={'Continue with KakaoTalk'}
        outline
      />
      <Button
        onClick={() => signIn('naver')}
        icon={SiNaver}
        iconSize={16}
        label={'Continue with Naver'}
        outline
      />
    </div>
  );
  return (
    <Modal
      disabled={isLoading}
      isOpen={loginModal.isOpen}
      onClose={loginModal.onClose}
      title={'간편 로그인하기'}
      body={bodyContent}
      footer={footerContent}
      separator
    />
  );
};
export default LoginModal;
