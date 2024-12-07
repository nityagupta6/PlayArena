import { model, Schema } from "mongoose";

// Define the sport schema
const SportSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
            unique: true, // Ensure sport names are unique
        },
    },
    {
        timestamps: true,
    }
);

const Sport = model("Sport", SportSchema);

// Function to insert default sports
const insertDefaultSports = async () => {
    try {
        const defaultSports = ["Badminton", "Basketball"];
        const insertedSports = [];

        for (const sport of defaultSports) {
            let existingSport = await Sport.findOne({ name: sport });
            if (!existingSport) {
                existingSport = await Sport.create({ name: sport });
                console.log(`Inserted default sport: ${sport}`);
            }
            insertedSports.push(existingSport); // Save references for later use
        }

        return insertedSports;
    } catch (error) {
        console.error("Error inserting default sports:", error);
        throw error;
    }
};

export { Sport, insertDefaultSports };
