import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import Spinner from '../components/Spinner';
import Layout from '../components/Layout';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

function EditNews() {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [content, setContent] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const { newsItemId } = useParams()
  console.log('r', newsItemId)

  useEffect(() => {
    const fetchNewsItem = async () => {
      setLoading(true)
      try {
        const token = localStorage.getItem('token')
        const userId = localStorage.getItem('userId') 
        const response = await axios.post(`/api/newsitems/getnewsitembyid/${newsItemId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        userId: userId 
      }
    })

    if (response.data) {
      console.log('Data received:', response.data)
      setTitle(response.data.title)
      setDescription(response.data.description)
      setContent(response.data.content)
    } else {
      console.error('No data received')
      toast('No data found', 'error')
    }
  } catch (error) {
    console.error('Error fetching news item:', error)
    toast('Failed to load news item', 'error')
  } finally {
    setLoading(false)
  }
};
  fetchNewsItem()
  }, [newsItemId])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      const token = localStorage.getItem('token')
      await axios.put(
        `/api/newsitems/update/${newsItemId}`,
        { title, description, content },
        { headers: { Authorization: `Bearer ${token}` } }
      )
      toast('News updated successfully', 'success')
      navigate('/home')
    } catch (error) {
      console.error('Error updating news item:', error)
      toast('Something went wrong', 'error')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Layout>
      {loading && <Spinner />}
      <h1 className="text-2xl font-semibold mt-5 ml-5">Edit News</h1>
      <form onSubmit={handleSubmit} className="px-5 pt-5">
        <input
          value={title}
          onChange={(e) =>{  setTitle(e.target.value) }}
          type="text"
          className="border-2 h-10 w-full border-gray-300 px-5 mb-2"
          placeholder="Title"
        />
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="border-2 w-full border-gray-300 px-5 "
          rows="4"
          placeholder="Description"
        ></textarea>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="border-2 w-full border-gray-300 px-5 draft-editor"
          rows="4"
          placeholder="Content"
        ></textarea>
        <div className="flex justify-end space-x-5 pr-5 mt-5">
          <button
            type="button"
            className="px-5 py-1 bg-red-700 text-sm text-white"
            onClick={() => navigate('/home')}
          >
            CANCEL
          </button>
          <button
            type="submit"
            className="px-5 py-1 bg-green-500 text-sm text-white"
          >
            {loading ? 'UPDATING...' : 'UPDATE'}
          </button>
        </div>
      </form>
    </Layout>
  )
}

export default EditNews
