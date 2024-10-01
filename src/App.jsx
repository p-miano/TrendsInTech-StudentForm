import { useState, useEffect } from 'react';
// useState: Hook to manage state in functional components. Allows to create state variables and update them.
// useEffect: Hook to perform side effects in functional components. Allows to fetch data, update the DOM, etc.
import './App.css'; // Custom styling 

const App = () => {
  const [students, setStudents] = useState([]); // Initialize students state as an empty array to store fetched data
  const [error, setError] = useState(null); // Initialize error state as null to store error messages
  const [formData, setFormData] = useState({ // Initialize form data state with empty values
    name: '',
    surname: '',
    dob: '',
    course: ''
  });
  const [formError, setFormError] = useState(null); // State to handle form submission errors
  const [currentPage, setCurrentPage] = useState(1); // Track the current page
  const [totalPages, setTotalPages] = useState(1); // Track total number of pages

  // Fetch students data from the API
  const fetchStudents = async (page = 1) => { // Accept page as a parameter, default to page 1
    try {
      const response = await fetch(`/api/lasalle-student/?page=${page}&limit=10`); // Fetch students based on page
      const data = await response.json();
      console.log("Full response from API with pagination:", data);

      if (data.students && Array.isArray(data.students)) { 
        setStudents(data.students); // If data is an array, set students to the fetched data
        setTotalPages(data.pagination.totalPages); // Set the total pages from pagination metadata
      } else {
        setStudents([]); // In case data is not an array, set students to an empty array
      }
    } catch (err) {
      console.error(err);
      setError('Failed to fetch students. Please try again later.');
    }
  };

  useEffect(() => {
    fetchStudents(); // Fetch the first page when the component mounts
  }, []); // The empty array ensures this runs only once when the component mounts

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission
    if (!formData.name || !formData.surname || !formData.dob || !formData.course) {
      setFormError("All fields are required."); // Set form error if fields are missing
      return;
    }
    try {
      const response = await fetch('/api/lasalle-student/', { // Use the proxy path
        method: 'POST', // HTTP method to send data
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData), // Send form data as JSON
      });

      if (response.ok) {
        fetchStudents(currentPage); // Re-fetch the current page after adding a new student
        setFormData({ name: '', surname: '', dob: '', course: '' }); // Reset form fields
        setFormError(null); // Clear any form errors
      } else {
        setFormError("Failed to submit student data.");
      }
    } catch (err) {
      console.error(err);
      setFormError("An error occurred while submitting the form.");
    }
  };

  // Handle input changes for the form
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    // For date input (dob), ensure the value is in 'YYYY-MM-DD' format
    const formattedValue = name === 'dob' ? new Date(value).toISOString().split('T')[0] : value;
    setFormData({
      ...formData, // Spread current formData values
      [name]: formattedValue, // Dynamically update the changed field
    });
  };

  // Function to fetch the next page of students
  const handleNextPage = () => {
    if (currentPage < totalPages) {
      const nextPage = currentPage + 1;
      setCurrentPage(nextPage); // Update the current page state
      fetchStudents(nextPage); // Fetch the next page
    }
  };

  // Function to fetch the previous page of students
  const handlePreviousPage = () => {
    if (currentPage > 1) {
      const prevPage = currentPage - 1;
      setCurrentPage(prevPage); // Update the current page state
      fetchStudents(prevPage); // Fetch the previous page
    }
  };

  // Render the form and student list side by side
  return (
    <div className="container mt-5">
      <div className="row">
        {/* Student Form */}
        <div className="col-md-6 d-flex align-items-stretch">
          <div className="card w-100 p-3 shadow-lg"> {/* Equal card styling */}
            <h2 className="card-title">Register Student</h2>
            <form onSubmit={handleSubmit} className="text-center">
              <div className="mb-3">
                <label className="form-label">Name</label>
                <input
                  type="text"
                  name="name"
                  className="form-control"
                  value={formData.name}
                  onChange={handleInputChange}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Surname</label>
                <input
                  type="text"
                  name="surname"
                  className="form-control"
                  value={formData.surname}
                  onChange={handleInputChange}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Date of Birth</label>
                <input
                  type="date"
                  name="dob"
                  className="form-control"
                  value={formData.dob}
                  onChange={handleInputChange}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Course</label>
                <input
                  type="text"
                  name="course"
                  className="form-control"
                  value={formData.course}
                  onChange={handleInputChange}
                />
              </div>
              {formError && <p className="text-danger">{formError}</p>} {/* Display form error */}
              <button type="submit" className="btn custom-submit-btn">Submit</button> {/* Normal sized submit button */}
            </form>
          </div>
        </div>

        {/* Student List */}
        <div className="col-md-6 d-flex align-items-stretch">
          <div className="card w-100 p-3 shadow-lg"> {/* Equal card styling */}
            <h2 className="card-title">Student List</h2>
            {error ? (
              <p>{error}</p> // Display error if any
            ) : (
              <ul className="list-group">
                {students.length > 0 ? ( // Check if students array has data
                  students.map((student) => ( // Loop through the students array and render each student
                    <li key={student.id} className="list-group-item">
                      {student.name} {student.surname} | {student.course} | {new Date(student.dob).toLocaleDateString()}
                    </li>
                  ))
                ) : (
                  <li className="list-group-item">No students found</li> // Fallback when no data is available
                )}
              </ul>
            )}

            {/* Pagination Controls */}
            <div className="pagination-controls mt-3 d-flex justify-content-between">
              <button
                className="btn custom-btn" // Styled to match the Submit button
                onClick={handlePreviousPage}
                disabled={currentPage === 1} // Disable when on the first page
              >
                Previous
              </button>
              <button
                className="btn custom-btn" // Styled to match the Submit button
                onClick={handleNextPage}
                disabled={currentPage === totalPages} // Disable when on the last page
              >
                Next
              </button>
            </div>
            <p className="text-center mt-2">Page {currentPage} of {totalPages}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
