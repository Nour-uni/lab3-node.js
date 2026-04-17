// EVENT CONTROLLER
// Handles business logic and routing
import Event from "../models/Event.js";

export class EventController {
  // GET all events
  static getAllEvents(req, res) {
    try {
      const events = Event.getAll();
      res.json({
        success: true,
        count: events.length,
        data: events
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message
      });
    }
  }

  // GET single event
  static getEventById(req, res) {
    try {
      const { id } = req.params;
      const event = Event.getById(id);
      if (!event) {
        return res.status(404).json({
          success: false,
          message: `Event ${id} not found`
        });
      }
      res.json({
        success: true,
        data: event
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message
      });
    }
  }

  // CREATE new event
  static createEvent(req, res) {
    try {
      const { title, date, location, capacity } = req.body;
      const newEvent = Event.create({
        title,
        date,
        location,
        capacity
      });
      res.status(201).json({
        success: true,
        message: "Event created successfully",
        data: newEvent
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        message: error.message
      });
    }
  }

  // UPDATE event
  static updateEvent(req, res) {
    try {
      const { id } = req.params;
      const updatedEvent = Event.update(id, req.body);
      if (!updatedEvent) {
        return res.status(404).json({
          success: false,
          message: `Event ${id} not found`
        });
      }
      res.json({
        success: true,
        message: "Event updated successfully",
        data: updatedEvent
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        message: error.message
      });
    }
  }

  // DELETE event
  static deleteEvent(req, res) {
    try {
      const { id } = req.params;
      const deletedEvent = Event.delete(id);
      if (!deletedEvent) {
        return res.status(404).json({
          success: false,
          message: `Event ${id} not found`
        });
      }
      res.json({
        success: true,
        message: "Event deleted successfully",
        data: deletedEvent
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message
      });
    }
  }
}

export default EventController;
