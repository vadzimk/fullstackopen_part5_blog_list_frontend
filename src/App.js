import React, {useState, useEffect} from 'react'
import Blog from './components/Blog'
import LoginForm from "./components/LoginForm.js";
import blogService from './services/blogs'
import loginService from "./services/login.js";
import BlogForm from "./components/BlogForm.js";
import Notification from "./components/Notification.js";

const App = () => {
    const [blogs, setBlogs] = useState([])
    const [user, setUser] = useState(null)
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [newBlog, setNewBlog] = useState({title: '', author: '', url: ''})
    const [notification, setNotification] = useState({message: '', isError: false})

    /**
     * @param message is error if error is true, else just message
     * @param isError is true if notifies about error
     * */
    const notify = (message, isError=false)=>{
        console.log(message)
        setNotification({message, isError})
        setTimeout(()=>setNotification({message: '', isError: false}), 5000)
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
        if (user && user.token){
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
        } catch (e){
            notify(e, true)
        }
    }

    const handleLogOut = () => {
        try {
            window.localStorage.removeItem('blogAppUser')
            setUser(null)
            notify('Logout successful')
        }catch (e){
            notify(e, true)
        }

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
        try {
            const blog = await blogService.createBlog(newBlog)
            setBlogs(blogs.concat(blog))
            setNewBlog({title: '', author: '', url: ''})
            notify('Created')
        } catch (e){
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
                    <BlogForm
                        handleNewBlogChange={handleNewBlogChange}
                        newBlog={newBlog}
                        handleCreateBlog={handleCreateBlog}
                    />
                    {blogs.map(blog =>
                        <Blog key={blog.id} blog={blog}/>
                    )}
                </div>}
        </div>
    )
}

export default App