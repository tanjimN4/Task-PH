import { connectDB } from "@/lib/connectDb";

export const GET = async (req) => {
    try {
        const db = await connectDB();
        const pets = await db.collection('pets').find().toArray();
        return new Response(JSON.stringify(pets), { status: 200 });
    } catch (error) {
        console.error('Error fetching pets:', error);
        // Return a 500 Internal Server Error response
        return new Response(JSON.stringify({ message: 'Internal Server Error' }), { status: 500 });
    }
};


