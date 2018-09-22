import mongoose from 'mongoose';
import uniqueValidator from 'mongoose-unique-validator';

const Schema = mongoose.Schema;

const UserSchema = new Schema({
    name: {
        type: String,
        required: [true, 'name is required'],
    },
    username: {
        type: String,
        lowercase: true,
        unique: true,
        required: [true, 'username is required'],
        match: [/^[a-zA-Z0-9]+$/, 'supplied username is invalid'],
        index: true,
    },
    password: {
        required: [true, 'password is required'],
        type: String,
    },
    wallet: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'wallet',
    },
    address: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'address',
    },
    active: {
        type: Boolean,
        default: true,
    },
}, { timestamps: true });

UserSchema.plugin(uniqueValidator, { message: 'is already taken.' });

const User = mongoose.model('user', UserSchema);

export default User;
