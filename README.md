# LaSalle Student Registration Form

This project was created as an assignment for the **Trends in Technology** course, part of the **AEC Information Technology Programmer-Analyst** program at **LaSalle College**. The purpose of this project is to build a simple student registration form using **React.js** and **Bootstrap**, which allows users to add new students to a list and view a paginated list of registered students.

## Features

- **Register Students**: Users can input a student's name, surname, date of birth, and course, and submit the form to add the student to the list.
- **Paginated Student List**: The student list is displayed with pagination, allowing users to navigate through pages of students.
- **Responsive Design**: The form and student list are displayed side by side on larger screens and stack vertically on smaller screens, providing a mobile-friendly layout.
- **Real-Time Student Data**: Newly registered students are dynamically added to the list after form submission.

## Technologies Used

- **React.js**: Used to build the user interface and handle the dynamic functionality of the form and student list.
- **Bootstrap**: Provides styling for the form, student list, and buttons, ensuring a responsive layout.
- **Vite**: Development server and build tool for React, providing fast builds and optimized development workflows.
- **Fetch API**: Used to communicate with a backend API to retrieve and submit student data.

## API

This project communicates with the **LaSalle Student API** to fetch and submit student data. The API provides a paginated list of students and allows for new student registrations.

- **GET**: `/api/lasalle-student/` - Fetch the list of students, with pagination support.
- **POST**: `/api/lasalle-student/` - Submit new student data (name, surname, date of birth, and course).

## Installation and Setup

To run this project locally, follow these steps:

1. Clone the repository:
   ```bash
   git clone <repository-url>
   ```

2. Navigate to the project directory:
   ```bash
   cd <project-directory>
   ```

3. Install the dependencies:
   ```bash
   npm install
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

5. Open your browser and navigate to `http://localhost:5173` to view the application.

## File Structure

```bash
.
├── src
│   ├── App.jsx         # Main React component that contains the form and student list
│   ├── App.css         # Custom styling for the form and buttons
│   ├── main.jsx        # Entry point for the React application
│   └── index.html      # Main HTML file
├── vite.config.js      # Vite configuration file (includes API proxy setup)
├── package.json        # Project dependencies and scripts
└── README.md           # Project documentation
```

## Usage

1. **Register a Student**:
   - Fill in the fields for **Name**, **Surname**, **Date of Birth**, and **Course**.
   - Click the **Submit** button to register the student.

2. **View Registered Students**:
   - The **Student List** will display the registered students, with pagination controls at the bottom to navigate through the pages.

## Screenshots

Here is a preview of the application interface:

### Form and Student List (Side-by-Side)
![image](https://github.com/user-attachments/assets/6d9cd7c1-e83b-441d-bacc-e8404ab4f116)

## License

This project is for educational purposes only and is not licensed for commercial use.

## Contact

For any questions or feedback, please feel free to contact me.

---

This project was completed as part of the **Trends in Technology** course under the guidance of LaSalle College instructors.
