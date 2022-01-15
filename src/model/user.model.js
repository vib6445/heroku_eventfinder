import mongoose, { Schema } from 'mongoose';
const usersSchema = new Schema({
    username: {
        type: Schema.Types.String,
        required: true
    },
    email: {
        type: Schema.Types.String,
        required: true,
        unique: true
    },
    password: {
        type: Schema.Types.String,
        required: true
    },
    useLocation: {
        type: Schema.Types.Boolean,
        default: false
    },
    myEvents: {
        type: [Schema.Types.String],
        required: false
    },
    suggestedEvents: [{
            suggester: {
                type: Schema.Types.String,
                required: false
            },
            eventId: {
                type: Schema.Types.Number,
                required: false
            },
        }]
}, {
    collection: 'users',
    timestamps: true
});
const User = mongoose.model('User', usersSchema);
export { User };
