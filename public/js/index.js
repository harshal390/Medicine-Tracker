const nodeById = (id) => document.getElementById(id);
const nodesByQuery = (query) => document.querySelectorAll(query);
const logoutButton = nodeById("logoutButton");

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
        console.log(error.toString());
    }


}

logoutButton.addEventListener("click", () => LogoutUser());