import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginForm from './components/LoginForm.jsx';
import Togglable from "./components/Togglable.jsx";
import loginService from './services/login'
import BlogForm from './components/BlogForm.jsx'
import Notification from "./components/Notification"
import Error from "./components/Error.jsx";
import LoginForm from "./components/LoginForm.jsx";

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] =useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  const [notificationMessage, setNotificationMessage] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs => {
      setBlogs(blogs)
    })
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username, password
      })

      window.localStorage.setItem(
          'loggedBlogappUser', JSON.stringify(user)
      )

      blogService.set

      setUser(user)
      setUsername('')
      setPassword('')
    } catch {
      setErrorMessage("Wrong credentials")
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const handleLogout = async(event) => {
    event.preventDefault()
    setUser(null)
    window.localStorage.clear()
  }

  const addBlog = async (blogObject) => {
    blogFormRef.current.toggleVisibility()
    const returnedBlog = await blogService.create(blogObject)
    console.log(returnedBlog)
    setBlogs(blogs.concat(returnedBlog))
    setNotificationMessage(`A new blog ${returnedBlog.title} by ${returnedBlog.author} was added`)
    setTimeout(() => {
      setNotificationMessage(null)
    }, 5000)
  }

  const blogFormRef = useRef()
  const blogForm = () => {
    return (
    <Togglable buttonLabel="new blog" ref={blogFormRef}>
      <BlogForm
          createBlog={addBlog}
      />
    </Togglable>
    )
  }

  const handleLikes = async (blog) => {

    const likedBlog = await blogService.like(blog)
    setBlogs(
        blogs.map(blog => blog.id === likedBlog.id ? {...blog, likes: likedBlog.likes} : blog)
    )
  }


  if (user === null) {
    return (
        <div>
          <Error message={errorMessage}/>
        <h2>Log in to application</h2>
          <Togglable buttonLabel="log in">
            <LoginForm
            handleSubmit={handleLogin}
            username={username}
            handleUsernameChange={({target}) => setUsername(target.value)}
            handlePasswordChange={({target}) => setPassword(target.value)}
            password={password}
            />
          </Togglable>

        </div>
    )
  }


  return (
    <div>
      <h2>Blogs</h2>

          <Notification message={notificationMessage}/>
          <div>
            {user.name} is logged in <button onClick={handleLogout}>log out</button><br /><br/>
          </div>
      {blogForm()}

      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} handleLikes={handleLikes}/>
      )}

    </div>

  )
}

export default App