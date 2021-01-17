import React, {useState, useEffect} from 'react'
import Blog from './components/Blog'
import LoginForm from "./components/LoginForm.js";
import blogService from './services/blogs'
import loginService from "./services/login.js";

const App = () => {
    const [blogs, setBlogs] = useState([])
    const [user, setUser] = useState(null)
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')


    useEffect(() => {
        blogService.getAll().then(blogs =>
            setBlogs(blogs)
        )
    }, [])

    const handleLogin = async (e)=>{
        e.preventDefault()  // dont refresh page after form submit
        const user = await loginService.login({username,password})
        setUser(user)
        setUsername('')
        setPassword('')
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
                <p>{user.name} is logged in</p>
                {blogs.map(blog =>
                    <Blog key={blog.id} blog={blog}/>
                )}
            </div>
    )
}

export default App