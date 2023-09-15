import {useState} from 'react'
import PropTypes from "prop-types";

const Blog = ({ blog, handleLikes, handleDelete }) => {
    const blogStyle = {
      paddingTop: 10,
      paddingLeft: 2,
      border: 'solid',
      borderWidth: 1,
      marginBottom: 5
    }
    const [showMinimized, setShowMinimized] = useState(true)
    const toggleViewHide = () => {
      setShowMinimized(!showMinimized)
    }
    const buttonLabel = showMinimized ? 'view' : 'hide'

    const increaseLikes = async (event) => {
        event.preventDefault()
        const updatedBlog = ({
            ...blog, likes: blog.likes + 1
        })
        await handleLikes(updatedBlog)
    }

    const deleteBlog = async (event) => {
        event.preventDefault()
        console.log("button clicked")
        await handleDelete(blog)
    }

    const extendedView = () => {
        return (
            <div>
                <div>
                    {blog.title} {blog.author} <button onClick={toggleViewHide}>{buttonLabel}</button>
                </div>
                <div>
                    <a href={blog.url}>{blog.url}</a>
                </div>
                <div>
                    likes {blog.likes} <button onClick={increaseLikes}>like</button>
                </div>
                {blog.user != null &&
                <div>
                    {blog.user.name}
                </div>}
                <div>
                    <button onClick={deleteBlog}>remove</button>
                </div>
            </div>
        )
    }
    const minimizedView = () => {
        return (<div>
            {blog.title} {blog.author} <button onClick={toggleViewHide}>{buttonLabel}</button>
        </div> )
    }

 return (
     <div style={blogStyle}>
         {showMinimized ? minimizedView() : extendedView()}
     </div>
)
}

Blog.propTypes = {
    blog: PropTypes.object.isRequired,
    handleLikes: PropTypes.func.isRequired,
    handleDelete: PropTypes.func.isRequired
}

Blog.displayName = 'Blog'

export default Blog