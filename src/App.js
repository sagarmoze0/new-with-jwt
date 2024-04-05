import { useNavigation } from 'react-router-dom';
import { Route, Routes, BrowserRouter as Router } from 'react-router-dom';
import HomePage from './pages/HomePage';
import AddNews from './pages/AddNews';
import NewsDesc from './pages/NewsDesc';
import LandingPage from './pages/LandingPage';
// import AboutPage from './pages/AboutPage';
// import FeedbackForm from './components/feedback/FeedbackForm';
// import FeedbackList from './components/feedback/FeedbackList';
// import FeedbackStats from './components/feedback/FeedbackStats';
// import AboutLink from './components/feedback/AboutLink';
// import { FeedbackProvider } from './context/FeedbackContext';
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
            {/* <Route path='/feedback' element={
             <div > 
                <FeedbackProvider >
                  <FeedbackForm />
                  <FeedbackStats />
                  <FeedbackList />
              </FeedbackProvider>
              </div>
              } /> */}
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