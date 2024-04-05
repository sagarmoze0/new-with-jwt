import React, { useState, createContext } from 'react'
import { v4 as uuidv4 } from 'uuid'
const FeedbackContext = createContext()


export function FeedbackProvider({ children }) {
  const [feedback, setFeedback] = useState([])
  const deleteFeedback = (id) => {
    // console.log('app', id)
    if (window.confirm('Are you sure?')) {
      setFeedback(feedback.filter((item) => item.id !== id))
    }
  }


  const addFeedback = (newFeedback) => {
    newFeedback.id = uuidv4()
    // console.log(newFeedback)
    setFeedback([...feedback, newFeedback])
  }


  const [feedbackEdit, setFeedbackEdit] = useState({
    item: {},
    edit: false,
  })


  // Set item to be updated
  const editFeedback = (item) => {
    setFeedbackEdit({
      item,
      edit: true,
    })
  }


  const updateFeedback = (id, updItem) => {
    console.log(id, updItem)
    setFeedback(
      feedback.map((item) => (item.id === id ? { ...item, ...updItem } : item))
    )
  }


  return (
    <FeedbackContext.Provider
      value={{
        feedback,
        deleteFeedback,
        addFeedback,
        editFeedback,
        feedbackEdit,
        updateFeedback,
        setFeedbackEdit,
      }}
    >
      {children}
    </FeedbackContext.Provider>
  )
}


export default FeedbackContext