const express = require('express');
const eventController = require('../controllers/eventController');
const authenticateUser = require('../middleware/authMiddleware');
const upload = require('../config/multer');  // Ensure the path is correct
const router = express.Router();

// Route to create a new event (only accessible to authenticated users)
router.post('/create', authenticateUser, eventController.createEvent);

// Route to update event details (venue, description, tickets, etc.)
router.put('/:eventId/details', authenticateUser, upload.single('image'), eventController.updateEventDetails);
// Route to get all events created by the logged-in user
router.get('/user-events', authenticateUser, eventController.getUserEvents);
// Route to get event by name and ID
router.get('/:eventName/:eventId', authenticateUser , eventController.getEventByNameAndId);
router.delete('/:eventId', authenticateUser, eventController.deleteEvent);

module.exports = router;
