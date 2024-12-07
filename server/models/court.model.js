import { model, Schema } from "mongoose";

const CourtSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
        },
        centerId: {
            type: Schema.Types.ObjectId,
            ref: "Center",
        },
        sportId: {
            type: Schema.Types.ObjectId,
            ref: "Sport",
        },
    },
    {
        timestamps: true,
    }
);

const Court = model("Court", CourtSchema);

export const insertDefaultCourts = async () => {
    try {
        const Center = (await import('./center.model.js')).Center;
        const Sport = (await import('./sport.model.js')).Sport;

        const centers = await Center.find();
        const sports = await Sport.find();

        if (centers.length === 0 || sports.length === 0) {
            console.error("Centers or sports data is missing. Insert them first.");
            return;
        }

        for (const center of centers) {
            for (const sport of sports) {
                for (let i = 1; i <= 4; i++) {
                    const courtName = `Court ${i}`;
                    const existingCourt = await Court.findOne({
                        name: courtName,
                        centerId: center._id,
                        sportId: sport._id,
                    });

                    if (!existingCourt) {
                        await Court.create({
                            name: courtName,
                            centerId: center._id,
                            sportId: sport._id,
                        });
                        console.log(`Inserted default court: ${courtName}`);
                    }
                }
            }
        }
    } catch (error) {
        console.error("Error inserting default courts:", error);
    }
};

export default Court;
