import axios from 'axios';
import React from 'react';
import Swal from 'sweetalert2';

const Post = () => {

    
    const handleSubmit=async(e)=>{
         e.preventDefault();
         const newPost={
            pet_name:e.target.name.value,
            pet_image:e.target.image.value,
            pet_location:e.target.location.value,
            pet_age:e.target.age.value,
            description:e.target.description.value
         }
         try {
            const response = await axios.post('/api/post', newPost, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            console.log(response.data); // Display the response from the server

            // Show success alert
            await Swal.fire({
                title: 'Success!',
                text: 'Pet added successfully!',
                icon: 'success',
                confirmButtonText: 'Okay',
            });

            // Optionally reset the form
            e.target.reset();
        } catch (error) {
            console.error('Error:', error);
            
            // Show error alert
            await Swal.fire({
                title: 'Error!',
                text: error.response?.data?.message || 'An error occurred while adding the pet.',
                icon: 'error',
                confirmButtonText: 'Try Again',
            });
        }
         
    }
    return (
        <div className='text-black'>
            <h1 className='text-2xl text-center pt-2 font-extrabold'>Post Product</h1>
            <div className="border-2 rounded-xl p-5 md:p-8 mt-5 bg-gray-50 max-w-3xl mx-auto">
                <form onSubmit={handleSubmit}>
                    <div className="grid gap-4 md:grid-cols-2">
                        <div className="flex flex-col">
                            <label className="text-sm font-medium text-gray-700 mb-1">
                                Pet Name
                            </label>
                            <input
                                type="text"
                                name='name'
                                className="input bg-white input-bordered w-full focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-lg"
                                placeholder="Enter pet's name"
                            />
                        </div>

                        <div className="flex flex-col">
                            <label className="text-sm font-medium text-gray-700 mb-1">
                                Pet Age
                            </label>
                            <input
                                type="text"
                                name='age'
                                className="input bg-white input-bordered w-full focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-lg"
                                placeholder="Enter pet's age"
                            />
                        </div>

                        <div className="flex flex-col">
                            <label className="text-sm font-medium text-gray-700 mb-1">
                                Pet Image URL
                            </label>
                            <input
                                type="text"
                                name='image'
                                className="input bg-white input-bordered w-full focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-lg"
                                placeholder="Enter image URL"
                            />
                        </div>

                        <div className="flex flex-col">
                            <label className="text-sm font-medium text-gray-700 mb-1">
                                Pet Location
                            </label>
                            <input
                                type="text"
                                name='location'
                                className="input bg-white input-bordered w-full focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-lg"
                                placeholder="Enter location"
                            />
                        </div>
                    </div>

                    <div className="mt-4">
                        <label className="text-sm font-medium text-gray-700 mb-1">
                            Pet Description
                        </label>
                        <textarea
                             name='description'
                            className="input bg-white input-bordered w-full focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-lg h-28"
                            placeholder="Enter a brief description of the pet"
                        ></textarea>
                    </div>

                    <div className="mt-6 flex justify-end">
                        <button
                            type="submit"
                            className="px-6 py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition duration-300"
                        >
                            Submit
                        </button>
                    </div>
                </form>
            </div>

        </div>
    );
};

export default Post;