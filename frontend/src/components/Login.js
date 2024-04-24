import React from "react";
import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import { UserContext } from "../contexts/userAuthContext";
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const  {handleLogIn } = useContext(UserContext);


    const notifyError = () => {
        toast.error("Invalid username or password! Try again.");
    };

    const notifySuccess = () => {
        toast.success("Logged in successfully!");
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const userLogin = async () => {
            try {
                const response = await fetch('http://127.0.0.1:8000/api/login/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email,
                    password
                }),
            });
            if (response.ok) {
                const data = await response.json();
                const accessToken = data.access;
                const refreshToken = data.refresh;
                const userId = data.user_id;

                localStorage.setItem('accessToken', accessToken);
                localStorage.setItem('refreshToken', refreshToken);
                localStorage.setItem('userId', userId);
                handleLogIn();
                setEmail('');
                setPassword('');
                navigate('/');
                notifySuccess();
                console.log('User logged in!');

            } else {
                console.log('User can not logged in!');
                notifyError();
                }
            }
            catch (error) {
                console.log("Error occured during login: ", error.message)
            }
        };

        userLogin();
    };

    const resetHandle = () => {
        setEmail('');
        setPassword('');
    };

    return (
        <div className="container bg-light px-3 py-2">
            <form className="login mt-2" onSubmit={(e) => handleSubmit(e)}>
                <h3 className="mb-3 text-center">Sign In</h3>

                <div className="form-group mb-2">
                    <label htmlFor="email">Email</label>
                    <input
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        type="email"
                        className="form-control"
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        type="password"
                        className="form-control"
                        required
                    />
                </div>

                <button type="submit" className="btn btn-success my-2 me-2">Login</button>
                <button type="reset" className="btn btn-warning" onClick={resetHandle}>Reset</button>
            </form>
            <p>Don't have an account? <a href="/register">Register</a></p>
        </div>
    );
};

export default Login;
