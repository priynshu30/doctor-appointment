# DocCare - Doctor Appointment Application

DocCare is a comprehensive, full-stack doctor appointment booking platform designed with a premium UI/UX. It allows patients to register, login, view clinical services, book appointments with specialists, and manage their health records centrally.

## 🚀 Features

-   **User Authentication**: Secure JWT-based registration and login system.
-   **Patient Dashboard**: Manage personal profile, including photo uploads.
-   **Service Exploration**: Browse hospital specialties with a sleek, responsive interface.
-   **Appointment Booking**: Easy-to-use form for selecting dates, times, and specialists.
-   **Health Records**: Upload medical reports (images/PDFs) during booking and view them later.
-   **History Tracking**: View past and upcoming appointments with year-based filtering.
-   **Responsive Design**: Optimized for mobile, tablet, and desktop screens.

## 🛠 Tech Stack

-   **Frontend**: React, Redux Toolkit, Tailwind CSS, Framer Motion, React Icons.
-   **Backend**: Node.js, Express.js.
-   **Database**: MongoDB Atlas (Mongoose).
-   **File Storage**: Local Multer-based storage for reports and profile pictures.

## 🏁 Getting Started

### Prerequisites

-   Node.js installed on your machine.
-   A MongoDB Atlas account and connection string.

### Installation

1.  **Clone the repository**:
    ```bash
    git clone <repository-url>
    cd doctor-appointment-app
    ```

2.  **Server Setup**:
    ```bash
    cd server
    npm install
    ```
    Create a `.env` file in the `server` directory and add:
    ```env
    PORT=5000
    MONGO_URI=your_mongodb_atlas_connection_string
    JWT_SECRET=your_secret_key
    ```

3.  **Client Setup**:
    ```bash
    cd ../client
    npm install
    ```

### Running the Application

1.  **Start the Backend**:
    ```bash
    cd server
    npm run dev
    ```

2.  **Start the Frontend**:
    ```bash
    cd client
    npm run dev
    ```

The application will be available at `http://localhost:5173` (or the port specified by Vite).

## 📊 Data Management

Data is stored in MongoDB Atlas and can be managed via the Atlas dashboard under the `doctorApp` database:
-   `users`: Patient account details.
-   `appointments`: Booking schedules and report links.
-   `services`: Clinical specialties.

## 🧪 Testing

Run frontend unit tests using Vitest:
```bash
cd client
npm test
```

## 📜 License

This project is licensed under the MIT License.
