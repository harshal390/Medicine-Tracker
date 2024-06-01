const nodeById = (id) => document.getElementById(id);
const nodesByQuery = (query) => document.querySelectorAll(query);
const logoutButton = nodeById("logoutButton");

const LogoutUser = async () => {
    try {
        const response = await fetch(window.location.origin + "/logout-current-device");
        console.log(response);
        // setTimeout(() => {
        //     window.location.pathname = `/login`;
        // }, 1200);
    } catch (error) {
        console.log(error.toString());
    }


}

logoutButton.addEventListener("click", () => LogoutUser());