import React from 'react'
import Model from '../model/Model'

const Addtrip = ({ data, isModalOpen, openModal, setIsModalOpen, handleFileUpload, datas, closeModal, setDatas, tripData }) => {
    return (
        <div className="flex flex-col items-center min-h-screen bg-gray-100">
            <div className="w-3/4 h-12vh bg-white shadow-md flex items-center justify-center rounded-lg my-4">
                <h2 className="text-gray-800 text-xl font-bold">Welcome {data.username}</h2>
            </div>

            <div className="w-2/4 h-20vh bg-white shadow-lg flex flex-col items-center justify-center rounded-lg p-4 mb-4">

                <button
                    onClick={openModal}
                    className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-6 rounded-lg mb-2"
                >
                    Upload
                </button>

                <p className="text-gray-600 text-center">
                    Please upload the required document to proceed.
                </p>
            </div>

            {
                isModalOpen && <Model
                    data={data}
                    isModalOpen={isModalOpen}
                    openModal={openModal}
                    setIsModalOpen={setIsModalOpen}
                    handleFileUpload={handleFileUpload}
                    datas={datas}
                    closeModal={closeModal}
                    setDatas={setDatas}
                    tripData={tripData}
                />
            }
        </div>
    )
}

export default Addtrip