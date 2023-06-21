'use client';

import Container from '@/app/components/Container';
import Heading from '@/app/components/Heading';
import { usePathname } from 'next/navigation';
import 'react-quill/dist/quill.snow.css';
import ReactQuill from 'react-quill';
import { useMemo, useState } from 'react';
import { resizeAdImage } from '@/app/lib/imageResizer';
import { useSession } from 'next-auth/react';
import axios from 'axios';
import SelectComp from '@/app/components/inputs/SelectComp';
import Input from '@/app/components/inputs/Input';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { BLOG_CATEGORY, CATEGORY_OPTION } from '@/types/BlogTypes';
import toast from 'react-hot-toast';

interface routeProps {}

const BlogRegister: React.FC<routeProps> = ({}) => {
  const [content, setContent] = useState('');
  const [imgSrc, setImgSrc] = useState<string[]>([]);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const { data: session } = useSession();
  const currentUser = session?.user;

  console.log(currentUser);

  const handleChange = (value: any) => {
    setContent(value);
  };

  const pathname = usePathname();
  const id = pathname?.split('/')[2];
  const password = pathname?.split('/')[3];

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      category: null,
      title: null,
      hot: null,
    },
  });

  const setCustomValue = (id: string, value: any) => {
    setValue(id, value, {
      shouldDirty: true,
      shouldTouch: true,
      shouldValidate: true,
    });
  };

  const imageHandler = async () => {
    const input = document.createElement('input');

    input.setAttribute('type', 'file');
    input.setAttribute('accept', 'image/*');
    input.click();

    input.onchange = async () => {
      if (input.files) {
        const file = input.files[0];
        const writeTime = new Date().toISOString();
        console.log(file);

        const reader = new FileReader();
        reader.readAsArrayBuffer(await resizeAdImage(file));
        let blobPic = new Blob();

        reader.onloadend = async () => {
          blobPic = new Blob([new Uint8Array(reader.result as ArrayBuffer)], {
            type: file.type,
          });

          const url = await axios.post(
            `/api/pic/blogImage/${currentUser?.id}/${writeTime}`
          );

          const response = await fetch(url.data.signedUrl, {
            method: 'PUT',
            headers: {
              'Content-Type': 'multipart/form-data',
            },
            body: blobPic,
          });

          const resultPicture = response.url.split('?')[0];
          setImgSrc((prev) => [...prev, resultPicture]);
          setContent(
            (prev) => prev + `<image src="${resultPicture}" alt="img"/>`
          );
        };
      }
    };
  };

  const modules = useMemo(
    () => ({
      toolbar: {
        container: [
          [{ header: [1, 2, 3, false] }],
          ['bold', 'italic', 'underline', 'strike'],
          [{ align: [] }],
          [{ list: 'ordered' }, { list: 'bullet' }],
          ['link', 'image'],
          ['clean'],
        ],
        handlers: {
          image: imageHandler,
        },
      },
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  const formats = [
    'header',
    'bold',
    'italic',
    'underline',
    'strike',
    'align',
    'list',
    'bullet',
    'link',
    'image',
  ];

  const subtitle = `썸네일은 업로드하는 첫번째 사진으로 자동 저장됨`;

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);
    axios
      .post(`/api/blogRegister`, {
        ...data,
        uid: currentUser?.id,
        content,
        thumbnail: imgSrc[0],
        author: currentUser?.nickname || currentUser?.name,
        authorPic: currentUser?.newImage?.[0] || currentUser?.image,
      })
      .then((response) => {
        toast.success('룸메이트 리스팅이 등록되었습니다!');
        console.log(response);
        // roommateRegisterModal.onClose();
        reset();
      })
      .catch((error) => {
        toast.error(`Something went wrong`);
        console.log(error);
      })
      .finally(() => {
        setIsLoading(false);
        location.reload();
      });
  };

  if (
    id == process.env.NEXT_PUBLIC_BLOGGER_ID &&
    password == process.env.NEXT_PUBLIC_BLOGGER_PW &&
    currentUser
  ) {
    return (
      <div className='w-full'>
        <Container>
          <div className='flex flex-col py-6 gap-6'>
            <Heading title={'블로그 작성'} subtitle={subtitle} />
            <div className='flex flex-col sm:flex-row gap-4'>
              <SelectComp
                small
                placeholder={'카테고리'}
                options={CATEGORY_OPTION}
                onChange={(value) => {
                  setCustomValue('category', value);
                }}
              />
              <SelectComp
                small
                placeholder={'이번달 핫토픽?'}
                options={[
                  { label: 'Yes', value: 'Yes' },
                  { label: 'No', value: 'No' },
                ]}
                onChange={(value) => {
                  setCustomValue('hot', value);
                }}
              />
              <div className='w-full sm:w-[70%]'>
                <Input
                  small
                  id={'title'}
                  label={'제목을 입력해주세요'}
                  length={60}
                  onChange={(e) => setCustomValue('title', e.target.value)}
                  register={register}
                  errors={errors}
                />
              </div>
            </div>
            <div>
              <ReactQuill
                value={content}
                onChange={handleChange}
                placeholder='Write something...'
                modules={modules}
                formats={formats}
              />
            </div>
            <div className='w-full flex flex-col sm:flex-row justify-center items-center gap-6'>
              {/* <button
                onClick={() => {
                  console.log('Register');
                }}
                className='py-2 px-4 bg-[#EC662A] text-[#FFF] rounded-xl w-full sm:w-[300px]'
              >
                블로그 글 확인하기
              </button> */}
              <button
                onClick={handleSubmit(onSubmit)}
                className='py-2 px-4 bg-[#EC662A] text-[#FFF] rounded-xl w-full sm:w-[300px]'
              >
                블로그 작성하기
              </button>
            </div>
          </div>
        </Container>
      </div>
    );
  }
  return null;
};
export default BlogRegister;
