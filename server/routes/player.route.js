import express from "express";
import {
  addPlayer,
  deletePlayer,
  getAllPlayers,
  getPlayerById,
  updatePlayer,
} from "../controller/player.controller.js";

const router = express.Router();

router.get("/", getAllPlayers);
router.get("/:id", getPlayerById);

router.post("/", addPlayer);

router.patch("/:id", updatePlayer);

router.delete("/:id", deletePlayer);

export default router;
