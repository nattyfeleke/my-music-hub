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
exports.getReports = exports.getDashboardStat = void 0;
const Music_1 = __importDefault(require("../models/Music"));
const getDashboardStat = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const [totalArtists, totalSongs, totalGenres, totalAlbums] = yield Promise.all([
            (yield Music_1.default.distinct('artist')).length,
            Music_1.default.countDocuments(),
            (yield Music_1.default.distinct('genre')).length,
            (yield Music_1.default.distinct('album')).length
        ]);
        res.json({ stat: { totalArtists, totalAlbums, totalGenres, totalSongs } });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ error: "Internal server error" });
    }
});
exports.getDashboardStat = getDashboardStat;
const getReports = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const [artistsStat, albumsStat, genreStat] = yield Promise.all([Music_1.default.aggregate([
                {
                    $match: {
                        album: { $exists: true, $ne: '' } // Exclude documents where album is not present or is an empty string
                    }
                },
                {
                    $group: {
                        _id: '$artist',
                        songsCount: { $sum: 1 },
                        albumsCount: { $addToSet: '$album' }
                    }
                },
                {
                    $project: {
                        _id: 0,
                        name: '$_id',
                        songsCount: 1,
                        albumsCount: { $size: '$albumsCount' } // Count the number of unique albums
                    }
                }
            ]),
            Music_1.default.aggregate([
                {
                    $group: {
                        _id: '$album',
                        songsCount: { $sum: 1 },
                    },
                },
                {
                    $project: {
                        _id: 0, // Exclude the _id field
                        name: '$_id',
                        songsCount: 1,
                    },
                },
            ]),
            Music_1.default.aggregate([
                {
                    $group: {
                        _id: '$genre',
                        numberOfSongs: { $sum: 1 },
                    },
                },
                {
                    $project: {
                        _id: 0, // Exclude the _id field
                        genre: '$_id',
                        numberOfSongs: 1,
                    },
                },
            ])
        ]);
        const labels = genreStat.map((item) => item.genre);
        const data = genreStat.map((item) => item.numberOfSongs);
        res.json({
            artists: artistsStat,
            albums: albumsStat,
            genre: {
                labels, data
            }
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ error: "Internal server error" });
    }
});
exports.getReports = getReports;
exports.default = { getDashboardStat: exports.getDashboardStat, getReports: exports.getReports };
