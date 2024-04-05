import React, { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom';
import FeedbackForm from './feedback/FeedbackForm'
import FeedbackList from './feedback/FeedbackList'
import FeedbackStats from './feedback/FeedbackStats'
import { FeedbackProvider } from '../context/FeedbackContext';


function SideBar({ showSideBar }) {
  const location = useLocation();
  const navigate = useNavigate();
  const [showFeedbackForm, setShowFeedbackForm]=useState(false)

  const menuItems = [
    { title: 'Home', path: '/home' },
    // { title: 'Posted', path: '/posted' },
    { title: 'AddNews', path: '/add' },
    // { title: 'Profile', path: '/profile' },
    { title: 'Logout', path: '/logout' },
  ];

  const logout = () => {
    localStorage.removeItem('user')
    setShowFeedbackForm(true)
    navigate('/')
  }

  const closeFeedbackForm = () => {
    setShowFeedbackForm(false)
    navigate('/login')

  }

  return showSideBar ? (
    <div className='bg-primary w-60 h-screen flex flex-col'>
      <div>
        <h1 className='text-white text-3xl font-bold mt-10 ml-10'>News</h1>
      </div>
      <div className='flex flex-col mt-20 '>
        {menuItems.map((item) => (
          <React.Fragment key={item.title}>
            {item.title !== 'Logout' ? (
              <Link
                to={`${item.path}`}
                className={`pl-10 py-5 text-gray-400 hover:bg-gray-50 hover:text-gray-700 text-sm
               ${
                 location.pathname.includes(item.path) &&
                 'bg-[#145c2aaf] text-yellow-200 font-bold'
               }
              `}
              >
                {item.title}
              </Link>
            ) : (
              <>
              <span
                onClick={logout}
                className="pl-10 py-5 text-gray-400 hover:bg-gray-50 hover:text-gray-700 text-sm cursor-pointer"
              >
                Logout
              </span>
              {/* {showFeedbackForm && 
              <FeedbackProvider>
                <FeedbackForm onClose={closeFeedbackForm} />
                <FeedbackStats />
                <FeedbackList />
              </FeedbackProvider>
              }            */}
              </>
               )}
          </React.Fragment>
        ))}
      </div>
    </div>
  ) : null;
}

export default SideBar;