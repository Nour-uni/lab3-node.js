// EVENT ROUTES
// Define all event endpoints
import express from "express";
import EventController from "../controllers/eventController.js";

const router = express.Router();

// Routes
router.get("/", EventController.getAllEvents);
router.get("/:id", EventController.getEventById);
router.post("/", EventController.createEvent);
router.put("/:id", EventController.updateEvent);
router.delete("/:id", EventController.deleteEvent);

export default router;
