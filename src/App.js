import { Layout } from './components/Layout'
import { MainPage } from './pages/MainPage'
import { PostsPage } from './pages/PostsPage'
import { PostPage } from './pages/PostPage'
import { AddPostPages } from './pages/AddPostPages'
import { LoginPage } from './pages/LoginPage'
import { RegisterPage } from './pages/RegisterPage'

import { Route, Routes } from 'react-router-dom'

function App() {
   return (
      <Layout>
         <Routes>
            <Route path='/' element={<MainPage />} />
            <Route path='posts' element={<PostsPage />} />
            <Route path=':id' element={<PostPage />} />
            <Route path='new' element={<AddPostPages />} />
            <Route path='login' element={<LoginPage />} />
            <Route path='register' element={<RegisterPage />} />
         </Routes>
      </Layout>
   )
}

export default App
