import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const CheckInSchema = new Schema({
    formatted: {
        type: String,
        required: [true, 'name is required'],
    },
    longitude: {
        type: String,
        required: [true, 'longitude is required'],
    },
    latitude: {
        type: String,
        required: [true, 'latitude is required'],
    },
    distance: {
        type: Number,
        required: [true, 'distance is required'],
    },
    earning: {
        type: Number,
        required: [true, 'earning is required'],
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'person',
    },
}, { timestamps: true });

const CheckIn = mongoose.model('checkin', CheckInSchema);

export default CheckIn;
