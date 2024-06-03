const nodeById = (id) => document.getElementById(id);
const nodesByQuery = (query) => document.querySelectorAll(query);
const logoutButton = nodeById("logoutButton");
const logoutFromAllDeviceButton = nodeById("logoutFromAllDeviceButton");
const logoutFromAllRemainingDeviceButton = nodeById("logoutFromAllRemainingDeviceButton");
const greeting = nodeById("greeting");
const closeModal = nodeById("closeModal");
const today = new Date()
const curHr = today.getHours()
const medicationImages = [nodeById("pill"), nodeById("capsule"), nodeById("injection"), nodeById("amp")]
const medicationName = nodeById("name");
const medicationPurpose = nodeById("purpose");
const medicationSchedules = nodeById("schedules");
const countLabel = nodeById("count");
const totalCount = nodeById("totalCount");
const form_1 = nodeById("form-1");
const form_2 = nodeById("form-2");
let count = 1;
const next = nodeById("nextButton");
const prev = nodeById("prevButton");
const submit = nodeById("submitFormButton");


const medicationForms = [
    {
        id: 1,
        node: form_1,
    },
    {
        id: 2,
        node: form_2,
    },
]
countLabel.innerText = count;
totalCount.innerText = medicationForms.length;

if (curHr < 12) {
    greeting.innerText = 'good morning';
} else if (curHr < 18) {
    greeting.innerText = 'good afternoon';
} else {
    greeting.innerText = 'good evening';
}

const selectMedicationImage = (node) => {
    // console.log(node);
    medicationImages.map((el) => {
        el.classList.remove("border", "border-black");
    })
    node.classList.add("border", "border-black");
}

medicationImages.map((el) => {
    el.addEventListener("click", () => selectMedicationImage(el));
});

checkCondition = (countValue) => {
    // console.log(countValue);
    medicationForms.map((el) => {
        // console.log(el);
        if (countValue === el.id) {
            el.node.classList.remove("hidden");
            el.node.classList.add("flex");
        }
        else {
            el.node.classList.add("hidden");
            el.node.classList.remove("flex");
        }
    })
}

checkConditionForButton = (countValue) => {
    prev.classList.remove("opacity-40");
    prev.classList.add("cursor-pointer");
    submit.classList.add("hidden");
    next.classList.remove("hidden");
    if (countValue === 1) {
        prev.classList.add("opacity-40");
        prev.classList.remove("cursor-pointer");
    }
    if (countValue === medicationForms.length) {
        submit.classList.remove("hidden");
        next.classList.add("hidden");
    }
}

checkConditionFormCount = (countValue) => {
    countLabel.innerText = countValue;
}

const prevForm = () => {
    if (count > 1 && count <= medicationForms.length) {
        // console.log("prev");
        checkConditionFormCount(--count)
        checkCondition(count);
        checkConditionForButton(count);

    }
}
const nextForm = () => {
    if (count < medicationForms.length) {
        // console.log("next");
        setTimeout(() => {
            checkConditionFormCount(++count)
            checkCondition(count);
            checkConditionForButton(count);
        }, 500);
    }
}

const submitForm = () => {
    console.log("submit");
}


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


prev.addEventListener("click", () => { prevForm() });
next.addEventListener("click", () => { nextForm() });
submit.addEventListener("click", () => { submitForm() });
// logoutButton.addEventListener("click", () => LogoutUser());
// logoutFromAllDeviceButton.addEventListener("click", () => logoutFromAllDevice())
// logoutFromAllRemainingDeviceButton.addEventListener("click", () => LogoutFromAllRemainingDevice());