import React, { useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';
import axios from 'axios';
import TripDetails from './tripdetails/TripDetails';
import Addtrip from './addtrip/Addtrip';

const Home = ({ data }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const token = sessionStorage.getItem('token')
    const decoded = jwtDecode(token)

    const [datas, setDatas] = useState({
        tripName: '',
        csvData: null,
        userID: decoded._id
    });
    const [details, setDetails] = useState([]);
    const [tripData, setTripData] = useState([]);


    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    

    // handling the file upload
    const handleFileUpload = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('file', datas.csvData);
        formData.append('userId', datas.userID);
        formData.append('tripName', datas.tripName);

        for (let [key, value] of formData.entries()) {
            console.log(`${key}: ${value}`);
        }

        try {
            const response = await axios.post('http://localhost:5000/api/users/tripdata', formData, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });

            if (response.status === 200) {
                closeModal();
                fetchTrip();
            }
        } catch (error) {
            console.error('Error uploading file:', error);
        }
    };


    // fetching the trip details
    const fetchTrip = async () => {
        if (token) {
            try {
                const response = await axios.get('http://localhost:5000/api/users/tripdetails', {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                });
                setTripData(response.data);
            } catch (error) {
                console.error('Error fetching trip data:', error);
            }
        } else {
            console.warn('No token found in sessionStorage');
        }
    };

    useEffect(() => {
        fetchTrip();
    }, [token]);

    return (
        <div>
            {
                tripData.length > 0 ? (
                    <TripDetails
                        data={data}
                        isModalOpen={isModalOpen}
                        setIsModalOpen={setIsModalOpen}
                        openModal={openModal}
                        handleFileUpload={handleFileUpload}
                        datas={datas}
                        setDatas={setDatas}
                        closeModal={closeModal}
                        details={details}
                        setDetails={setDetails}
                        tripData={tripData}
                    />
                ) : (
                    <Addtrip
                        data={data}
                        isModalOpen={isModalOpen}
                        setIsModalOpen={setIsModalOpen}
                        openModal={openModal}
                        handleFileUpload={handleFileUpload}
                        datas={datas}
                        setDatas={setDatas}
                        closeModal={closeModal}
                    />
                )
            }
        </div>
    );
};

export default Home;
