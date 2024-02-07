"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMusics = exports.deleteMusic = exports.updateMusic = void 0;
const Music_1 = __importDefault(require("../models/Music"));
const addMusic = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, artist, album, genre } = req.body;
    try {
        const newMusic = new Music_1.default({
            title, artist, album, genre
        });
        yield newMusic.save();
        res.json(newMusic);
    }
    catch (err) {
        console.log(err);
        res.status(500).send("Server Error");
    }
});
const updateMusic = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { title, artist, album, genre } = req.body;
    try {
        const updatedMusic = yield Music_1.default.findById(id);
        if (!updatedMusic) {
            return res.status(400).json({
                errors: [{ msg: "Music doesnot exist" }],
            });
        }
        if (title)
            updatedMusic.title = title;
        if (artist)
            updatedMusic.artist = artist;
        if (album)
            updatedMusic.album = album;
        if (genre)
            updatedMusic.genre = genre;
        yield updatedMusic.save();
        res.json(updatedMusic);
    }
    catch (error) {
        console.log(error);
        if (error && error.kind && error.kind === 'ObjectId') {
            return res.status(400).json({
                msg: 'There is no music with this id',
            });
        }
        res.status(500).json({ error: "Internal server error" });
    }
});
exports.updateMusic = updateMusic;
const deleteMusic = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const deletedMusic = yield Music_1.default.findByIdAndDelete(id);
        res.json(deletedMusic);
    }
    catch (error) {
        console.log(error);
        if (error && error.kind && error.kind === 'ObjectId') {
            return res.status(400).json({
                msg: 'There is no music with this id',
            });
        }
        res.status(500).json({ error: "Internal server error" });
    }
});
exports.deleteMusic = deleteMusic;
const getMusics = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const [musics, genres] = yield Promise.all([Music_1.default.find(), Music_1.default.distinct('genre')]);
        res.json({ musics, genres });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ error: "Internal server error" });
    }
});
exports.getMusics = getMusics;
exports.default = { addMusic, getMusics: exports.getMusics, deleteMusic: exports.deleteMusic, updateMusic: exports.updateMusic };
