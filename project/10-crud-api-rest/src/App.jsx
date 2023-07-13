import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import About from './components/About'
import Contacts from './components/Contacts'
import Home from './components/Home'
import PostList from './components/PostList'
import Posts from './components/Posts'
import Nav from './components/Nav'
import './App.css'


function App() {

  return (
        <div className='App'>
          <Router>
            <Nav/>
            <Routes>
              <Route exact path='/' element={<Home/>}/>
              <Route exact path='about' element={<About/>}/>
              <Route exact path='contacts' element={<Contacts/>}/>
              
              <Route exact path='posts' element={<Posts/>}>
                <Route path='postlist' element={<PostList/>}/>
              </Route>
            </Routes>
          </Router>
        </div>
  )
}

export default App
