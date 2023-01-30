import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { checkIsAuth, logout } from '../redux/features/auth/authSlice'
import { toast } from 'react-toastify'

export const NavBar = () => {
   const isAuth = useSelector(checkIsAuth)
   const dispatch = useDispatch()
   const navigate = useNavigate()

   //это мы делаем функцию по выходу и очистки token берем из файла authSlice.js
   const logOutHandler = () => {
      dispatch(logout()) //обнуляем наше состояние
      //очищаем наш localStorage
      window.localStorage.removeItem('token')
      toast('Вы вышли из системы')
      navigate('/')
   }

   //это мы делаем подсветку активных ссылок
   const activeStyles = {
      color: 'white',
   }
   return (
      <div className='flex py-4 justify-between items-center'>
         <span className='flex justify-center items-center w-6 h-6 bg-gray-600 text-xs text-white rounded-sm'>
            E
         </span>
         {isAuth && (
            <ul className='flex gap-8'>
               <li>
                  <NavLink
                     to={'/'}
                     className='text-xs text-gray-400 hover:text-white'
                     style={({ isActive }) =>
                        isActive ? activeStyles : undefined
                     }
                  >
                     Главная
                  </NavLink>
               </li>
               <li>
                  <NavLink
                     to={'/posts'}
                     className='text-xs text-gray-400 hover:text-white'
                     style={({ isActive }) =>
                        isActive ? activeStyles : undefined
                     }
                  >
                     Мои посты
                  </NavLink>
               </li>
               <li>
                  <NavLink
                     to={'/new'}
                     className='text-xs text-gray-400 hover:text-white'
                     style={({ isActive }) =>
                        isActive ? activeStyles : undefined
                     }
                  >
                     Добавить пост
                  </NavLink>
               </li>
            </ul>
         )}
         <div className='flex justify-center items-center bg-gray-600 text-xs text-white rounded-sm px-4 py-2'>
            {isAuth ? (
               <button onClick={logOutHandler}>Выйти</button>
            ) : (
               <Link to={'/login'}>Войти</Link>
            )}
         </div>
      </div>
   )
}
