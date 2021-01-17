import React from 'react'

const BlogForm = ({handleNewBlogChange, newBlog, handleCreateBlog}) => {


    return (
        <div>
            <h3>create new</h3>
            <form onSubmit={handleCreateBlog}>
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