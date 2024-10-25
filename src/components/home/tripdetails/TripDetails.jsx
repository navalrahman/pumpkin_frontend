import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Model from '../model/Model';
import { useNavigate } from 'react-router-dom';

const TripDetails = ({ data, isModalOpen, openModal, setIsModalOpen, handleFileUpload, datas, closeModal, setDatas }) => {
    const [tripData, setTripData] = useState([])
    const [currentPage, setCurrentPage] = useState(1)
    const [totalTrips, setTotalTrips] = useState(0)
    const [selectedTrips, setSelectedTrips] = useState([])

    const navigate = useNavigate()

    const token = sessionStorage.getItem('token')
    const tripsPerPage = 10;

    // Fetch trips when currentPage changes
    useEffect(() => {
        const fetchTrips = async (page) => {
            try {
                const offset = (page - 1) * tripsPerPage;
                const response = await axios.get(`http://localhost:5000/api/users/trips`, {
                    headers: { Authorization: `Bearer ${token}` },
                    params: { limit: tripsPerPage, skip: offset }
                })
                // console.log(response.data)      
                setTripData(response.data.product)
                setTotalTrips(response.data.total)
            } catch (error) {
                console.error("Error fetching trips", error)
            }
        };

        fetchTrips(currentPage)
    }, [currentPage])

    const totalPages = Math.ceil(totalTrips / tripsPerPage)
    
    const handlePageNumberClick = (pageNum) => {
        setCurrentPage(pageNum)
    }

    const handleNextButtonSet = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1)
        }
    }

    const handlePreviousButtonSet = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1)
        }
    }

    const handleCheckboxChange = (tripId) => {
        setSelectedTrips((prevSelectedTrips) => {
            if (prevSelectedTrips.includes(tripId)) {
                return prevSelectedTrips.filter(id => id !== tripId);
            } else {
                return [...prevSelectedTrips, tripId]
            }
        })
    }

    // deleting trip details
    const handleDeleteTrip = async () => {
        try {
            const response = await axios.delete('http://localhost:5000/api/users/delete', {
                headers: { Authorization: `Bearer ${token}` },
                data: { selectedTrips }
            });
            if (response.status === 200) {
                setTripData((prevTrips) =>
                    prevTrips.filter((trip) => !selectedTrips.includes(trip._id))
                );
            }
            window.location.reload();
        } catch (error) {
            console.error("Error deleting trips", error);
        }
    };

    
    const handleTripsData = async () => {
        if (selectedTrips.length === 1) {
            alert('Please choose two trip');
        } else {
            navigate('/details', { state: { ids: selectedTrips } });
        }
    };

    return (
        <div className="flex flex-col items-center min-h-screen bg-gray-100 px-4 sm:px-6 md:px-8">
            <div className="w-full sm:w-2/3 md:w-1/2 bg-white shadow-md flex items-center justify-center rounded-lg my-4 py-4">
                <h2 className="text-gray-800 text-lg sm:text-xl font-bold">Welcome {data.username}</h2>
            </div>

            <div className="w-full sm:w-2/3 md:w-1/2 bg-white shadow-lg flex flex-col items-center justify-center rounded-lg p-4 mb-4">
                <button
                    onClick={openModal}
                    className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-6 rounded-lg mb-2"
                >
                    Upload
                </button>
                <p className="text-gray-600 text-center">Please upload the required document to proceed.</p>
            </div>

            {isModalOpen && (
                <Model
                    data={data}
                    isModalOpen={isModalOpen}
                    openModal={openModal}
                    setIsModalOpen={setIsModalOpen}
                    handleFileUpload={handleFileUpload}
                    datas={datas}
                    closeModal={closeModal}
                    setDatas={setDatas}
                />
            )}

            <div className="w-full sm:w-2/3 md:w-1/2 bg-white shadow-md flex flex-col items-center justify-start rounded-lg p-6 mb-4">
                <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4">Your Trips</h2>

                <div className="flex flex-col sm:flex-row justify-between w-full items-center mb-4 space-y-2 sm:space-y-0 sm:space-x-2">
                    <button
                        onClick={handleTripsData}
                        className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
                    >
                        Open
                    </button>

                    <button
                        onClick={handleDeleteTrip}
                        className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded"
                    >
                        Delete
                    </button>
                </div>

                <div className="w-full space-y-2">
                    {tripData.map((trip) => (
                        <div
                            key={trip._id}
                            className="flex justify-between items-center py-1"
                        >
                            <div className="flex items-center space-x-2">
                                <input
                                    type="checkbox"
                                    className="mr-2"
                                    checked={selectedTrips.includes(trip._id)}
                                    onChange={() => handleCheckboxChange(trip._id)}
                                />
                                <span className="text-gray-800 text-sm">{trip.tripName}</span>
                            </div>
                        </div>
                    ))}

                    {tripData.length === 0 && (
                        <div className="text-center text-gray-600">No more trips available.</div>
                    )}
                </div>

                <div className="flex justify-center w-full mt-4 items-center">
                    <button
                        onClick={handlePreviousButtonSet}
                        className={`bg-blue-500 text-white py-1 px-2 text-sm rounded-lg mr-2 ${currentPage === 1 ? 'opacity-50 cursor-not-allowed' : ''}`}
                        disabled={currentPage === 1}
                    >
                        &lt; Prev
                    </button>

                    <div className="flex space-x-1">
                        {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
                            <button
                                className={`pagination-button py-1 px-2 text-sm rounded-lg ${currentPage === pageNum ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
                                key={pageNum}
                                onClick={() => handlePageNumberClick(pageNum)}
                            >
                                {pageNum}
                            </button>
                        ))}
                    </div>

                    <button
                        onClick={handleNextButtonSet}
                        className={`bg-blue-500 text-white py-1 px-2 text-sm rounded-lg ml-2 ${currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : ''}`}
                        disabled={currentPage === totalPages}
                    >
                        Next &gt;
                    </button>
                </div>
            </div>
        </div>
    );
};

export default TripDetails