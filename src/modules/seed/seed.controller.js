import { seedDatabase } from "./seed.service.js";

export const runSeed = async (req, res) => {
    try {
        const result = await seedDatabase();

        return res.status(200).json({
            message: "Database seed completed successfully",
            data: result
        });
    } catch (error) {
        return res.status(500).json({
            message: "Failed to seed database",
            error: error.message
        });
    }
};