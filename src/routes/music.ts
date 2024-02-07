import express  from 'express';
import { check } from 'express-validator';
import musicController from '../controllers/music.controller';
import { validate } from '../middlewares/validate';
import Music from '../models/Music';
const router = express.Router();

// @route   POST api/music/
// @desc    Add music
// @access  Public
router.post(
    "/",
    check('title', 'title is required').not().isEmpty(),
    check('artist', 'artist is required').not().isEmpty(),
    check('album', 'album is required').not().isEmpty(),
    check('genre', 'genre is required').not().isEmpty(),
      validate,
musicController.addMusic
    
  )
// @route   GET api/music/
// @desc    Get all musics
// @access  Public
router.get(
  "/",
musicController.getMusics 
)
// @route   PUT api/music/:id
// @desc    Update a music by id
// @access  Public
router.put(
  "/:id",
musicController.updateMusic
  
)
// @route   DEETE api/music/:id
// @desc    Delete a music by id
// @access  Public
router.delete(
  "/:id",
musicController.deleteMusic
  
)


  export default router