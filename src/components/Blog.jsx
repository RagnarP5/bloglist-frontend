import {useState} from 'react'

const Blog = ({ blog, handleLikes }) => {
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

export default Blog