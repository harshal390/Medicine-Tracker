const nodeById = (id) => document.getElementById(id);
const nodesByQuery = (query) => document.querySelectorAll(query);

const authButton = nodeById("authButton");
const authForm = nodeById("authForm");
const authType = window.location.pathname.includes("login") ? "login" : "register";

const postFormDataAsJson = async (url, formData) => {
    const plainFormData = Object.fromEntries(formData.entries());
    const formDataJsonString = JSON.stringify(plainFormData);

    const fetchOptions = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
        },
        body: formDataJsonString,
    };

    const response = await fetch(url, fetchOptions);

    if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error(errorMessage);
    }
    return response;
}

const submitAuthForm = async () => {
    const formData = new FormData(authForm);
    // console.log(formData, authType);
    let response = await postFormDataAsJson(window.location.href, formData);
    response = await response.json();
    console.log(response);
    if (response.response_type === "success") {
        Swal.fire({
            icon: "success",
            title: response.message,
            showConfirmButton: true,
            timer: 1500
        });
        if (authType !== "login") {
            setTimeout(() => {
                window.location.pathname = "/login";
            }, 1500);
        }
    } else {
        console.log("else part called")
        Swal.fire({
            icon: "error",
            title: response.message,
            text: response.data,
            showConfirmButton: true,
            timer: 1500
        });
    }
}

authButton.addEventListener("click", () => submitAuthForm());