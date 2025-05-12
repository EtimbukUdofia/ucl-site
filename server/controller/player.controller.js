import Player from "../model/player.model.js";
import Team from "../model/team.model.js";

export const getAllPlayers = async (req, res) => {
  try {
    const players = await Player.find();

    if (!players.length) {
      return res.status(404).json({ success: false, message: "No player exists in the Database" });
    }
    res.status(200).json(players);
  } catch (error) {
    console.log("Error in getAllPlayers controller:", error.message);
    res
      .status(500)
      .json({ success: false, message: "Failed to fetch players" });
  }
};

export const getPlayerById = async (req, res) => {
  try {
    const id = req.params.id;

    const player = await Player.findById(id).exec();
    if (!player) {
      return res.status(404).json({
        success: false,
        message: `No player exists with the id: ${id}`,
      });
    }

    res.status(200).json(player);
  } catch (error) {
    console.log("Error in getPlayerById controller:", error.message);
    res.status(500).json({ success: false, message: "Failed to fetch player" });
  }
};

export const addPlayer = async (req, res) => {
  try {
    const { name, age, position, team } = req.body;
    if (!name || !age || !position || !team) {
      return res
        .status(400)
        .json({
          success: false,
          message: "A valid name, age, position and team must be provided!!!",
        });
    }

    const availalbleTeam = await Team.findOne({ name: team });
    if (!availalbleTeam) {
      return res
        .status(404)
        .json({
          success: false,
          message: `No team exists with the team name: ${team}`,
        });
    }

    req.body.team = availalbleTeam._id;

    const newPlayer = await Player.create(req.body);
    newPlayer = await newPlayer.populate("team");

    res.status(200).json(newPlayer);
  } catch (error) {
    console.log("Error in addPlayer controller:", error.message);
    res.status(500).json({ success: false, message: "Failed to add player" });
  }
};

export const updatePlayer = async (req, res) => {
  try {
    const id = req.params.id;

    const updatedPlayer = await Player.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!updatedPlayer) {
      return res
        .status(404)
        .json({ success: false, message: `Player not found with ID: ${id}` });
    }
    res.status(200).json({
      success: true,
      message: `Player updated successfully`,
      updatedPlayer,
    });
  } catch (error) {
    console.log("Error in updatePlayer controller:", error.message);
    res
      .status(500)
      .json({ success: false, message: "Failed to update player" });
  }
};

export const deletePlayer = async (req, res) => {
  try {
    const id = req.params.id;

    const deletedPlayer = await Player.findByIdAndDelete(id);

    if (!deletedPlayer) {
      return res
        .status(404)
        .json({ success: false, message: `Player not found with ID: ${id}` });
    }
    res
      .status(200)
      .json({
        success: true,
        message: `Player deleted successfully`,
        deletedPlayer,
      });
  } catch (error) {
    console.log("Error in deletePlayer controller:", error.message);
    res
      .status(500)
      .json({ success: false, message: "Failed to delete player" });
  }
};
