// TEST API ENDPOINTS
// Run: node test-api.js
import http from "http";

// Helper function to make requests
function makeRequest(method, path, data = null) {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: "localhost",
      port: 3000,
      path: path,
      method: method,
      headers: {
        "Content-Type": "application/json"
      }
    };

    const req = http.request(options, (res) => {
      let body = "";
      res.on("data", (chunk) => body += chunk);
      res.on("end", () => {
        try {
          resolve({
            status: res.statusCode,
            body: JSON.parse(body)
          });
        } catch (e) {
          resolve({
            status: res.statusCode,
            body: body
          });
        }
      });
    });

    req.on("error", (e) => {
      console.error(`Problem with request: ${e.message}`);
      reject(e);
    });

    if (data) {
      req.write(JSON.stringify(data));
    }
    req.end();
  });
}

// Test all endpoints
async function testAPI() {
  console.log("═══════════════════════════════════════");
  console.log(" TESTING EVENT MANAGER API");
  console.log("═══════════════════════════════════════\n");

  try {
    // Test 1: GET all events
    console.log("1. GET /api/events");
    let result = await makeRequest("GET", "/api/events");
    console.log("   Status:", result.status);
    console.log("   Events Count:", result.body.count, "\n");

    // Test 2: CREATE event
    console.log("2. POST /api/events");
    result = await makeRequest("POST", "/api/events", {
      title: "Docker Masterclass",
      date: "2026-06-01",
      location: "Sfax",
      capacity: 35
    });
    console.log("   Status:", result.status);
    console.log("   Created Event:", result.body.data.title, "\n");

    // Test 3: GET single event
    console.log("3. GET /api/events/1");
    result = await makeRequest("GET", "/api/events/1");
    console.log("   Status:", result.status);
    console.log("   Single Event Title:", result.body.data.title, "\n");

    // Test 4: UPDATE event
    console.log("4. PUT /api/events/1");
    result = await makeRequest("PUT", "/api/events/1", {
      title: "Advanced JavaScript Workshop",
      date: "2026-02-15",
      location: "Sfax",
      capacity: 30
    });
    console.log("   Status:", result.status);
    if (result.body && result.body.data) {
      console.log("   Updated Event Title:", result.body.data.title, "\n");
    } else {
      console.log("   Update failed:", result.body.message, "\n");
    }


    // Test 5: DELETE event
    console.log("5. DELETE /api/events/2");
    result = await makeRequest("DELETE", "/api/events/2");
    console.log("   Status:", result.status);
    console.log("   Deleted Event Name:", result.body.data.title, "\n");

    // Test 6: GET all (verify delete)
    console.log("6. GET /api/events (verification)");
    result = await makeRequest("GET", "/api/events");
    console.log("   Status:", result.status);
    console.log("   Remaining events:", result.body.count, "\n");

    // Test 7: Error handling (invalid data)
    console.log("7. POST /api/events (invalid data)");
    result = await makeRequest("POST", "/api/events", {
      title: "Incomplete Event"
      // Missing: date, location, capacity
    });
    console.log("   Status:", result.status);
    console.log("   Error Message:", result.body.message, "\n");

    // Test 8: 404 error
    console.log("8. GET /api/events/999 (not found)");
    result = await makeRequest("GET", "/api/events/999");
    console.log("   Status:", result.status);
    console.log("   Message:", result.body.message, "\n");

    console.log("═══════════════════════════════════════");
    console.log(" ✅ ALL TESTS COMPLETE!");
    console.log("═══════════════════════════════════════");
  } catch (error) {
    console.error("❌ Test failed:", error.message);
    process.exit(1);
  }
}

// Run tests
console.log("Waiting for server to be ready...\n");
// In a real scenario, we'd wait for the server to be up. 
// For this script, we assume the user starts the server separately or we give it a moment.
setTimeout(testAPI, 1000);
