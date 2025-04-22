// utils/validators.js // Function to validate email format using a more comprehensive regex
export const validateEmail = (email) => {
    // This regex allows for more flexibility and handles different email patterns
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return regex.test(email);
};

// Function to validate password
export const validatePassword = (password) => {
    // Password should be at least 6 characters long, contain at least one uppercase letter, one number, and one special character
    const regex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;
    return regex.test(password); // Checks for: at least one uppercase, one number, one special character, and min length of 6
};
