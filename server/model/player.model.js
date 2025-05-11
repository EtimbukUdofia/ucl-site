import mongoose from "mongoose";

const { Schema } = mongoose;

const playerSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },

    age: {
      type: Number,
      required: true,
    },

    height: String,

    weight: String,

    position: {
      type: String,
      required: true,
      enum: ["Goalkeeper", "Defender", "Midfielder", "Forward", "Manager"]
    },

    team: {
      type: Schema.Types.ObjectId,
      ref: 'Team',
      required: true,
    },

    appearances: {
      type: Number,
      default: 0,
    },

    saves: {
      type: Number,
      default: 0,
    },

    profile_pic: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);

const Player = mongoose.model("Player", playerSchema);

export default Player;