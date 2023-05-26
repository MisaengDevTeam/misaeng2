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
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      email: '',
    },
  });

  const onEmailLoginSubmit: SubmitHandler<FieldValues> = (data) => {
    const email = data.email;
    signIn('email', { email, callbackUrl: 'http://localhost:3000/' });
  };

  const bodyContent = (
    <form
      onSubmit={handleSubmit(onEmailLoginSubmit)}
      className='flex flex-col gap-4'
    >
      <Input
        id={'email'}
        label={'Email'}
        register={register}
        errors={errors}
        required
      />
      <Button
        onClick={() => {
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
    </form>
  );

  const footerContent = (
    <div className='flex flex-col gap-4 mt-3'>
      <Button
        onClick={() => signIn('google')}
        icon={FcGoogle}
        label={'Continue with Gooogle'}
        outline
      />
      <Button
        onClick={() => {
          try {
            signIn('kakao', { callbackUrl: 'http://localhost:3000' });
          } catch (error) {
            console.log(error);
          }
        }}
        icon={RiKakaoTalkFill}
        label={'Continue with KakaoTalk'}
        outline
      />
      <Button
        onClick={() =>
          signIn('naver', { callbackUrl: 'http://localhost:3000/' })
        }
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
