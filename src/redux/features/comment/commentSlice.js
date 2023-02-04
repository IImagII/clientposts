import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from '../../../utils/axios'

const initialState = {
   comments: [],
   loading: false,
}

//запрос на создание коментариев
export const createComment = createAsyncThunk(
   'comment/createComment',
   async ({ postId, comment }) => {
      //postId - мы тут его передаем потомучто нам нужно привязать данный коментарий к определенному посту который мы и ищем по postId
      try {
         //внимание мы тут импортируем не просто axios а уже модифицированную нами его версию свмотри выше
         const { data } = await axios.post(`/comments/${postId}`, {
            postId,
            comment,
         })
         return data
      } catch (err) {
         console.log('err', err)
      }
   }
)

//запрос на получение коментариев к посту
export const getCommentPost = createAsyncThunk(
   'comment/getCommentPost',
   async postId => {
      try {
         const { data } = await axios.get(`/posts/comments/${postId}`)
         return data
      } catch (err) {
         console.log('err', err)
      }
   }
)

export const commentSlice = createSlice({
   name: 'comment',
   initialState,
   reducers: {},
   extraReducers: {
      //Создание коментариев
      [createComment.pending]: state => {
         state.loading = true
      },
      [createComment.fulfilled]: (state, action) => {
         state.loading = false
         state.comments.push(action.payload) // добавляем наш коментарий к массиву так как у нас массивкоментариев
      },
      [createComment.rejected]: state => {
         state.loading = false
      },

      //Получение коментариев для конкретного поста
      [getCommentPost.pending]: state => {
         state.loading = true
      },
      [getCommentPost.fulfilled]: (state, action) => {
         state.loading = false
         state.comments = action.payload // добавление коментариев поотмучто мы сразу получаем массив
      },
      [getCommentPost.rejected]: state => {
         state.loading = false
      },
   },
})

export default commentSlice.reducer
