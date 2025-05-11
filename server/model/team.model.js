import mongoose from "mongoose";

const {Schema} = mongoose;

const StadiumSchema = new Schema({
  name: String,
  image: {
    type: String,
    default: "",
  },
  capacity: {
    type: Number,
    default: 0
  }
});

const TeamSchema = new Schema({
  name: {
    type: String,
    required: true,
  },

  stadium: {
    type: StadiumSchema,
  },

  squad_logo: String,

  squad_img: String,

  about: String,

  class: String,

  matches_played: {
    type: Number,
    default: 0,
  },

  goals_scored: {
    type: Number,
    default: 0,
  },

  goals_conceded: {
    type: Number,
    default: 0,
  },

  victories: {
    type: Number,
    default: 0,
  },

  defeats: {
    type: Number,
    default: 0,
  },

  draws: {
    type: Number,
    default: 0,
  },

  eliminated: {
    type: Boolean,
    default: false,
  }
}, {timestamps: true});

const Team = mongoose.model('Team', TeamSchema);

export default Team;