import { model, Schema } from "mongoose";

const SportSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
            unique: true,
        },
    },
    {
        timestamps: true,
    }
);

const Sport = model("Sport", SportSchema);

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
            insertedSports.push(existingSport);
        }

        return insertedSports;
    } catch (error) {
        console.error("Error inserting default sports:", error);
        throw error;
    }
};

export { Sport, insertDefaultSports };
