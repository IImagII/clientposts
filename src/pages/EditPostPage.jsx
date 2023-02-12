import React, { useCallback, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import axios from '../utils/axios'
import { useEffect } from 'react'
import { updatePost } from '../redux/features/post/postSlice'
import { toast } from 'react-toastify'

export const EditPostPage = () => {
   const [title, setTitle] = useState('') // делаем управляемый input
   const [text, setText] = useState('') // делаем управляемый input
   const [oldImage, setOldImage] = useState('') // для картинок делаем два
   const [newImage, setNewImage] = useState('')

   const dispatch = useDispatch()
   const navigate = useNavigate()
   const params = useParams()

   //сначало получаем старый пост по id
   const fetchPost = useCallback(async () => {
      const { data } = await axios.get(`/posts/${params.id}`)
      setTitle(data.title) //получаем старые данные по заголовку
      setText(data.text) //получаем старые данные по тексту
      setOldImage(data.imgUrl) // так вставляем старую картинку
   }, [params.id])
   // Вызываем функцию со старыми данными
   useEffect(() => {
      fetchPost()
   }, [fetchPost])

   //создаем функцию которая отправляет новые данные
   const handleSubmit = () => {
      try {
         // формируем для нашего поста новую форму для отправки
         const updatedPost = new FormData()
         // добавляем в обьект
         updatedPost.append('title', title)
         updatedPost.append('text', text)
         updatedPost.append('id', params.id)
         updatedPost.append('image', newImage)

         //обязательно передаем объект с параметрами как мы и писали в thunk
         dispatch(updatePost(updatedPost))
         toast('Пост был Изменен')
         navigate('/posts')
      } catch (err) {
         console.log(err.message)
      }
   }

   //создаем функцию по оичстке формы
   const deleteHandler = () => {
      setTitle('')
      setText('')
   }

   return (
      <form className='w-1/3 mx-auto py-10' onSubmit={e => e.preventDefault()}>
         <label className='text-gray-300 py-2 bg-gray-600 text-xs mt-2 flex items-center justify-center border-2 border-dotted cursor-pointer'>
            Прикрепить изображение
            <input
               type='file'
               className='hidden'
               onChange={e => {
                  setNewImage(e.target.files[0])
                  setOldImage('')
               }}
            />
         </label>
         <div className='flex object-cover py-2'>
            {/* делаем что при выборе картинки у нас она отображалась в приложении */}
            {/* сначало отображаем старую картинку  */}
            {oldImage && (
               <img
                  src={`https://server-posts-full-stack-production.up.railway.app/${oldImage}`}
                  alt={oldImage.name}
               />
            )}
            {/* поотом отображаем новую картинку если она у нас есть */}
            {newImage && (
               <img src={URL.createObjectURL(newImage)} alt={newImage.name} />
            )}
         </div>
         <label className='text-xs text-white opacity-70'>
            Заголовок поста:
            <input
               type='text'
               placeholder='Заголовок'
               value={title}
               onChange={e => setTitle(e.target.value)}
               className='mt-1 text-black w-full rounded-lg bg-gray-400 py-1 px-2 text-xs outline-none placeholder:text-gray-700'
            />
         </label>
         <label className='text-xs text-white opacity-70'>
            Текст поста:
            <textarea
               placeholder='Текст поста'
               value={text}
               onChange={e => setText(e.target.value)}
               className='mt-1 text-black w-full rounded-lg bg-gray-400 py-1 px-2 text-xs outline-none resize-none h-40 placeholder:text-gray-700'
            />
         </label>
         <div className='flex gap-8 items-center justify-center mt-4'>
            <button
               onClick={handleSubmit}
               className='flex justify-center items-center bg-gray-600 text-xs text-white rounded-sm py-2 px-4'
            >
               Обновить пост
            </button>
            <button
               onClick={deleteHandler}
               className='flex justify-center items-center bg-red-600 text-xs text-white rounded-sm py-2 px-4'
            >
               Отменить
            </button>
         </div>
      </form>
   )
}
