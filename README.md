# **PlayArena**

**College ID**: IEC2021071

## **Project Overview**
PlayArena is a comprehensive booking management system designed for sports technology companies. It facilitates the management of sports facilities across multiple centers, allowing customers to book 60-minute slots for their preferred sports. The system also empowers center managers with tools to efficiently view and manage all bookings.

Link To Report: https://drive.google.com/file/d/1C4OQMaTbT9COYUpcVhs3egb_6QSD1WhG/view?usp=sharing

---

## **Core Features**
- **Multi-Center Support**: Manage bookings across various locations (e.g., Indiranagar, Koramangala).
- **Multiple Sports Per Center**: Centers can host a variety of sports (e.g., badminton, squash).
- **Resource Management**: Each sport can have multiple courts/resources (e.g., badminton has 2 courts, squash has 3 courts).
- **Booking System**:
  - Customers can book 60-minute slots for any available resource.
  - Center managers can view and create bookings, ensuring no double bookings occur.
- **User-Friendly Interface**: A simple UI for seamless navigation and operations management.

---

## **Technical Requirements**

### **Backend**
- **APIs**:
  - **View Bookings API**: Retrieve bookings for a specific center, sport, and date.
  - **Create Booking API**: Add new bookings while ensuring no conflicts.
- **Error Handling**: Basic input validation and error responses.
- **Booking Logic**: Prevent double-booking of slots and resources.
- **Optional Authentication**: Secure APIs with JWT tokens or session-based authentication if needed.

### **Frontend**
- **Booking Management**: Operations team can:
  - Select a center and sport.
  - View bookings for all resources on a selected date.
  - Create new bookings with selected time slots and resources.
- **Core Features**:
  - Intuitive display of booking schedules.
  - User feedback for successful actions and error handling.

---

## **Deployment**
- **Hosting**: The application is deployed on cloud platforms for ease of access.
- **Links**:
  - **Frontend**: 
  - **Backend**: 

---

## **Prerequisites**
To run the application locally, ensure the following are installed:
- **Node.js** (v14.x or higher)
- **MongoDB** (Local or MongoDB Atlas)
- **npm** (v6.x or higher)

Install additional dependencies:
- `dotenv` for managing environment variables.
- `cors`, `body-parser`, and `express` for backend functionality.

---

## **Setup Instructions**

### **Local Setup**
1. Clone the repository:
   ```bash
   git clone https://github.com/nityagupta6/PlayArena.git
   cd PlayArena

2. **Install dependencies for both frontend and backend**:
   ```bash
   cd client
   npm install
   cd ../server
   npm install
   
3. **Set up environment variables**:
   - Create a `.env` file in the root of the backend directory.
   - Add the required variables (e.g., `MONGO_URI`, `PORT`).

4. **Start the servers**:

   - **Backend**:
     ```bash
     cd server
     npm start
     ```

   - **Frontend**:
     ```bash
     cd client
     npm start
     ```

5. Access the application at `http://localhost:3000`.

