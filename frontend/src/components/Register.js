import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Register = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const notifyError = () => {
        toast.error("Password do not match! Try again.");
    };

    const notifySuccess = () => {
        toast.success("User registered successfully! Log in");
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if(password !== confirmPassword) {
            notifyError();
            // setError('Password do not match!');
            setMessage('');
            return;
        }

        async function userRegister() {
            try {
                const response = await fetch('http://127.0.0.1:8000/api/register/', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        username,
                        email,
                        password,
                    }),
                });
        
                if (response.ok) {
                    notifySuccess();
                    // setMessage('User registered successfully!');
                    setUsername('');
                    setEmail('');
                    setPassword('');
                    setConfirmPassword('');
                    setError('');
                    navigate('/login');
                } else {
                    setError(`Registration failed: ${response.statusText}`)
                    setPassword('');
                    setConfirmPassword('');
                    setMessage('');
                }
            } catch (error) {
                setError(`Something went wrong! Try again later.`)
                setPassword('');
                setConfirmPassword('');
                setMessage('');
            }
        }
        userRegister(); 
    };

    const resetHandle = () => {
        setUsername('');
        setEmail('');
        setPassword('');
        setConfirmPassword('');
        setMessage('');
        setError('');
    };

    return (
        <div className="container bg-light px-3 py-2">
            <form className="register mt-2" onSubmit={(e) => handleSubmit(e)}>

                {/* Message or Error Section */}
                <div className="text-center mt-3">
                    {message && <div className="alert alert-success">{message}</div>}
                    {error && <div className="alert alert-danger">{error}</div>}
                </div>

                <h3 className="mb-3 text-center">Sign Up</h3>

                <div className="form-group mb-2">
                    <label htmlFor="username">Username</label>
                    <input
                        id="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        type="text"
                        className="form-control"
                        required
                    />
                </div>

                <div className="form-group mb-2">
                    <label htmlFor="email">Email</label>
                    <input
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        type="text"
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

                <div className="form-group">
                    <label htmlFor="confirm-password">Confirm Password</label>
                    <input
                        id="confirm-password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        type="password"
                        className="form-control"
                        required
                    />
                </div>

                <button type="submit" className="btn btn-success my-3 me-2">Sign Up</button>
                <button type="reset" className="btn btn-warning" onClick={resetHandle}>Reset</button>
            </form>
            <p>Already have an account? <a href="/login">Sign In</a></p>
        </div>
    );
};

export default Register;
