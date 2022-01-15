import mongoose, { Schema, Model, Document } from 'mongoose';


type UserDocument = Document & {
  username: string;
  email: string;
  password: string;
  useLocation: boolean;
  myEvents: number[];
  suggestedEvents: Array<{
      suggester: string;
      eventId: number;
  }>;
};

type UserInput = {
  username: UserDocument['username'];
  email: UserDocument['email'];
  password: UserDocument['password'];
  useLocation: UserDocument['useLocation'];
  myEvents: UserDocument['myEvents'];
  suggestedEvents: UserDocument['suggestedEvents'];
};

const usersSchema = new Schema(
  {
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
            type: Schema.Types.ObjectId,
            required: false
        },
        eventId: {
            type: Schema.Types.Number,
            required: false
        },
    }]
  },
  {
    collection: 'users',
    timestamps: true
  }
);

const User: Model<UserDocument> = mongoose.model<UserDocument>('User', usersSchema);

export { User, UserInput, UserDocument };