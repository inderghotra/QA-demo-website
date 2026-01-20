This project is a full-stack QA automation showcase built to demonstrate my hands-on experience with API testing, UI automation, test framework design, and CI-ready execution.

The application simulates a hotel booking system with:
User authentication
Hotel search by city
Booking creation, update, and cancellation
Backend APIs with database integration
Frontend UI for end-to-end flows

I implemented API automation, UI automation, and test execution via CLI, following real-world QA best practices.

Tech Stack
Application
Backend: Node.js, Express
Database: MongoDB
Frontend: HTML, CSS, JavaScript

Automation & Testing
API Automation: Postman, Newman
UI Automation: Playwright (TypeScript)
Assertions: JavaScript
Version Control: Git & GitHub
CLI Execution: Newman, Playwright Test Runner

 Project Structure
qa-demo-website/

├── backend/

 │   ├── models/

 
 │   ├── src/
 
 │   │   ├── controllers/

│   │   ├── routes/

│   │   └── middlewares/

│   └── server.js

│

├── frontend/

│   ├── login.html

│   ├── dashboard.html

│   ├── booking.html

│   ├── app.js

│   └── style.css

│

├── postman/

│   ├── QA-demo-website.postman_collection.json

│   └── QA-demo-local.postman_environment.json

│

├── tests/

│   └── playwright/

│       └── tests/ page/scripts

│
└── README.md

 API Test Coverage (Postman + Newman)

Automated API scenarios include:

✅ User Registration
✅ User Login (JWT-based authentication)
✅ Search Hotels by City
✅ Create Booking
✅ Get All Bookings
✅ Get Booking by ID
✅ Update Booking
✅ Cancel Booking

❌ Negative scenarios (Unauthorized, missing fields)

Run API Tests via CLI
newman run postman/QA-demo-website.postman_collection.json \
  -e postman/QA-demo-local.postman_environment.json


✔ Assertions validate status codes, response structure, and business logic

UI Automation (Playwright)

Automated end-to-end booking flow:
Login
City & hotel selection
Guest details entry
Booking confirmation
Validation of UI state
Negative test scenarios 

Run UI Tests
npx playwright test

Features:
Cross-browser ready
Reliable selectors
Async-safe waits
Clean, maintainable test structure

Environment Configuration
Create a .env file inside backend/:

PORT=4000
MONGO_URI=mongodb://127.0.0.1:27017/qa-demo
JWT_SECRET=your_secret_key


⚠️ .env is ignored from Git for security reasons
