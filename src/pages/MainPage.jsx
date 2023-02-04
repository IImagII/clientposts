import React, { useEffect } from 'react'
import { PostItem } from '../components/PostItem'
import { PopularPosts } from '../components/PopularPost'
import { useDispatch, useSelector } from 'react-redux'
import { getAllPosts } from '../redux/features/post/postSlice'

export const MainPage = () => {
   const dispatch = useDispatch()
   const { posts, popularPosts } = useSelector(state => state.post) // берем из postSlice

   //Получаем посты через asynkSunk postSlice
   useEffect(() => {
      dispatch(getAllPosts())
   }, [dispatch])

   //Делаем проверку если постов не существует выводиться сообщение
   if (!posts.length) {
      return (
         <div className='text-xs text-center text-white py-10'>
            Постов не существует
         </div>
      )
   }
   return (
      <div className='max-w-[900px] mx-auto py-10'>
         <div className='flex justify-between gap-8'>
            <div className='flex flex-col gap-10 basis-4/5'>
               {posts?.map(post => (
                  <PostItem key={post._id} post={post} />
               ))}
            </div>
            <div className='basis-1/5'>
               <div className='text-xs uppercase text-white'>Популярные :</div>
               {popularPosts?.map(post => (
                  <PopularPosts key={post._id} post={post} />
               ))}
            </div>
         </div>
      </div>
   )
}
