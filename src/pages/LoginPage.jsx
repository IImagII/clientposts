import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { checkIsAuth, loginUser } from '../redux/features/auth/authSlice'
import { toast } from 'react-toastify'

export const LoginPage = () => {
   const [username, setUserName] = useState('') //делаем управляемые input
   const [password, setPassword] = useState('') //делаем управляемые input
   const dispatch = useDispatch()
   const navigate = useNavigate()
   const isAuth = useSelector(checkIsAuth)

   const { status } = useSelector(state => state.auth)

   //это делается для обработки ошибок мы получили status
   useEffect(() => {
      if (status) {
         toast(status)
         if (isAuth) {
            navigate('/')
         }
      }
   }, [status, navigate, isAuth])

   //создаем функцию которая делат запрос на авторизацию

   const handleSubmit = () => {
      try {
         dispatch(loginUser({ username, password })) //обязательно передаем объект с параметрами как мы и писали в thunk
      } catch (err) {
         console.log(err)
      }
   }

   return (
      <form
         onSubmit={e => e.preventDefault()}
         className='w-1/4 h-60 mx-auto mt-40'
      >
         <h1 className='text-lg text-white text-center'>Авторизация</h1>
         <label className='text-xs text-gray-400'>
            Username:
            <input
               type='text'
               placeholder='Username'
               value={username}
               onChange={e => setUserName(e.target.value)}
               className='mt-1 text-black w-full rounded-lg bg-gray-400 border py-1 px-2 text-xs outline-none placeholder:text-gray-700'
            />
         </label>
         <label className='text-xs text-gray-400 '>
            Password:
            <input
               type='password'
               placeholder='Password'
               value={password}
               onChange={e => setPassword(e.target.value)}
               className='mt-1 text-black w-full rounded-lg bg-gray-400 border py-1 px-2 text-xs outline-none placeholder:text-gray-700'
            />
         </label>
         <div className='flex gap-8 justify-center mt-4'>
            <button
               className='flex justify-center items-center text-xs bg-gray-600 text-white rounded-sm py-2 px-4'
               type='submit'
               onClick={handleSubmit}
            >
               Войти
            </button>
            <Link
               to='/register'
               className='flex justify-center items-center text-xs text-white'
            >
               Зарегестрироваться
            </Link>
         </div>
      </form>
   )
}
