const nodeById = (id) => document.getElementById(id);
const nodesByQuery = (query) => document.querySelectorAll(query);
const logoutButton = nodeById("logoutButton");
const logoutFromAllDeviceButton = nodeById("logoutFromAllDeviceButton");
const logoutFromAllRemainingDeviceButton = nodeById("logoutFromAllRemainingDeviceButton");
const greeting = nodeById("greeting");
const closeModalBtn = nodeById("closeModal");
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
const oneTimeOnly = nodeById("oneTimeOnly");
const recuringDaily = nodeById("recuringDaily");
const recuringWeekly = nodeById("recuringWeekly");
const closeModal = nodesByQuery('[data-modal-close]');
const medicationType = nodeById("medicationType");
const oneTimeOnlyFields = nodesByQuery("#oneTimeOnly input");
const recuringDailyFields = nodesByQuery("#recuringDaily input");
const recuringWeeklyFields = nodesByQuery("#recuringWeekly input,#recuringWeekly select")
const medicationForm = nodeById("medicationForm");
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
    medicationType.value = node.id;
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

const emptyStrValid = (node) => node.value.trim() === "" ? false : true;
const checkEveryTrueInObj = (obj) => Object.keys(obj).every((ele) => obj[ele]);
const checkAnyTrueInObj = (obj) => Object.keys(obj).some((ele) => obj[ele]);

const validForm1 = () => medicationType.value && medicationName.value && medicationPurpose.value && medicationSchedules.value ? true : false;

const validForm2 = () => {
    const scValue = parseInt(medicationSchedules.value);
    if (scValue === 1) {
        console.log(oneTimeOnlyFields)
        const obj = {};
        Array.from(oneTimeOnlyFields).map(el => {
            obj[el.name] = el.value ? emptyStrValid(el) : false;
        })
        console.log(obj);
        return checkEveryTrueInObj(obj);
    } else if (scValue === 2) {
        console.log(recuringDailyFields)
        const obj = {};
        Array.from(recuringDailyFields).map(el => {
            obj[el.name] = el.value ? emptyStrValid(el) : false;
        })
        console.log(obj);
        return checkEveryTrueInObj(obj);
    }
    else if (scValue === 3) {
        console.log(recuringWeeklyFields);
        const obj = {};
        Array.from(recuringWeeklyFields).map(el => {
            obj[el.name] = el.value ? emptyStrValid(el) : false;
        })
        console.log(obj);
        return checkEveryTrueInObj(obj);
    } else {
        return false;
    }
};

const validation = (countValue) => countValue === 1 ? validForm1() : countValue === 2 ? validForm2() : false;

const prevForm = () => {
    if (count > 1 && count <= medicationForms.length) {
        // console.log("prev");
        checkConditionFormCount(--count)
        checkCondition(count);
        checkConditionForButton(count);

    }
}
const nextForm = () => {
    if (count < medicationForms.length && validation(count)) {
        // console.log("next");
        setTimeout(() => {
            checkConditionFormCount(++count)
            checkCondition(count);
            checkConditionForButton(count);
        }, 500);
    }
}

const changeSchedules = () => {
    oneTimeOnly.classList.add("hidden");
    recuringDaily.classList.add("hidden");
    recuringWeekly.classList.add("hidden");
    const scValue = parseInt(medicationSchedules.value);
    // console.log(scValue);
    if (scValue === 1) {
        //show one time only medications
        oneTimeOnly.classList.remove("hidden");

    } else if (scValue === 2) {
        //show recuring daily medications
        recuringDaily.classList.remove("hidden")
    } else if (scValue === 3) {
        //show recuring weekly medications
        recuringWeekly.classList.remove("hidden");
    } else {
        console.log("nothing")
        //nothing to show
    }
}

const clearAllField = () => {
    medicationImages.map((el) => {
        el.classList.remove("border", "border-black");
    })
    medicationType.value = null;
    medicationName.value = null;
    medicationPurpose.value = null;
    medicationSchedules.value = null;
    Array.from(oneTimeOnlyFields).map(el => el.value = null);
    Array.from(recuringDailyFields).map(el => el.value = null);
    Array.from(recuringWeeklyFields).map(el => el.value = null);
}

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

const submitForm = async () => {
    if (validation(count)) {
        // console.log("submit");
        const formData = new FormData(medicationForm);
        console.log(formData);
        const apiUrl = window.location.origin.concat("/add-medication")
        let response = await postFormDataAsJson(apiUrl, formData);
        response = await response.json();
        console.log(response);
        clearAllField();
        setTimeout(() => {
            closeModalBtn.click();
            fetchGrid(); //function arrived from medicationList.js
        }, 1200);
    }
    else {
        console.log("validation error");
    }
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

changeSchedules();
prev.addEventListener("click", () => { prevForm() });
next.addEventListener("click", () => { nextForm() });
medicationSchedules.addEventListener("change", () => changeSchedules())
submit.addEventListener("click", () => { submitForm() });
Array.from(closeModal).map((el) => {
    el.addEventListener("click", () => {
        // console.log("close model clicked")
        count = 1;
        checkConditionFormCount(count)
        checkCondition(count);
        checkConditionForButton(count);
    })
})
// logoutButton.addEventListener("click", () => LogoutUser());
// logoutFromAllDeviceButton.addEventListener("click", () => logoutFromAllDevice())
// logoutFromAllRemainingDeviceButton.addEventListener("click", () => LogoutFromAllRemainingDevice());