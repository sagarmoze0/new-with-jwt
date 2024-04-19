import { useNavigation } from 'react-router-dom';
import { Route, Routes, BrowserRouter as Router } from 'react-router-dom';
import HomePage from './pages/HomePage';
import AddNews from './pages/AddNews';
import NewsDesc from './pages/NewsDesc';
import LandingPage from './pages/LandingPage';
import EditNews from './pages/EditNews'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function App() {
  return (
    <div >
      <ToastContainer />
      <Router>
        
        <div >
          <Routes>
            <Route path='/' element={<LandingPage />} />
            <Route path='/home' element={<HomePage />} />
            <Route path='/add' element={<AddNews />} />
            <Route path='/newsdesc/:newsid' element={<NewsDesc />} />
            <Route path='/update/:newsItemId' element={<EditNews />} />
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;

export const ProtectedRoute = ({ children }) => {
  const Navigate=useNavigation()
  if (localStorage.getItem('user')) {
    return children
  } else {
    return <Navigate to="/" />
  }
}