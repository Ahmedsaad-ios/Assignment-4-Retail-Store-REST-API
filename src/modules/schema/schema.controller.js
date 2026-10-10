import * as schemaService from "./schema.service.js";

const runSchemaOperation = (operation, successMessage) => {
    return async (req, res) => {
        try {
            await operation();

            return res.status(200).json({
                message: successMessage
            });
        } catch (error) {
            return res.status(500).json({
                message: "Schema modification failed",
                error: error.message
            });
        }
    };
};

export const addCategory = runSchemaOperation(
    schemaService.addCategory,
    "Category column added successfully"
);

export const removeCategory = runSchemaOperation(
    schemaService.removeCategory,
    "Category column removed successfully"
);

export const changeContactNumberType = runSchemaOperation(
    schemaService.changeContactNumberType,
    "ContactNumber changed to VARCHAR(15)"
);

export const makeProductNameRequired = runSchemaOperation(
    schemaService.makeProductNameRequired,
    "ProductName changed to NOT NULL"
);