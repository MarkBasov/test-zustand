// import { useState } from 'react'
import { useEffect, useState } from 'react'
import './App.css'
import { Comment, useCommentsStore, useUserStore } from './module/store'

function App() {
  // const [count, setCount] = useState(0)
  const users = useUserStore((state) => state.users)
  const addUser = useUserStore((state) => state.addUser)
  const fetchUsers = useUserStore((state) => state.fetchUsers)

  const fetchComments = useCommentsStore((state) => state.fetchComments)
  const comments = useCommentsStore((state) => state.comments)
  const getCommentsByUser = useCommentsStore((state) => state.getCommentsByUser)

  const onBtnClick = () => {
    addUser('test')
  }
  
  // const [ value, setValue ] = useState<Comment[] | null>(null)

  const commentsByUserId = getCommentsByUser(1)

  useEffect(() => {
    fetchUsers()
    fetchComments()

    // setValue(getCommentsByUser(1))
  }, [fetchUsers, fetchComments, getCommentsByUser])

  return (
    <>
      <div>
        {users.map((user) => (
          <div key={user.id}>{user.id}. {user.username}</div>
        ))}
        <button onClick={onBtnClick}>
          create
        </button>
        {(commentsByUserId || []).map((comment) => (
          <div key={comment.id}>{comment.id}. {comment.body}</div>
        ))}
        <div> --- </div>
        {comments.map((comment) => (
          <div key={comment.id}>{comment.id}. {comment.body}</div>
        ))}
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
