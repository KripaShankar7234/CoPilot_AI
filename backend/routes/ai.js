const express = require('express');
const router = express.Router();
const aiController = require('../controllers/aiController');

// Define routes for various AI features
router.post('/chat', aiController.handleChat);
router.post('/code', aiController.handleCoding);
router.post('/study', aiController.handleStudy);
router.post('/hackathon', aiController.handleHackathon);
router.post('/project-plan', aiController.handleProjectPlan);
router.post('/general', aiController.handleGeneral);

module.exports = router;
