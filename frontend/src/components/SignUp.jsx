import { useEffect, useState } from 'react';
import '../style/addtask.css';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import { apiRequest } from '../utils/api';

import Loader from '../components/Loader';

function SignUp() {
    const [userData, setUserData] = useState();
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();


    useEffect(() => {
        if (localStorage.getItem('login')) {
            navigate("/")
        }
    })

    const handleSignup = async () => {
        console.log(userData)
        setLoading(true);
        try {
            const result = await apiRequest('/signup', {
                method: 'POST',
                body: JSON.stringify(userData),
            });

            if (result.success) {
                console.log(result);
                document.cookie = "token=" + result.token
                localStorage.setItem('login', userData.email);
                toast.success("Signup successful");
                navigate("/")
            } else {
                toast.error("Signup failed");
            }
        } catch (error) {
            toast.error("Signup error");
        } finally {
            setLoading(false);
        }
    }


    return (
        <>
            {loading && <Loader />}
            <div className="container">
                <h1>Sign Up</h1>
                <label htmlFor="">Name</label>
                <input
                    onChange={(event) => setUserData({ ...userData, name: event.target.value })}
                    type="text" name="name" placeholder="Enter user name" />

                <label htmlFor="">Email</label>
                <input
                    onChange={(event) => setUserData({ ...userData, email: event.target.value })}
                    type="text" name="email" placeholder="Enter user email" />

                <label htmlFor="">Password</label>
                <input
                    onChange={(event) => setUserData({ ...userData, password: event.target.value })}
                    type="text" name="password" placeholder="Enter user password" />

                <button onClick={handleSignup} className="submit">Sign Up</button>
                <Link className='link' to="/login">Login</Link>

            </div>
        </>
    )
}

export default SignUp;