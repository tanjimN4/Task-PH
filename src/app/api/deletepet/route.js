
import { connectDB } from '@/lib/connectDb';
import { ObjectId } from 'mongodb';

export const DELETE = async (req) => {
    try {
        const db = await connectDB();
        
        // Parse petId from the request body
        const { petId } = await req.json();
        
        if (!petId) {
            return new Response('Pet ID is required', { status: 400 });
        }

        // Delete the pet with the specified ID
        const result = await db.collection('pets').deleteOne({ _id: new ObjectId(petId) });

        if (result.deletedCount === 1) {
            return new Response('Pet successfully deleted', { status: 200 });
        } else {
            return new Response('Pet not found', { status: 404 });
        }
    } catch (error) {
        console.error('Error deleting pet:', error);
        return new Response('Failed to delete pet', { status: 500 });
    }
};
