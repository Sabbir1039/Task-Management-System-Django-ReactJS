import './App.css';
import Header from './components/Header';
import Home from './components/Home';
import Footer from './components/Footer';
import Login from './components/Login';
import LogoutComponent from './components/logout/logout';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import CreateTask from './components/CreateTask';
import Register from './components/Register';
import UserContextProvider from './contexts/userAuthContext';

function App() {
 
  return (
    <BrowserRouter>
      <UserContextProvider>
        <div className='main-container'>
              <div className='header'>
                <Header />
              </div>

              <div className='content'>
                <Routes>
                  <Route index element={<Home />}/>
                  <Route path='/create-task' element={<CreateTask />} />
                  <Route path='/logout' element={ <LogoutComponent/> } />
                  <Route path="/register" element={<Register />} />
                  <Route path="/login" element={<Login />} />
                </Routes>
              </div>
            
              
              <div className='footer'>
                <Footer />
              </div>
          </div>
      </UserContextProvider>
    </BrowserRouter>
  );
}

export default App;
