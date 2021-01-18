import React, {useState, useEffect, useRef} from 'react'
import Blog from './components/Blog'
import LoginForm from "./components/LoginForm.js";
import blogService from './services/blogs'
import loginService from "./services/login.js";
import BlogForm from "./components/BlogForm.js";
import Notification from "./components/Notification.js";
import Togglable from "./components/Togglable.js";

const App = () => {
    const [blogs, setBlogs] = useState([])
    const [user, setUser] = useState(null)
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [notification, setNotification] = useState({message: '', isError: false})
    const newBlogRef = useRef(null)

    /**
     * @param message is error if error is true, else just message
     * @param isError is true if notifies about error
     * */
    const notify = (message, isError = false) => {
        console.log(message)
        setNotification({message, isError})
        setTimeout(() => setNotification({message: '', isError: false}), 5000)
    }

    useEffect(() => {
        blogService.getAll().then(blogs =>
            setBlogs(blogs)
        )
    }, [])

    const fetchUserFromStorage = () => {
        const json_user = window.localStorage.getItem("blogAppUser")
        const user = JSON.parse(json_user)
        setUser(user)
        if (user && user.token) {
            blogService.setToken(user.token)
        }
    }
    useEffect(fetchUserFromStorage, [])  // dependencies [] - effect is executed only when the component is rendered for the first time

    const handleLogin = async (e) => {
        e.preventDefault()  // dont refresh page after form submit
        try {
            const user = await loginService.login({username, password})
            window.localStorage.setItem('blogAppUser', JSON.stringify(user))
            blogService.setToken(user.token)
            setUser(user)
            setUsername('')
            setPassword('')
            notify('Login successful')
            console.log(user)
        } catch (e) {
            notify(e, true)
        }
    }

    const handleLogOut = () => {
        try {
            window.localStorage.removeItem('blogAppUser')
            setUser(null)
            notify('Logout successful')
        } catch (e) {
            notify(e, true)
        }

    }

    const handleCreateBlog = async (newBlog) => {
        try {
            const blog = await blogService.createBlog(newBlog)
            setBlogs(blogs.concat(blog))
            notify(`Created: ${newBlog.title}`)
            newBlogRef.current.toggleVisibility()
        } catch (e) {
            notify(e, true)
        }
    }

    const handleUpdateBlog = async (blog) => {
        try {
            const result = await blogService.updateBlog(blog)
            setBlogs(blogs.map(b => b.id === result.id ? result : b))
        } catch (e) {
            notify(e, true)
        }
    }
    return (
        <div>
            <Notification {...notification}/>
            {(user === null) ?
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
                    <Togglable buttonLabel={'new blog'} ref={newBlogRef}>
                        <BlogForm handleCreateBlog={handleCreateBlog}/>
                    </Togglable>
                    {blogs.map(blog =>
                        <Blog key={blog.id} blog={blog} handleUpdateBlog={handleUpdateBlog}/>
                    )}
                </div>}
        </div>
    )
}

export default App