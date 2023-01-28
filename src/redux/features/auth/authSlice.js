import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from '../../../utils/axios'

const initialState = {
   user: null,
   token: null,
   isLoading: false,
   status: null,
}

export const registerUser = createAsyncThunk(
   //auth-берется из nane registerUser - берется из названия функции
   'auth/registerUser',
   async ({ username, password }) => {
      try {
         //внимание мы тут импортируем не просто axios а уже модифицированную нами его версию свмотри выше
         const { data } = await axios.post('/auth/register', {
            username,
            password,
         })
         //делаем проверку если есть токен то мы его записываем в localStorage
         if (data.token) {
            window.localStorage.setItem('token', data.token)
         }
         return data
      } catch (err) {
         console.log('err', err)
      }
   }
)
export const loginUser = createAsyncThunk(
   //auth-берется из nane registerUser - берется из названия функции
   'auth/loginUser',
   async ({ username, password }) => {
      try {
         //внимание мы тут импортируем не просто axios а уже модифицированную нами его версию свмотри выше
         const { data } = await axios.post('/auth/login', {
            username,
            password,
         })
         //делаем проверку если есть токен то мы его записываем в localStorage
         if (data.token) {
            window.localStorage.setItem('token', data.token)
         }
         return data
      } catch (err) {
         console.log('err', err)
      }
   }
)

export const authSlice = createSlice({
   name: 'auth',
   initialState,
   reducers: {},
   extraReducers: {
      // Register user
      [registerUser.pending]: state => {
         state.isLoading = true
         state.status = null
      },
      [registerUser.fulfilled]: (state, action) => {
         state.isLoading = false
         // мы тут указываем message так как на бекенде именно в этой переменной мы записывали какие то сообщения смотреть файл auth.js ( return res.status(200).json({ user, message: 'Пользователь создан' })))
         state.status = action.payload.message
         //тут мы тоже указываем user то есть конкретно то что приходит нам из бекенда  смотреть файл auth.js(  return res.status(200).json({ user, message: 'Пользователь создан' }))
         state.user = action.payload.user
         //это тоже что берется из бекенда тот токен который приходит
         state.token = action.payload.token
      },
      [registerUser.rejected]: (state, action) => {
         // мы тут указываем message так как на бекенде именно в этой переменной мы записывали какие то сообщения смотреть файл auth.js  (return res.status(400).json({ message: 'Произошла ошибка', errors }))
         state.status = action.payload.message
         state.isLoading = false
      },
      //Login user
      [loginUser.pending]: state => {
         state.isLoading = true
         state.status = null
      },
      [loginUser.fulfilled]: (state, action) => {
         state.isLoading = false
         // мы тут указываем message так как на бекенде именно в этой переменной мы записывали какие то сообщения смотреть файл auth.js ( return res.status(200).json({ user, message: 'Пользователь создан' })))
         state.status = action.payload.message
         //тут мы тоже указываем user то есть конкретно то что приходит нам из бекенда  смотреть файл auth.js(  return res.status(200).json({ user, message: 'Пользователь создан' }))
         state.user = action.payload.user
         //это тоже что берется из бекенда тот токен который приходит
         state.token = action.payload.token
      },
      [loginUser.rejected]: (state, action) => {
         // мы тут указываем message так как на бекенде именно в этой переменной мы записывали какие то сообщения смотреть файл auth.js  (return res.status(400).json({ message: 'Произошла ошибка', errors }))
         state.status = action.payload.message
         state.isLoading = false
      },
   },
})

export default authSlice.reducer
