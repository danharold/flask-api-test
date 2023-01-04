import React from 'react';
import { BrowserRouter, Routes, Route} from 'react-router-dom';
import Header from './components/Header';

import Error404 from './pages/404';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';

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
            <Route path="/" element={<HomePage/>}/>
            <Route path="/login" element={<LoginPage/>}/>
            <Route path="/register" element={<RegisterPage/>}/>
          </Routes>
        </BrowserRouter>
    </div>
  );
}

export default App;
