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
  const [name, setName] = useState('')
  const [username, setUsername] =useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)
  const [notificationMessage, setNotificationMessage] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
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

  const addBlog = async (event) => {
    event.preventDefault()
    const blogObject = {
      title: title,
      author: author,
      url: url
    }
    const returnedBlog = await blogService.create(blogObject)
    setBlogs(blogs.concat(returnedBlog))
    setNotificationMessage(`A new blog ${title} by ${author} was added`)
    setTimeout(() => {
      setNotificationMessage(null)
    }, 5000)
    setTitle('')
    setAuthor('')
    setUrl('')

  }

  const blogFormRef = useRef()
  const blogForm = () => {
    return (
    <Togglable buttonLabel="new blog" ref={blogFormRef}>
      <BlogForm
          handleSubmit={addBlog}
          title={title}
          author={author}
          url={url}
          handleTitleChange={({target}) => setTitle(target.value)}
          handleAuthorChange={({target}) => setAuthor(target.value)}
          handleUrlChange={({target}) => setUrl(target.value)}
      />
    </Togglable>
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
            {user.name} is logged in<br /><br/>
          </div>
      {blogForm()}

      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
      <div>
        <button onClick={handleLogout}>log out</button>
      </div>
    </div>

  )
}

export default App