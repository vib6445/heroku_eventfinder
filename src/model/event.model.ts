/*import mongoose, { Schema, Model, Document } from 'mongoose';

type EventDocument = Document & {
    eventname: string;
    saved: boolean;
    description: string;
    date: string;
    picture: string;
    position: {
      lat: number;
      lng: number;
    },
    category: string;
};

type EventInput = {
  eventname: EventDocument['username'];
  email: EventDocument['email'];
  password: EventDocument['password'];
  useLocation: EventDocument['useLocation'];
};

const eventSchema = new Schema(
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
    }
  },
  {
    collection: 'events',
    timestamps: true
  }
);

const Event: Model<EventDocument> = mongoose.model<EventDocument>('Event', eventSchema);

export { Event, EventInput, EventDocument };*/