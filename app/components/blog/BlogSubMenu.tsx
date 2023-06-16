'use client';

import Image from 'next/image';
import BlogSubMenuItem from './BlogSubMenuItem';
import BlogSubMenuAd from './BlogSubMenuAd';
import { IoNewspaperOutline } from 'react-icons/io5';
import { MdOutlineLocalPolice } from 'react-icons/md';
import { GiPoliceOfficerHead } from 'react-icons/gi';
import { BsCameraReels } from 'react-icons/bs';
import { GrAnnounce, GrMicrophone } from 'react-icons/gr';
import { BiVideoRecording } from 'react-icons/bi';

interface BlogSubMenuProps {}

const BlogSubMenu: React.FC<BlogSubMenuProps> = ({}) => (
  <div className='flex flex-col gap-4'>
    <BlogSubMenuAd />
    <BlogSubMenuAd />
    <BlogSubMenuItem
      firstline={'정직한 리뷰를 위한'}
      secondline={'협찬 및 광고 가이드 안내'}
      icon={() => <IoNewspaperOutline size={36} />}
    />
    {/* <BlogSubMenuItem
      firstline={'为保证最佳网络社区环境'}
      secondline={'可在此处举报'}
      icon={() => <MdOutlineLocalPolice size={36} />}
    /> */}
    <BlogSubMenuItem
      firstline={'더 깨끗한 블로그를 위한'}
      secondline={'악성 유저 신고 센터'}
      icon={() => <MdOutlineLocalPolice size={36} />}
    />
    {/* <BlogSubMenuItem
      firstline={'米生服务指南'}
      secondline={'与注意事项'}
      icon={() => <GrMicrophone size={36} />}
    /> */}
    <BlogSubMenuItem
      firstline={'미생 서비스에 관한'}
      secondline={'안내사항 및 주의 사항'}
      icon={() => <GrAnnounce size={36} />}
    />
    <BlogSubMenuItem
      firstline={'최신 공지사항'}
      secondline={'[안내] 사용자 정책 변경으로 인한..'}
    />
    {/* <BlogSubMenuItem
      firstline={'APP最新通知'}
      secondline={'[안내] 사용자 정책 변경으로 인한..'}
    /> */}
  </div>
);
export default BlogSubMenu;
