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
  const [listings, setListings] = useState();

  const fetchBlogListing = async (query: IFecthBlogQuery) => {
    axios
      .post(`/api/blogListing/blogListing`, query)
      .then((res) => setListings(res.data))
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    fetchBlogListing({ start: 0, number: 5, category: null });
  }, []);

  return (
    <div>
      <BlogSubNav />
      <BlogBody
        listings={listings}
        setListings={setListings}
        fetchBlogListing={fetchBlogListing}
      />
    </div>
  );
};
export default BlogPage;
