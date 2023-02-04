import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from '../../../utils/axios'

const initialState = {
   posts: [],
   popularPosts: [],
   loading: false,
}

// запрос на создание постов
export const createPost = createAsyncThunk(
   //post-берется из nane addPost - берется из названия функции
   'post/createPost',
   async params => {
      try {
         //внимание мы тут импортируем не просто axios а уже модифицированную нами его версию свмотри выше
         const { data } = await axios.post('/posts', params)
         return data
      } catch (err) {
         console.log('err', err)
      }
   }
)
//запрос на получение всех постов
export const getAllPosts = createAsyncThunk('post/getAllPosts', async () => {
   try {
      const { data } = await axios.get('/posts')
      return data
   } catch (err) {
      console.log('err', err)
   }
})

//запрос на удаление поста
export const removePost = createAsyncThunk('post/removePost', async id => {
   try {
      const { data } = await axios.delete(`/posts/${id}`, id)
      return data
   } catch (err) {
      console.log('err', err)
   }
})

//запрос на Редактирование поста
export const updatePost = createAsyncThunk(
   'post/updatePost',
   async updatePost => {
      try {
         const { data } = await axios.put(`/posts/${updatePost.id}`, updatePost)
         return data
      } catch (err) {
         console.log('err', err)
      }
   }
)

export const postSlice = createSlice({
   name: 'post',
   initialState,
   reducers: {},
   extraReducers: {
      //Create posts
      [createPost.pending]: state => {
         state.loading = true
      },
      [createPost.fulfilled]: (state, action) => {
         state.loading = false
         state.posts.push(action.payload) // делаем так потомучто массив у нас будет просто пост поэтому целиком добавляем его через action.payload
      },
      [createPost.rejected]: state => {
         state.loading = false
      },

      //Получение постов
      [getAllPosts.pending]: state => {
         state.loading = true
      },
      [getAllPosts.fulfilled]: (state, action) => {
         state.loading = false
         state.posts = action.payload.posts //тут вставляем то что мы получаем из бекенда posts
         state.popularPosts = action.payload.popularPosts //тут вставляем то что мы получаем из бекенда popularPosts
      },
      [getAllPosts.rejected]: state => {
         state.loading = false
      },

      // Удаление поста
      [removePost.pending]: state => {
         state.loading = true
      },
      [removePost.fulfilled]: (state, action) => {
         state.loading = false
         state.posts = state.posts.filter(
            post => post._id !== action.payload._id
         ) //удаляем через фильтр соответственно
      },
      [removePost.rejected]: state => {
         state.loading = false
      },

      // Редактироввание поста
      [updatePost.pending]: state => {
         state.loading = true
      },
      [updatePost.fulfilled]: (state, action) => {
         state.loading = false
         // мы находим index именно нашего конкретного поста
         const index = state.posts.findIndex(
            post => post._id === action.payload._id
         )
         // и теперь имея index мы находим тот пост по нему и помещаем новые данные
         state.posts[index] = action.payload
      },
      [updatePost.rejected]: state => {
         state.loading = false
      },
   },
})

export default postSlice.reducer
