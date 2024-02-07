import express  from 'express';
import { check } from 'express-validator';
import dashboardController from '../controllers/dashboard.controller';
import { validate } from '../middlewares/validate';
const router = express.Router();

// @route   GET api/dashboard/
// @desc    Get all dashboard/stat
// @access  Public
router.get(
  "/stat",
dashboardController.getDashboardStat )

// @route   GET api/dashboard/reports
// @desc    Get # of songs and albums of each artist
// @access  Public
router.get(
    "/reports",
  dashboardController.getReports )

  export default router