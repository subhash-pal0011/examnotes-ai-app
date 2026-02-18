import NotesNav from '@/comonent/NotesNav'
import TopicForm from '@/comonent/TopicForm'
import React from 'react'

const page = () => {
  return (
    <div className='min-h-screen bg-linear-to-r from-green-100 via-green-100 to-gray-200 md:px-5 p-2 space-y-5'>
      <NotesNav />
      <TopicForm />
    </div>
  )
}

export default page
