import React from "react"
import Head from 'next/head'
import { PostCard, PostWidget, Categories } from '../components';
import { getPosts } from "../services"
import { FeaturedPosts } from '../sections/index';

export default function Home({ posts }) {
  
  return (
    <div className='container mx-auto px-10 mb-8'>
      <Head>
        <title>CMS Blog App</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <FeaturedPosts />
      <div className='grid grid-cols-1 lg:grid-cols-12 gap-8'>
        {/* <div className='xl:col-span-3 col-span-1 xl:block lg:hidden sm:hidden md:hidden xs:hidden '>
          <div className='xl:sticky relative top-8 xl:block md:hidden'>
            <DisplayNews />
          </div>
        </div> */}

        <div className='lg:col-span-8 col-span-1'>
          {posts.map((post, index) => (
            <PostCard post={post.node} key={index} />
          ))}
        </div>

        <div className='lg:col-span-4 col-span-1'>
          <div className='lg:sticky relative top-8'>
            <PostWidget />
            <Categories />
          </div>
        </div>
      </div>
    </div>
  );
}

export async function getStaticProps() {
  const posts = (await getPosts()) || [];

  return {
    props: { posts },
  };
}
