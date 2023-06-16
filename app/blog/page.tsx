'use client';

import { useEffect, useState } from 'react';
import EmptyState from '../components/EmptyState';
import BlogBody from '../components/blog/BlogBody';
import BlogSubNav from '../components/blog/BlogSubNav';
import axios from 'axios';

export interface IFecthBlogQuery {
  start: number;
  number: number;
  category: string | null;
}

const BlogPage = ({}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [listings, setListings] = useState();

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
      <BlogSubNav />
      <BlogBody
        isLoading={isLoading}
        listings={listings}
        setListings={setListings}
        fetchBlogListing={fetchBlogListing}
      />
    </div>
  );
};
export default BlogPage;
