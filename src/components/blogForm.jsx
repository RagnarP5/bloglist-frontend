const blogForm = ({addBlog, title, setTitle, author, setAuthor, url, setUrl}) => {
    return (
        <div>
            <h2>Create new</h2>
            <form onSubmit={addBlog}>
                <div>
                    title
                    <input
                        type="text"
                        value={title}
                        name="title"
                        onChange={({target}) => setTitle(target.value)}/>
                </div>
                <div>
                    author
                    <input
                        type="text"
                        value={author}
                        name="author"
                        onChange={({target}) => setAuthor(target.value)}/>
                </div>
                <div>
                    url
                    <input
                        type="text"
                        value={url}
                        name="title"
                        onChange={({target}) => setUrl(target.value)}/>
                </div>
                <button type="submit">create</button>
            <br/><br/>
            </form>
        </div>
    )
}

export default blogForm