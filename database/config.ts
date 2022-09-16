import mongoose from "mongoose";

export const dbConnection = async () => {
    const dbUrl = process.env.MONGODB_CNN || '';
    
    try {
        await mongoose.connect(dbUrl);
        console.log('DB Online');
    } catch (error) {
        console.log(error);
        throw new Error('Error a la hora de iniciar la BD ver logs');
    }
}
