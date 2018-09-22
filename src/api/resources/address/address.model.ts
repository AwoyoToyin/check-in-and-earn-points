import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const AddressSchema = new Schema({
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
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
    },
}, { timestamps: true });

const Address = mongoose.model('address', AddressSchema);

export default Address;
