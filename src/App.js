import { Layout } from './components/Layout'
import { MainPage } from './pages/MainPage'
import { PostsPage } from './pages/PostsPage'
import { PostPage } from './pages/PostPage/PostPage'
import { AddPostPages } from './pages/AddPostPages'
import { LoginPage } from './pages/LoginPage'
import { RegisterPage } from './pages/RegisterPage'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css' //это стили для вывода ошибок

import { Route, Routes } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { getMe } from './redux/features/auth/authSlice'
import { EditPostPage } from './pages/EditPostPage'

function App() {
   const dispatch = useDispatch()

   useEffect(() => {
      dispatch(getMe())
   }, [dispatch])

   return (
      <Layout>
         <Routes>
            <Route path='/' element={<MainPage />} />
            <Route path='posts' element={<PostsPage />} />
            <Route path=':id' element={<PostPage />} />
            <Route path=':id/edit' element={<EditPostPage />} />
            <Route path='new' element={<AddPostPages />} />
            <Route path='login' element={<LoginPage />} />
            <Route path='register' element={<RegisterPage />} />
         </Routes>
         {/* для отображения ошибок */}
         <ToastContainer position='bottom-right' />
      </Layout>
   )
}

export default App
