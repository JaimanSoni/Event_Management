const Event = require('../models/Event');

// Create a new event
exports.createEvent = async (req, res) => {
  const { name, startsOn, endsOn, amount ,venue ,  eventType, eventMode } = req.body;

  try {
    const newEvent = new Event({
      name,
      startsOn,
      endsOn,
      eventType,
      eventMode,
      amount,
      venue,
      createdBy: req.user._id, // Logged-in user ID
    });

    await newEvent.save();
    res.status(201).json({ success:true,  message: 'Event created successfully', event: newEvent });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success:false ,  message: 'Error creating event' });
  }
};

exports.updateEventDetails = async (req, res) => {
  const { description, keywords, website, expectedSpeakers, expectedParticipants, tickets } = req.body;
  const image = req.file;  // Get the image uploaded

  try {
    const event = await Event.findById(req.params.eventId);

    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }

    if (event.createdBy.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'You are not authorized to update this event' });
    }

    // Save Cloudinary image URL if uploaded
    if (image) {
      event.image = image.path; // Save the Cloudinary URL
    }

    // Save other event details
    event.venueDetails = { description, keywords, website, expectedSpeakers, expectedParticipants };
    event.tickets = tickets;  // Tickets array

    await event.save();
    res.status(200).json({ message: 'Event details updated', event });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error updating event details' });
  }
};

exports.getUserEvents = async (req, res) => {
  try {
    // Fetch all events created by the logged-in user
    const events = await Event.find({ createdBy: req.user._id });

    if (!events || events.length === 0) {
      return res.status(404).json({ success:false ,  message: 'No events found for this user' });
    }

    res.status(200).json({success:true ,message: 'User events fetched successfully', events });
  } catch (error) {
    console.error(error);
    res.status(500).json({success:false ,  message: 'Error fetching user events' });
  }
};
exports.getEventByNameAndId = async (req, res) => {
  const { eventName, eventId } = req.params; // Extracting event name and ID from URL params
  
  try {
    // Find event by its ID and check if it matches the name
    const event = await Event.findOne({ _id: eventId, name: eventName });

    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }

    res.status(200).json({ message: 'Event fetched successfully', event });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching event' });
  }
};


exports.deleteEvent = async (req, res) => {
  try {
    const { eventId } = req.params;

    // Find the event by ID
    const event = await Event.findById(eventId);

    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }

    // Check if the logged-in user is the creator of the event
    if (event.createdBy.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'You are not authorized to delete this event' });
    }

    // Delete the event
    await Event.deleteOne({ _id: eventId });

    res.status(200).json({ message: 'Event deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error deleting event' });
  }
};



