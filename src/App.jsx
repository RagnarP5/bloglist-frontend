import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginForm from './components/loginForm';
import loginService from './services/login'
import blogForm from './components/blogForm'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [name, setName] = useState('')
  const [username, setUsername] =useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

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
      console.log("Wrong credentials")
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
    setTitle('')
    setAuthor('')
    setUrl('')
  }


  if (user === null) {
    return (
        <div>
        <h2>Log in to application</h2>
          {loginForm(
            {handleLogin, username, setUsername,password, setPassword}
        )}
        </div>
    )
  }


  return (
    <div>
      <h2>Blogs</h2>
          <div>
            {user.name} is logged in<br /><br/>
          </div>
      {blogForm(
          {addBlog,
            title, setTitle,
            author, setAuthor,
            url, setUrl}
      )}
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