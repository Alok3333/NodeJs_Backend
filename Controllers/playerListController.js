const PlayerModel = require("../Models/playerListModel");

// GET - Saying hello mom
exports.getHlo = (req, res) => {
  return res.send(`<h1>HLO MOM</h1>`);
};

// GET - Get player lists
exports.getPlayerList = async (req, res) => {
  try {
    let result = await PlayerModel.find();

    if (!result) {
      return res.status(400).json({
        status: "fail",
        message: `Request fails`,
      });
    }

    return res.status(200).json({
      status: "success",
      data: {
        playerlists: result,
      },
    });
  } catch (err) {
    console.log(err, "err from get request");
    return res.status(500).json({
      status: "fail",
      message: "Server error",
    });
  }
};

// GET - Get the single player from list
exports.getPlayerWithId = async (req, res) => {
  try {
    let id = req.params.id;
    let player = await PlayerModel.findById(id);

    if (!player) {
      return res.status(400).json({
        status: "fail",
        message: `Player with this ${id} Not found`,
      });
    }

    return res.status(202).json({
      status: "success",
      data: {
        player: player,
      },
    });
  } catch (err) {
    return res.status(400).json({
      status: "fail",
      message: `Not Found`,
    });
  }
};

// POST - Create new player
exports.createNewPlayer = async (req, res) => {
  try {
    const { name, age, teamName } = req.body;

    if (!name || !age || !teamName) {
      return res.status(400).send("All fields are required");
    }

    let checkName = await PlayerModel.findOne({ name });

    if (checkName) {
      return res.status(400).json({
        status: "fail",
        message: "value already exists",
      });
    }

    let newPlayer = new PlayerModel({
      name: name,
      age: age,
      teamName: teamName,
    });

    await newPlayer.save();

    return res.status(201).json({
      status: "success",
      data: {
        newlist: newPlayer,
      },
    });
  } catch (err) {
    return res.status(500).json({
      status: "fail",
      message: "Internal Server Error",
    });
  }
};

// PATCH - Update the player
exports.updatePlayerWithId = async (req, res) => {
  try {
    let id = req.params.id;
    let updatePlayer = await PlayerModel.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    return res.status(200).json({
      status: "success",
      message: "Player updated.",
      data: {
        updatePlayer: updatePlayer,
      },
    });
  } catch (err) {
    return res.status(500).json({
      status: "fail",
      message: "Server error",
    });
  }
};

// DELETE - Delete the player
exports.deletePlayerWithId = async (req, res) => {
  try {
    let id = req.params.id;
    let deletePlayer = await PlayerModel.findByIdAndDelete(id);

    return res.status(202).json({
      status: "success",
      message: "deleted.",
      data: {
        deletePlayer: deletePlayer,
      },
    });
  } catch (err) {
    return res.status(500).json({
      status: "fail",
      message: "Not deleted server error",
    });
  }
};
