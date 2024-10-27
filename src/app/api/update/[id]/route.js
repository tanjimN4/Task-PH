import { connectDB } from "@/lib/connectDb";
import { ObjectId } from "mongodb";
import { NextResponse } from "next/server";

export const PUT = async (req,{params}) => {
    const db = await connectDB(); // Ensure you await the connection
    const collection = db.collection('pets');
    const { id } = await params;
    // console.log(id);
    
    const { pet_name, description, pet_age, pet_location, pet_image } =await req.json();
    console.log(pet_name);
    
    try {
        // Update the pet in the database
        const result = await collection.updateOne(
            { _id: new ObjectId(id) }, // Filter by pet ID
            { $set: { pet_name, description, pet_age, pet_location, pet_image } } // Set the new values
        );

        // Check if the update was successful
        if (result.matchedCount === 0) {
            return NextResponse.json({ message: 'Pet not found' }, { status: 404 });
        }

        // Return the updated pet information
        return NextResponse.json({ message: 'Pet updated successfully', updatedFields: { pet_name, description, pet_age, pet_location, pet_image } }, { status: 200 });
    } catch (error) {
        console.error('Error updating pet:', error);
        return NextResponse.json({ message: 'Server error', error: error.message }, { status: 500 });
    }
}