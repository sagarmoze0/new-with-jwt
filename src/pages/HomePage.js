import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import Layout from '../components/Layout'
import Spinner from '../components/Spinner'


function HomePage() {
  const [loading, setLoading] = useState(false)
  const [newsItems, setNewsItems] = useState([])
  const [searchText, setSearchText] = useState('')

  const navigate = useNavigate()


  const getData = async () => {
    setLoading(true)
    try {
      const result = await axios.get('/api/newsitems/getallnewsitems')
      setLoading(false)
      setNewsItems(result.data)
    } catch (error) {
      console.log(error)
      setLoading(false)
    }
  }
  useEffect(() => {
    getData()
  }, [])
console.log('item',newsItems)

  
  const handleDelete = async (newsItemId) => {
    try {
      const userData = JSON.parse(localStorage.getItem('user'));
      console.log(userData)
      if (!userData || !userData.token) {
        throw new Error('User token not found');
      }
  
      const token = userData.token;
        await axios.delete(`/api/newsitems/delete/${newsItemId}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
  
      toast.success('News item deleted successfully');
      navigate('/home')
      getData(); 
    } catch (error) {
      console.error('Error deleting news item:', error);
      toast.error('Failed to delete news item');
    }
  };
  

  
  const currentUser = JSON.parse(localStorage.getItem('user')) || {};
  console.log('user', currentUser)
  console.log('current',currentUser.data._id)

  return (
    <Layout>
      {loading && <Spinner />}
      <div className="grid px-20 sm:px-5 mt-5">
        <input
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          type="text"
          className="border-2 h-10 w-full border-gray-300 px-5"
          placeholder="Search news"
        />
      </div>
      {newsItems.length > 0 && (
  <div className="grid grid-cols-2 sm:grid-cols-1 gap-5 mx-20 sm:mx-5 my-5">
    {newsItems
      .filter((item) => item.title.toLowerCase().includes(searchText.toLowerCase()))
      .map((item) => (
        <div className="shadow-md p-3 border cursor-pointer" onClick={() => navigate(`/newsdesc/${item._id}`)} key={item._id}>
          <>
            <h1 className="text-primary text-lg font-semibold">{item.title}</h1>
            <p>{item.description}</p>
            {item.postedBy === currentUser.data._id && (
              <>
               <button
               onClick={(e) => {
                 e.stopPropagation();
                 navigate(`/update/${item._id}`);
               }}
               className="bg-blue-500 text-white py-1 px-3 text-sm font-semibold rounded hover:bg-blue-700 mr-2"
             >
               Edit
             </button>
              <button
                onClick={() => handleDelete(item._id)}
                className="bg-red-500 text-white py-1 px-3 text-sm font-semibold rounded hover:bg-red-700 mr-2"
              >
                Delete
              </button>
              </>
            )}
            
          </>
        </div>
      ))}
  </div>
)}
    </Layout>
  )
}


export default HomePage