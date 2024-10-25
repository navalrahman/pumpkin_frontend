import axios from 'axios'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'


const Signup = () => {

    const [data, setData] = useState({
        username: '',
        email: '',
        password: '',
        role: 'user'
    })

    const navigate = useNavigate()

    // registering user
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/api/users/register', data);
            console.log('response', response);

            navigate('/login');
        } catch (error) {
            console.error('Error during registration:', error);
            alert(error.response.data)
        }
    }


    return (
        <div>
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-500 to-purple-600">
                <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
                    <form onSubmit={handleSubmit}>
                        <div className="mb-6">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">User name</label>
                            <input
                                type="text"
                                id="username"
                                placeholder="Enter username"
                                value={data.username}
                                onChange={(e) => setData({
                                    ...data, username: e.target.value
                                })}
                                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                        <div className="mb-6">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">Email</label>
                            <input
                                type="email"
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
                            <p>Already have a account <Link to='/login' className='hover:bg-slate-400'>Login here</Link></p>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Signup