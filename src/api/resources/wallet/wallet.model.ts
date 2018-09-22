import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const WalletSchema = new Schema({
    balance: {
        type: Number,
        default: 1.00,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
    },
}, { timestamps: true });

const Wallet = mongoose.model('wallet', WalletSchema);

export default Wallet;
