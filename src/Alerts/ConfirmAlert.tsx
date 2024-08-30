import Swal from "sweetalert2";

const ConfirmAlert = async (title? : string, text? : string) : Promise<boolean> => {
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
    .custom-swal-container .swal2-title,
    .custom-swal-container .swal2-html-container {
      color: ${textColor} !important;
    }
  `;
  document.head.appendChild(style);

  // Show SweetAlert2 popup
  const result = await Swal.fire({
    title: title || "Are you sure?",
    text: text || "Do you want to proceed?",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, proceed!",
    cancelButtonText: "No, cancel",
    customClass: {
      container: "custom-swal-container", // Use the custom class for styling
    },
  });

  // Clean up the injected styles
  document.head.removeChild(style);

  return result.isConfirmed;
};

export default ConfirmAlert;
