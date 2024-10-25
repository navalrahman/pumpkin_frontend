import { useEffect, useState } from 'react';
import axios from 'axios';
import Home from '../home/Home';
import { Link, useNavigate } from 'react-router-dom';

const UserProfile = () => {
    const [profile, setProfile] = useState(null)
    const token = sessionStorage.getItem('token')

    const navigate = useNavigate()

    // getting profile details 
    const fetchProfile = async () => {
        if (token) {
            try {
                const response = await axios.get('http://localhost:5000/api/users/profile', {
                    headers: {
                        'Authorization': `Bearer ${token}`, 
                    },
                });
                setProfile(response.data);
            } catch (error) {
                if (error) {
                    sessionStorage.removeItem('token')
                    navigate('/login');
                } else {
                    console.error('Error fetching profile:', error);
                }
            }
        } else {
            navigate('/login');
            console.warn('No token found in sessionStorage');
        }
    };

    useEffect(() => {
        fetchProfile()
    }, [token || !token])

    return (
        <div>
            {profile ? (
                <Home data={profile} />
            ) : (
                <Link to='/login'>Login again</Link>
            )}
        </div>
    );
};

export default UserProfile;
