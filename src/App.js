import './App.css'
import { Layout } from './components/Layout'
import { MainPage } from './pages/MainPage'
import { PostsPage } from './pages/PostsPage'

import { Route, Routes } from 'react-router-dom'

function App() {
   return (
      <Layout>
         <Routes>
            <Route path='/' element={<MainPage />} />
            <Route path='/posts' element={<PostsPage />} />
         </Routes>
      </Layout>
   )
}

export default App
