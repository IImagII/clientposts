import React from 'react'
import { AiFillEye, AiOutlineMessage } from 'react-icons/ai'
import Moment from 'react-moment'
import { Link } from 'react-router-dom'

export const PostItem = ({ post }) => {
   //проверка чтобы не было ошибки на undefine
   if (!post) {
      return (
         <div className='text-xs text-center text-white py-10'>
            Загрузка....
         </div>
      )
   }

   return (
      <Link to={`/${post._id}`}>
         <div className='flex flex-col basis-1/4 flex-grow'>
            <div
               className={
                  post.imgUrl ? 'flex rounded-sm h-80' : 'flex rounded-sm'
               }
            >
               {post.imgUrl && (
                  <img
                     src={`https://server-posts-full-stack-production.up.railway.app/${post.imgUrl}`}
                     alt='img'
                     className='object-cover  w-full'
                  />
               )}
            </div>
            <div className='flex justify-between items-center pt-2'>
               <div className='text-xs text-white opacity-50'>
                  {post.username}
               </div>
               <div className='text-xs text-white opacity-50'>
                  <Moment date={post.createAd} format='DD MMM YYYY' />
               </div>
            </div>
            <div className='text-white text-xl'>{post.title}</div>
            <p className='text-white opacity-60 text-xs pt-4 mt-2 line-clamp-4 '>
               {post.text}
            </p>
            <div className='flex gap-3 items-center'>
               <button className='flex items-center justify-center text-xs text-white opacity-50 '>
                  <AiFillEye />
                  <span className='ml-1'>{post.views}</span>
               </button>
               <button className='flex items-center justify-center text-xs text-white opacity-50'>
                  <AiOutlineMessage />
                  <span className='ml-1'>{post.comments?.length}</span>
               </button>
            </div>
         </div>
      </Link>
   )
}
