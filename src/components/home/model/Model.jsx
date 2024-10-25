import React from 'react'

const Model = ({ data, isModalOpen, openModal, setIsModalOpen, handleFileUpload, datas, closeModal, setDatas, tripData }) => {
    return (
        <div>
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                <div className="bg-white w-full max-w-md p-6 rounded-lg shadow-lg">
                    <h3 className="text-xl font-bold text-gray-800 mb-4">Upload Details</h3>
                    <form onSubmit={handleFileUpload}>
                        <div className="mb-4">
                            <label className="block text-gray-700 font-semibold mb-2">Trip Name</label>
                            <input
                                type="text"
                                value={datas.tripName}
                                onChange={(e) => setDatas({ ...datas, tripName: e.target.value })}
                                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="Enter trip name"
                            />
                        </div>

                        <div className="mb-4">
                            <label className="block text-gray-700 font-semibold mb-2">Upload File</label>
                            <input
                                type="file"
                                name='file'
                                accept=".csv"
                                onChange={(e) => {
                                    const file = e.target.files[0];
                                    if (file) {
                                        setDatas({ ...datas, csvData: file });
                                    } else {
                                        alert("Please upload a valid CSV file.");
                                    }
                                }}
                                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>

                        <div className="flex justify-end space-x-4">
                            <button
                                type="button"
                                onClick={closeModal}
                                className="bg-gray-400 hover:bg-gray-500 text-white font-semibold py-2 px-4 rounded-lg"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg"
                            >
                                Save
                            </button>
                        </div>
                    </form>
                </div>
            </div>

        </div>
    )
}

export default Model