export const handleApiError = (error) => {
  const errorMessages = {
    201: "User account created successfully!",
    404: "Resource not found. Please try again later.",
    409: "Email already exists. Please use a different email.",
    500: "Server error. Please try again later.",
    // Add more status codes and corresponding messages as needed
  };

  if (error.response) {
    const { status } = error.response;
    if (errorMessages[status]) {
      return errorMessages[status];
    } else {
      console.error(
        `Error response from server (status ${status}):`,
        error.response.data
      );
      return "An error occurred.";
    }
  } else {
    console.error("Error connecting to the server:", error.message);
    return "An error occurred.";
  }
};
