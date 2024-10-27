import { connectDB } from "@/lib/connectDb";

export const POST = async (req) => {
    try {
        const newUser = await req.json(); // Get the user data from the request
        const db = await connectDB('users'); // Connect to the database
        const userCollection = await db.collection('users');
        
        // Check if the user already exists
        const exist = await userCollection.findOne({ email: newUser.email });
        if (exist) {
            return new Response(JSON.stringify({ message: 'User Already Exists' }), { status: 409 });
        }

        // Insert the new user into the database
        await userCollection.insertOne(newUser);
        return new Response(JSON.stringify({ message: 'User Created Successfully' }), { status: 201 });
    } catch (error) {
        console.error(error);
        return new Response(JSON.stringify({ message: 'Server Error' }), { status: 500 });
    }
};

