import React, {useState, useEffect} from 'react'
import Blog from './components/Blog'
import LoginForm from "./components/LoginForm.js";
import blogService from './services/blogs'
import loginService from "./services/login.js";
import BlogForm from "./components/BlogForm.js";

const App = () => {
    const [blogs, setBlogs] = useState([])
    const [user, setUser] = useState(null)
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [newBlog, setNewBlog] = useState({title: '', author: '', url: ''})

    useEffect(() => {
        blogService.getAll().then(blogs =>
            setBlogs(blogs)
        )
    }, [])

    const fetchUserFromStorage = () => {
        const json_user = window.localStorage.getItem("blogAppUser")
        setUser(JSON.parse(json_user))
    }
    useEffect(fetchUserFromStorage, [])  // dependencies [] - effect is executed only when the component is rendered for the first time

    const handleLogin = async (e) => {
        e.preventDefault()  // dont refresh page after form submit
        const user = await loginService.login({username, password})
        if (user) {
            window.localStorage.setItem('blogAppUser', JSON.stringify(user))
            blogService.setToken(user.token)
            setUser(user)
            setUsername('')
            setPassword('')
        }
    }

    const handleLogOut = () => {
        window.localStorage.removeItem('blogAppUser')
        setUser(null)
    }

    const handleNewBlogChange = (e) => {
        const creatingBlog = {
            title: e.target.name === "title" ? e.target.value : newBlog.title,
            author: e.target.name === "author" ? e.target.value : newBlog.author,
            url: e.target.name === "url" ? e.target.value : newBlog.url,
        }
        setNewBlog(creatingBlog)
    }

    const handleCreateBlog = async (e) => {
        e.preventDefault()
        const blog = await blogService.createBlog(newBlog)
        setBlogs(blogs.concat(blog))
        setNewBlog({title: '', author: '', url: ''})
    }
    return (
        (user === null) ?
            <div>
                <h3>log in to application</h3>
                <LoginForm
                    handleLogin={handleLogin}
                    username={username}
                    password={password}
                    setUserName={setUsername}
                    setPassword={setPassword}
                />
            </div>
            :
            <div>
                <h2>blogs</h2>
                <p>{user.name} is logged in
                    <button onClick={handleLogOut}>logout</button>
                </p>
                <BlogForm
                    handleNewBlogChange={handleNewBlogChange}
                    newBlog={newBlog}
                    handleCreateBlog={handleCreateBlog}
                />
                {blogs.map(blog =>
                    <Blog key={blog.id} blog={blog}/>
                )}
            </div>
    )
}

export default App