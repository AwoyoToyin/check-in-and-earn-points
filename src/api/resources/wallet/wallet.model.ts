import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const WalletSchema = new Schema({
    balance: {
        type: Number,
        required: [true, 'name is required'],
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'person',
    },
}, { timestamps: true });

const Wallet = mongoose.model('wallet', WalletSchema);

export default Wallet;
