"use client"
import axios from 'axios';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';

const Crud = () => {
    const [pets, setPets] = useState([]);
    const [selectedPet, setSelectedPet] = useState(null); // State for the selected pet

    const fetchPets = async () => {
        try {
            const res = await axios.get('/api/pets');
            setPets(res.data);
        } catch (error) {
            console.error('Error fetching pets:', error);
        }
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        const update = {
            pet_name: e.target.name.value,
            pet_image: e.target.image.value,
            pet_location: e.target.location.value,
            pet_age: e.target.age.value,
            description: e.target.description.value
        }
        try {
            const res = await axios.put(`/api/update/${selectedPet._id}`, update);
            if (res.status === 200) {
                Swal.fire('Updated!', 'Pet information has been updated.', 'success');
                fetchPets(); // Refresh the pet list
                document.getElementById('my_modal_3').close(); // Close the modal
            }
        } catch (error) {
            console.log(error);

        }
    };

    const handleDelete = async (id) => {
        const confirmation = await Swal.fire({
            title: 'Are you sure?',
            text: 'You won\'t be able to revert this!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        });

        if (confirmation.isConfirmed) {
            try {
                const res = await axios.delete('/api/deletepet', { data: { petId: id } });
                if (res.status === 200) {
                    Swal.fire('Deleted!', 'Pet has been deleted.', 'success');
                    fetchPets(); // Refresh pet list
                } else {
                    Swal.fire('Failed!', 'Could not delete pet. Please try again later.', 'error');
                }
            } catch (error) {
                Swal.fire('Error!', error.response?.data || 'An error occurred while deleting the pet.', 'error');
                console.error('Error deleting pet:', error.response?.data || error.message);
            }
        }
    };

    useEffect(() => {
        fetchPets();
        const intervalId = setInterval(() => {
            fetchPets(); // Fetch pets every 2 seconds
        }, 2000);

        return () => clearInterval(intervalId); // Clear the interval on component unmount
    }, []);

    return (
        <div className='flex justify-center mb-10'>
            <div className='grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3'>
                {
                    pets.map((pet) => (
                        <div key={pet._id}>
                            <div className="card border-2 h-[500px] card-compact bg-base-100 w-96 shadow-xl">
                                <figure>
                                    <img
                                        src={pet.pet_image}
                                        alt={pet.pet_name}
                                        className='w-full h-80'
                                    />
                                </figure>
                                <div className="card-body">
                                    <h2 className="card-title">{pet.pet_name}</h2>
                                    <p>{pet.description}</p>
                                    <div className='flex justify-between py-3'>
                                        <p>Pet Age: {pet.pet_age}</p>
                                        <p>Pet Location: {pet.pet_location}</p>
                                    </div>
                                    <div className='flex justify-between'>
                                        <button onClick={() => handleDelete(pet._id)} className='btn btn-warning'>Delete</button>
                                        <button
                                            className="btn btn-success"
                                            onClick={() => {
                                                setSelectedPet(pet); // Set the selected pet
                                                document.getElementById('my_modal_3').showModal(); // Open the modal
                                            }}
                                        >
                                            Update
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
                }
            </div>

            {/* Update Modal */}
            <dialog id="my_modal_3" className="modal">
                <div className="modal-box">
                    <form onSubmit={handleUpdate}>
                        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" onClick={() => document.getElementById('my_modal_3').close()}>✕</button>
                        <div>
                            <label className="label">Pet Name</label>
                            <input
                                type="text"
                                name="name"
                                defaultValue={selectedPet?.pet_name || ''}
                                className="input input-bordered w-full max"
                                required
                            />
                        </div>
                        <div>
                            <label className="label">Pet Image Url</label>
                            <input
                                type="text"
                                name="image"
                                defaultValue={selectedPet?.pet_image || ''}
                                className="input input-bordered w-full max"
                                required
                            />
                        </div>
                        <div>
                            <label className="label">Pet Age</label>
                            <input
                                type="text"
                                name="age"
                                defaultValue={selectedPet?.pet_age || ''}
                                className="input input-bordered w-full max"
                                required
                            />
                        </div>
                        <div>
                            <label className="label">Pet Location</label>
                            <input
                                type="text"
                                name="location"
                                defaultValue={selectedPet?.pet_location || ''}
                                className="input input-bordered w-full max"
                                required
                            />
                        </div>
                        <div>
                            <label className="label">Description</label>
                            <textarea
                                name="description"
                                defaultValue={selectedPet?.description || ''}
                                className="textarea textarea-bordered w-full max"
                                required
                            />
                        </div>
                        <button className='btn btn-success mt-4' type='submit'>Submit</button>
                    </form>
                </div>
            </dialog>
        </div>
    );
};

export default Crud;
