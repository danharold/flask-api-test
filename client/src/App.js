import React, {useEffect, useState} from 'react';
import { BrowserRouter, Routes, Route} from 'react-router-dom';
import Header from './components/Header';
import FeedPage from './pages/FeedPage';
import Error404 from './pages/404';

function App() {
  // const [posts, setPosts] = useState([])
  
  // useEffect(() => {
  //   fetch('/api/posts').then(res => res.json()).then(data => {
  //     setPosts(posts);
  //   });
  // }, []);


  return (
    <div className="App">
        <BrowserRouter>
          <Header/>
          <Routes>
            <Route path="*" element={<Error404/>}/>
            <Route path="/" element={<FeedPage/>}/>
          </Routes>
        </BrowserRouter>
    </div>
  );
}

export default App;
