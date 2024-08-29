import Swal from "sweetalert2";

const SuccessAlert = async (title, text) => {
  // Get the theme mode from local storage
  const themeMode = localStorage.getItem("themeMode");

  // Determine background color and text color based on theme mode
  const backgroundColor = themeMode === "dark" ? "#333" : "#fff"; // Background color
  const textColor = themeMode === "dark" ? "#fff" : "#000"; // Text color

  // Inject custom CSS styles for SweetAlert2 popup
  const style = document.createElement("style");
  style.textContent = `
    .custom-swal-container .swal2-popup {
      background-color: ${backgroundColor} !important;
    }
    .custom-swal-container .swal2-title {
      color: ${textColor} !important;
    }
    .custom-swal-container .swal2-content {
      color: ${textColor} !important;
    }
  `;
  document.head.appendChild(style);

  // Show SweetAlert2 popup
  await Swal.fire({
    title: title || "Success!",
    text: text || "Operation completed successfully.",
    icon: "success",
    confirmButtonColor: "#3085d6",
    confirmButtonText: "OK",
    customClass: {
      container: "custom-swal-container", // Use the custom class for styling
    },
  });

  // Clean up the injected styles
  document.head.removeChild(style);
};

export default SuccessAlert;
