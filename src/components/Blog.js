import React, {useState} from 'react'

const Blog = ({blog}) => {

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


    return (
        <div style={blogStyle}>
            <div>{blog.title} {blog.author}
                <button onClick={() => {
                    setShowDetails(!showDetails)
                }}>{showDetails ? 'hide' : 'view'}</button>
            </div>
            <div style={detailsStyle}>
                <div>{blog.url}</div>
                <div>likes {blog.likes}
                    <button>like</button>
                </div>
                <div>{blog.author}</div>
            </div>
        </div>
    )
}

export default Blog
