const nodeById = (id) => document.getElementById(id);
const nodesByQuery = (query) => document.querySelectorAll(query);
const logoutButton = nodeById("logoutButton");
const logoutFromAllDeviceButton = nodeById("logoutFromAllDeviceButton");
const logoutFromAllRemainingDeviceButton = nodeById("logoutFromAllRemainingDeviceButton");

const LogoutUser = async () => {
    try {
        let response = await fetch(window.location.origin + "/logout-current-device");
        response = await response.json();
        console.log(response);
        if (response.response_type = "success") {
            Swal.fire({
                icon: "success",
                title: response.message,
                showConfirmButton: true,
                timer: 1500
            });
            setTimeout(() => {
                window.location.pathname = `/login`;
            }, 1500);
        } else {
            Swal.fire({
                icon: "error",
                title: response.message,
                text: response.data,
                showConfirmButton: true,
                timer: 1500
            });
        }
    } catch (error) {
        Swal.fire({
            icon: "error",
            text: error.toString(),
            showConfirmButton: true,
            timer: 1500
        });
    }
}

const logoutFromAllDevice = async () => {
    try {
        let response = await fetch(window.location.origin + "/logout-from-all-device");
        response = await response.json();
        // console.log(response);
        if (response.response_type === "success") {
            Swal.fire({
                icon: "success",
                title: response.message,
                showConfirmButton: true,
                timer: 1500
            });
        } else {
            Swal.fire({
                icon: "error",
                title: response.message,
                text: response.data,
                showConfirmButton: true,
                timer: 1500
            });
        }
    } catch (error) {
        Swal.fire({
            icon: "error",
            text: error.toString(),
            showConfirmButton: true,
            timer: 1500
        });
    }
}

const LogoutFromAllRemainingDevice = async () => {
    try {
        let response = await fetch(window.location.origin + "/logout-from-all-remaining-device");
        response = await response.json();
        // console.log(response);
        if (response.response_type === "success") {
            Swal.fire({
                icon: "success",
                title: response.message,
                showConfirmButton: true,
                timer: 1500
            });
        } else {
            Swal.fire({
                icon: "error",
                title: response.message,
                text: response.data,
                showConfirmButton: true,
                timer: 1500
            });
        }
    } catch (error) {
        Swal.fire({
            icon: "error",
            text: error.toString(),
            showConfirmButton: true,
            timer: 1500
        });
    }
}

logoutButton.addEventListener("click", () => LogoutUser());
logoutFromAllDeviceButton.addEventListener("click", () => logoutFromAllDevice())
logoutFromAllRemainingDeviceButton.addEventListener("click", () => LogoutFromAllRemainingDevice());