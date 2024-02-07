"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const express_validator_1 = require("express-validator");
const music_controller_1 = __importDefault(require("../controllers/music.controller"));
const validate_1 = require("../middlewares/validate");
const router = express_1.default.Router();
// @route   POST api/music/
// @desc    Add music
// @access  Public
router.post("/", (0, express_validator_1.check)('title', 'title is required').not().isEmpty(), (0, express_validator_1.check)('artist', 'artist is required').not().isEmpty(), (0, express_validator_1.check)('album', 'album is required').not().isEmpty(), (0, express_validator_1.check)('genre', 'genre is required').not().isEmpty(), validate_1.validate, music_controller_1.default.addMusic);
// @route   GET api/music/
// @desc    Get all musics
// @access  Public
router.get("/", music_controller_1.default.getMusics);
// @route   PUT api/music/:id
// @desc    Update a music by id
// @access  Public
router.put("/:id", music_controller_1.default.updateMusic);
// @route   DEETE api/music/:id
// @desc    Delete a music by id
// @access  Public
router.delete("/:id", music_controller_1.default.deleteMusic);
exports.default = router;
