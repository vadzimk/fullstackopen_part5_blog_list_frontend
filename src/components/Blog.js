import React, {useState} from 'react'

const Blog = ({blog, handleUpdateBlog, handleRemoveBlog}) => {

    const [showDetails, setShowDetails] = useState(false)


    // Blog.Schema = {title: '', author: '', url: '', likes: 0, user: ''}

    const blogStyle = {
        paddingTop: 10,
        paddingLeft: 2,
        border: 'solid 1px gray',
        marginBottom: 5,
        borderRadius: 5
    }

    const detailsStyle = {
        display: showDetails ? '' : 'none'
    }

    const updateBlog = (blog) => {
        blog.likes += 1
        handleUpdateBlog(blog)
    }

    const removeBlog = (blog) => {
        window.confirm(`delete ${blog.title} ?`)
        handleRemoveBlog(blog)
    }

    return (
        <div style={blogStyle} className="blog">
            <div>{blog.title} {blog.author}
                <button onClick={() => {
                    setShowDetails(!showDetails)
                }}>{showDetails ? 'hide' : 'view'}</button>
            </div>
            <div style={detailsStyle} className="details">
                <div>{blog.url}</div>
                <div><span>likes {blog.likes}</span>
                    <button id="likebutton" onClick={() => {
                        updateBlog(blog)
                    }}>like
                    </button>
                </div>
                <div>{blog.author}</div>
                <button onClick={() => {
                    removeBlog(blog)
                }}>remove
                </button>
            </div>
        </div>
    )
}

export default Blog
