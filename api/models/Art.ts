import mongoose, {Schema, Types} from "mongoose";
import User from "./User";

const ArtSchema = new mongoose.Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        validate: {
            validator: async (value: Types.ObjectId) => {
                const user = await User.findById(value);
                return Boolean(user);
            },
            message: 'User does not exist!',
        },
    },
    name: {
        type: String,
        required: true,
    },
    photo: {
        type: String,
        required: true,
    },
});

const Art = mongoose.model('Art', ArtSchema);
export default Art;