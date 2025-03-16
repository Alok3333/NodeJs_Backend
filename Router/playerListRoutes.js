const express = require("express");
const playerListController = require("../Controllers/playerListController");

const router = express.Router();

// Routes
router.get("/hlo", playerListController.getHlo);

router
  .route("/")
  .get(playerListController.getPlayerList)
  .post(playerListController.createNewPlayer);

router
  .route("/:id")
  .get(playerListController.getPlayerWithId)
  .patch(playerListController.updatePlayerWithId)
  .delete(playerListController.deletePlayerWithId);

module.exports = router;
