'use client';

import { useEffect, useRef, useState } from 'react';
import EmptyState from '../components/EmptyState';
import BlogBody from '../components/blog/BlogBody';
import BlogSubNav from '../components/blog/BlogSubNav';
import axios from 'axios';
import BlogIndividualModal from '../components/modal/BlogIndividualModal';
import useBlogIndividualModal from '../components/hooks/useBlogIndividualModal';
import { useSearchParams } from 'next/navigation';
import LoadingScreen from '../components/LoadingScreen';

export interface IFecthBlogQuery {
  start: number;
  number: number;
  category: string | null;
}

const BlogPage = ({}) => {
  const hasModalOpened = useRef(false);

  const [isLoading, setIsLoading] = useState(false);
  const [listings, setListings] = useState();

  const blogIndividualModal = useBlogIndividualModal();

  const params = useSearchParams();
  const bloglistingid = params?.get('bloglisting');

  useEffect(() => {
    if (
      !hasModalOpened.current &&
      bloglistingid &&
      blogIndividualModal.onOpen
    ) {
      blogIndividualModal.onOpen();
      hasModalOpened.current = true;
    }
  }, [blogIndividualModal, blogIndividualModal.onOpen, bloglistingid]);

  const fetchBlogListing = async (query: IFecthBlogQuery) => {
    setIsLoading(true);
    axios
      .post(`/api/blogListing/blogListing`, query)
      .then((res) => setListings(res.data))
      .catch((error) => console.log(error))
      .finally(() => {
        setIsLoading(false);
      });
  };

  useEffect(() => {
    fetchBlogListing({ start: 0, number: 5, category: null });
  }, []);

  return (
    <div>
      <BlogIndividualModal />
      <BlogSubNav />
      <BlogBody
        BlogIndividualOpen={blogIndividualModal.onOpen}
        isLoading={isLoading}
        listings={listings}
        setListings={setListings}
        fetchBlogListing={fetchBlogListing}
      />
    </div>
  );
};
export default BlogPage;
