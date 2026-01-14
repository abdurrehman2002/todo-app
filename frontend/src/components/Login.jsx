import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import '../style/addtask.css';
import { toast } from 'react-toastify';

import { apiRequest } from '../utils/api';

import Loader from '../components/Loader';

function Login() {
    const [userData, setUserData] = useState();
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        if (localStorage.getItem('login')) {
            navigate("/")
        }
    })

    const handleLogin = async () => {
        console.log(userData)
        setLoading(true);
        try {
            const result = await apiRequest('/login', {
                method: 'POST',
                body: JSON.stringify(userData),
            });

            if (result.success) {
                console.log(result);
                document.cookie = "token=" + result.token;
                localStorage.setItem('login', userData.email);
                window.dispatchEvent(new Event('localStorage-change'))
                toast.success("Login successful");
                navigate("/")
            } else {
                toast.error("Invalid credentials or server error");
            }
        } catch (error) {
            toast.error("Login failed");
        } finally {
            setLoading(false);
        }
    }


    return (
        <>
            {loading && <Loader />}
            <div className="container">
                <h1>Login</h1>
                <label htmlFor="">Email</label>
                <input
                    onChange={(event) => setUserData({ ...userData, email: event.target.value })}
                    type="text" name="email" placeholder="Enter user email" />

                <label htmlFor="">Password</label>
                <input
                    onChange={(event) => setUserData({ ...userData, password: event.target.value })}
                    type="password" name="password" placeholder="Enter user password" />

                <button onClick={handleLogin} className="submit">Login</button>
                <Link className='link' to="/signup">Sign Up</Link>

            </div>
        </>
    )
}

export default Login;