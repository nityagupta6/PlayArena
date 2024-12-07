import { model, Schema } from "mongoose";

// Define the center schema
const centerSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
        },
        sports: [
            {
                type: Schema.Types.ObjectId,
                ref: "Sport",
            },
        ],
    },
    {
        timestamps: true,
    }
);

const Center = model("Center", centerSchema);

// Function to insert default centers
const insertDefaultCenters = async (sports) => {
    try {
        const defaultCenters = [
            { name: "Koramangala", sports },
            { name: "HSR Layout", sports },
        ];

        for (const centerData of defaultCenters) {
            const existingCenter = await Center.findOne({ name: centerData.name });
            if (!existingCenter) {
                await Center.create(centerData);
                console.log(`Inserted default center: ${centerData.name}`);
            }
        }
    } catch (error) {
        console.error("Error inserting default centers:", error);
    }
};

export { Center, insertDefaultCenters };
