import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios';

const Login = () => {

    const [data, setData] = useState({
        email: '',
        password: ''
    })

    const navigate = useNavigate()

    // login a user
    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            const response = await axios.post('http://localhost:5000/api/users/login', data);
            console.log('successful', response);
            sessionStorage.setItem('token', response?.data?.token)
            sessionStorage.setItem('email', response?.data?.email)
            sessionStorage.setItem('role', response?.data?.role)
            sessionStorage.setItem('username', response?.data?.username)
            navigate('/')
            window.location.reload()
        } catch (error) {
            console.log(error);
            alert(error.response.data)
        }
    }

    


    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-500 to-purple-600">
            <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
                <form onSubmit={handleSubmit}>
                    <div className="mb-6">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">Email</label>
                        <input
                            type="text"
                            id="email"
                            placeholder="Enter email"
                            value={data.email}
                            onChange={(e) => setData({
                                ...data, email: e.target.value
                            })}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <div className="mb-6">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            placeholder="Enter password"
                            value={data.password}
                            onChange={(e) => setData({
                                ...data, password: e.target.value
                            })}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-300"
                    >
                        Login
                    </button>
                    <div>
                        <p>Not Registered please <Link to={'/signup'} className='hover:bg-slate-400'>Register here</Link></p>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Login
