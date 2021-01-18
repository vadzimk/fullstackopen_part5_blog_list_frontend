import React, {useState} from 'react'
import blogService from "../services/blogs.js";

const BlogForm = ({handleCreateBlog}) => {
    const [newBlog, setNewBlog] = useState({title: '', author: '', url: ''})

    const handleNewBlogChange = (e) => {
        const creatingBlog = {
            title: e.target.name === "title" ? e.target.value : newBlog.title,
            author: e.target.name === "author" ? e.target.value : newBlog.author,
            url: e.target.name === "url" ? e.target.value : newBlog.url,
        }
        setNewBlog(creatingBlog)
    }

    const handleNewBlog = async (e) => {
        e.preventDefault()
        handleCreateBlog(newBlog)
        setNewBlog({title: '', author: '', url: ''})
    }

    return (
        <div>
            <h3>create new</h3>
            <form onSubmit={handleNewBlog}>
                <label>title:
                    <input type="text" name="title" value={newBlog.title} onChange={handleNewBlogChange}/>
                </label><br/>
                <label>author:
                    <input type="text" name="author" value={newBlog.author} onChange={handleNewBlogChange}/>
                </label><br/>
                <label>url:
                    <input type="text" name="url" value={newBlog.url} onChange={handleNewBlogChange}/>
                </label><br/>
                <button type="submit">create</button>
            </form>
        </div>
    )
}

export default BlogForm