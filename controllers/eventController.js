const Event = require('../models/Event');

exports.getEvents = async (req, res) => {
  try {
    console.log('Fetching all events');
    const events = await Event.find().sort({ start: 1 });
    console.log('Found events:', events);
    res.json(events);
  } catch (error) {
    console.error('Error fetching events:', error);
    res.status(500).json({ error: 'Failed to fetch events' });
  }
};

exports.createEvent = async (req, res) => {
  try {
    console.log('Creating event with data:', req.body);
    const event = new Event(req.body);
    await event.save();
    console.log('Created event:', event);
    res.json(event);
  } catch (error) {
    console.error('Error creating event:', error);
    res.status(500).json({ error: 'Failed to create event' });
  }
};

exports.updateEvent = async (req, res) => {
  try {
    console.log('Updating event:', req.params.id, 'with data:', req.body);
    const updated = await Event.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!updated) {
      return res.status(404).json({ error: 'Event not found' });
    }
    console.log('Updated event:', updated);
    res.json(updated);
  } catch (error) {
    console.error('Error updating event:', error);
    res.status(500).json({ error: 'Failed to update event' });
  }
};

exports.deleteEvent = async (req, res) => {
  try {
    console.log('Deleting event:', req.params.id);
    const deleted = await Event.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ error: 'Event not found' });
    }
    console.log('Deleted event:', deleted);
    res.json({ success: true, id: req.params.id });
  } catch (error) {
    console.error('Error deleting event:', error);
    res.status(500).json({ error: 'Failed to delete event' });
  }
};
