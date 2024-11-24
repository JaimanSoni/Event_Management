const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  name: String,
  startsOn: Date,
  endsOn: Date,
  amount:Number,
  eventType: String,
  eventMode: String,
  venue:String,
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  venueDetails: {
    description: String,
    keywords: [String],
    website: String,
    expectedSpeakers: [String],
    expectedParticipants: Number
  },
  tickets: [{
    type: String,
    price: Number,
    description: String
  }],
  image: String, // Store the image URL or filename here
}, { timestamps: true });

module.exports = mongoose.model('Event', eventSchema);
