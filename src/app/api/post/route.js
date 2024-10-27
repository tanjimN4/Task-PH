import { connectDB } from "@/lib/connectDb";

export const POST = async (req) => {
    try {
        const db = await connectDB(); // Ensure you await the connection
        const collection = db.collection('pets');

        const body = await req.json(); // Parse the incoming request body
        const { pet_name, pet_image, pet_location, pet_age, description } = body;

        // Create a new post object
        const newPost = {
            pet_name,
            pet_image,
            pet_location,
            pet_age,
            description,
            createdAt: new Date(), // Optional: Add a timestamp
        };

        // Insert the new post into the database
        const result = await collection.insertOne(newPost);

        // Return a success response
        return new Response(
            JSON.stringify({
                success: true,
                message: 'Pet added successfully!',
                postId: result.insertedId,
            }),
            {
                status: 201,
                headers: {
                    'Content-Type': 'application/json',
                },
            }
        );
    } catch (error) {
        console.error('Error adding pet:', error); // Log the error
        return new Response(
            JSON.stringify({
                success: false,
                message: 'Failed to add pet.',
                error: error.message,
            }),
            {
                status: 500,
                headers: {
                    'Content-Type': 'application/json',
                },
            }
        );
    }
};
