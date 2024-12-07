import {model, Schema} from 'mongoose';
const BookingSchema = new Schema({
    user: {
        type: String,
        required: true
    },
    court: {
        type: Schema.Types.ObjectId,
        ref: 'Court',
        required: true
    },
    startTime: {
        type: Date,
        required: true
    },
    endTime: {
        type: Date,
        required: true
    },
},{
    timestamps: true
})
export default model('Booking', BookingSchema);
