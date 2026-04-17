// EXPRESS SERVER WITH MVC STRUCTURE
import express from "express";
import eventRoutes from "./src/routes/eventRoutes.js";
import {
  logger,
  validateEventInput,
  measureTime,
  errorHandler
} from "./src/middleware.js";

const app = express();
const PORT = 3000;

// ===== GLOBAL MIDDLEWARE =====
app.use(express.json()); // Parse JSON bodies
app.use(logger);         // Log every request
app.use(measureTime);    // Measure response time

// ===== ROUTES =====
// Root route
app.get("/", (req, res) => {
  res.json({
    message: "🎉 Event Manager API (MVC Structure)",
    version: "1.0.0",
    endpoints: {
      getAllEvents: "GET /api/events",
      getEvent: "GET /api/events/:id",
      createEvent: "POST /api/events",
      updateEvent: "PUT /api/events/:id",
      deleteEvent: "DELETE /api/events/:id",
      health: "GET /health"
    }
  });
});

// Validation middleware for POST/PUT on events
const validateEvent = (req, res, next) => {
  if (req.method === "POST" || req.method === "PUT") {
    // Check if the path is exactly '/' (relative to /api/events) or matches an ID
    // In this simple setup, we'll just check the method
    validateEventInput(req, res, next);
  } else {
    next();
  }
};

// Mount event routes
app.use("/api/events", validateEvent, eventRoutes);

// Health check
app.get("/health", (req, res) => {
  res.json({
    status: "✅ healthy",
    uptime: process.uptime().toFixed(2) + "s",
    timestamp: new Date().toISOString()
  });
});

// 404 handler (must be last route)
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: `Not found: ${req.method} ${req.path}`
  });
});

// Error handler (must be last middleware)
app.use(errorHandler);

// ===== START SERVER =====
app.listen(PORT, () => {
  console.log(`\n✅ Event Manager API (MVC) started!`);
  console.log(`📍 http://localhost:${PORT}`);
  console.log(`\n🏗 Architecture: Model-View-Controller`);
  console.log(` Models/      → Data operations`);
  console.log(` Controllers/ → Business logic`);
  console.log(` Routes/      → API endpoints\n`);
});
