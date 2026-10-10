import dotenv from 'dotenv';
import app from './app.js';
import { initializeDatabase } from './database/init.js';

dotenv.config();

const PORT = process.env.PORT || 3000;

const startServer = async () => {
    try {
        await initializeDatabase();
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    } catch (error) {
        console.error("Failed to start the server:", error.message);
        process.exit(1);
    }
};

startServer();