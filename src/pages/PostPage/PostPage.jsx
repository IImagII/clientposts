import React from 'react'
import style from './PostPage.module.scss'
import Moment from 'react-moment'
import {
   AiFillEye,
   AiOutlineMessage,
   AiTwotoneEdit,
   AiFillDelete,
} from 'react-icons/ai'
import { useCallback } from 'react'
import axios from '../../utils/axios'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useState } from 'react'
import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { removePost } from '../../redux/features/post/postSlice'
import { toast } from 'react-toastify'
import {
   createComment,
   getCommentPost,
} from '../../redux/features/comment/commentSlice'
import { CommentItem } from '../../components/CommentItem'

export const PostPage = () => {
   const [post, setPost] = useState(null) // состояние для постов
   const [comment, setComment] = useState('') // состояние для коментариев

   const { user } = useSelector(state => state.auth) //достаем нашего пользователя
   const { comments } = useSelector(state => state.comment) // достаем наши коментарии

   // console.log(comments)
   const params = useParams() //для порлучения параметров
   const navigate = useNavigate()
   const dispatch = useDispatch()

   // тут мы можем обойтись без redux а получать напрямую
   const fetchPost = useCallback(async () => {
      const { data } = await axios.get(`/posts/${params.id}`)
      setPost(data)
   }, [params.id])

   //удаление конкретного поста
   const handlerRemovePost = () => {
      try {
         dispatch(removePost(params.id))
         toast('Пост был удален')
         navigate('/posts')
      } catch (err) {
         console.log(err)
      }
   }

   //функция создания коментария в посте
   const handleSubmit = () => {
      try {
         const postId = params.id
         dispatch(createComment({ postId, comment }))
         setComment('')
         toast('Комментарий создан')
      } catch (err) {
         console.log(err)
      }
   }

   // создам функцию по загрузке коменатриев
   const fetchComments = useCallback(async () => {
      try {
         dispatch(getCommentPost(params.id))
      } catch (err) {
         console.log('err', err)
      }
   }, [params.id, dispatch])

   //запрос и вывод постов
   useEffect(() => {
      fetchPost() // получаем и выводим наши пост
   }, [fetchPost])

   //запрос и вывод коментариев к посту
   useEffect(() => {
      fetchComments() // получаем и выводим наши коментарии
   }, [fetchComments])

   //проверка на налчиие постов чтобы не было ошибки
   if (!post) {
      return (
         <div className='text-xs text-center text-white py-10'>
            Загрузка.....
         </div>
      )
   }
   return (
      <div>
         <button className={style.page} onClick={() => navigate('/')}>
            Назад
         </button>
         <div className={style.all}>
            <div className={style.comment}>
               <div className={style.post}>
                  <div
                     className={
                        post?.imgUrl
                           ? 'flex rounded-sm h-80'
                           : 'flex rounded-sm'
                     }
                  >
                     {post?.imgUrl && (
                        <img
                           src={`https://server-posts-full-stack-production.up.railway.app/${post.imgUrl}`}
                           alt='img'
                           className='object-cover w-full'
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
                  <p className='text-white opacity-60 text-xs pt-4 mt-2'>
                     {post.text}
                  </p>
                  <div className='flex gap-3 items-center mt-2 justify-between'>
                     <div className='flex gap-3 mt-4'>
                        <button className='flex items-center justify-center text-xs text-white opacity-50 '>
                           <AiFillEye style={{ fontSize: 20 }} />
                           <span className='ml-1'>{post.views}</span>
                        </button>
                        <button className='flex items-center justify-center text-xs text-white opacity-50'>
                           <AiOutlineMessage style={{ fontSize: 19 }} />
                           <span className='ml-1'>{post.comments?.length}</span>
                        </button>
                     </div>

                     {/* Деалем проверку на пользователя  */}
                     {user?._id === post.author && (
                        <div className='flex gap-3 mt-4'>
                           <button className='flex items-center justify-center  text-white opacity-50 mr-2'>
                              <Link to={`/${params.id}/edit`}>
                                 <AiTwotoneEdit style={{ fontSize: 20 }} />
                              </Link>
                           </button>
                           <button
                              onClick={handlerRemovePost}
                              className='flex items-center justify-center  text-white opacity-50'
                           >
                              <AiFillDelete style={{ fontSize: 20 }} />
                           </button>
                        </div>
                     )}
                  </div>
               </div>
            </div>
            <div className={style.comment_1}>
               <form className='flex gap-2' onSubmit={e => e.preventDefault()}>
                  <input
                     type='text'
                     placeholder='Comment'
                     value={comment}
                     onChange={e => setComment(e.target.value)}
                     className='text-black w-full rounded-sm bg-gray-400 border p-2 text-xs outline-none placeholder:text-gray-700'
                  />
                  <button
                     type='submit'
                     onClick={handleSubmit}
                     className='flex justify-center items-center bg-gray-600 text-xs text-white rounded-sm py-2 px-4'
                  >
                     Отправить
                  </button>
               </form>
               {comments?.map(comment => (
                  <CommentItem key={comment._id} cmt={comment} />
               ))}
            </div>
         </div>
      </div>
   )
}
