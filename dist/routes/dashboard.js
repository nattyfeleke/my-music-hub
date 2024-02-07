"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dashboard_controller_1 = __importDefault(require("../controllers/dashboard.controller"));
const router = express_1.default.Router();
// @route   GET api/dashboard/
// @desc    Get all dashboard/stat
// @access  Public
router.get("/stat", dashboard_controller_1.default.getDashboardStat);
// @route   GET api/dashboard/reports
// @desc    Get # of songs and albums of each artist
// @access  Public
router.get("/reports", dashboard_controller_1.default.getReports);
exports.default = router;
