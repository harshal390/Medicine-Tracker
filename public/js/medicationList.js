//nodeById arrived from index.js
const OneTimeOnlyMedicationGrid = nodeById("OneTimeOnlyMedicationGrid");
const RecuringDailyMedicationGrid = nodeById("RecuringDailyMedicationGrid");
const RecuringWeeklyMedicationGrid = nodeById("RecuringWeeklyMedicationGrid");

const displayMedicationsByFilter = (arr, node, scheduleId) => {

    const mySqlDatetoNorDate = (date) => {
        const monthNames = ["January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"];
        const month = parseInt(date.split("T")[0].split("-")[1]);
        return `${date.split("T")[0].split("-")[2]} ${monthNames[month - 1]} ${date.split("T")[0].split("-")[0]}`;
    };

    const mySqlTimetoNorTime = (time) => {
        const hour = parseInt(time.slice(0, 3));
        return hour === 12 ? parseInt(time.slice(0, 3)).toString().concat(time.slice(2, 5)).concat(" pm") : hour === 24 ? (parseInt(time.slice(0, 3)) - 24).toString().concat(time.slice(2, 5)).concat(" am") : hour < 12 ? (parseInt(time.slice(0, 3))).toString().concat(time.slice(2, 5)).concat(" am") : (parseInt(time.slice(0, 3)) - 12).toString().concat(time.slice(2, 5)).concat(" pm");
    }

    let MedicationsGrid = ``;
    Array.from(arr).filter((medication) => medication.scheduleId === scheduleId).map((medication) => {
        MedicationsGrid += `<div class="flex items-center w-full justify-between p-5 rounded-xl border"> 
        <div class="w-1/5">
        <div class="w-20 p-5 bg-gray-4 rounded-full h-20 flex items-center justify-center cursor-pointer">
      <img src="${medication.kindOfMedicationId === 1 ? "/images/pngs/pill01_v1_w 1.png" : medication.kindOfMedicationId === 2 ? "/images/pngs/caps7_9dsddssd 1.png" : medication.kindOfMedicationId === 3 ? "/images/pngs/ing 2.png" : "/images/pngs/amp02 2.png"}" class="" alt=${medication.name} />
      </div>
      </div>
        <div class="flex flex-col gap-2 w-1/2">
        <span>${medication.scheduleId === 1 ? `One time Only` : medication.scheduleId === 2 ? `Daily` : medication.scheduleId === 3 ? `Weekly` : ``}</span>
        <span class="text-3xl font-semibold capitalize">${medication.name}</span> 
        <span class="text-md"><span class="text-gray">Purpose : </span>  ${medication.purpose}</span> 
        </div>
        ${medication.scheduleId === 1 ?
                `
            <div class="flex flex-col gap-2 w-1/3">
            <div><span class="text-gray">Time : </span>${mySqlTimetoNorTime(medication.OneTimeOnlyMedication.time)}</div>
            <div><span class="text-gray">Date : </span>${mySqlDatetoNorDate(medication.OneTimeOnlyMedication.date)}</div>
            </div>
            ` : medication.scheduleId === 2 ?
                    `
            <div class="flex flex-col gap-2 w-1/3">
            <div><span class="text-gray">Time : </span>${mySqlTimetoNorTime(medication.RecuringDaily.time)}</div>
            <div><span class="text-gray">Start : </span>${mySqlDatetoNorDate(medication.RecuringDaily.startDate)}</div>
            <div><span class="text-gray">End : </span>${mySqlDatetoNorDate(medication.RecuringDaily.endDate)}</div>
            </div>
            ` :
                    `
            <div class="flex flex-col gap-2 w-1/3">
            <div><span class="text-gray">Day : </span> ${medication.RecuringWeekly.day === 0 ? `Sunday` : medication.RecuringWeekly.day === 1 ? `Monday` : medication.RecuringWeekly.day === 2 ? `Tuesday` : medication.RecuringWeekly.day === 3 ? `Wednesday` : medication.RecuringWeekly.day === 4 ?
                        `Thursday` : medication.RecuringWeekly.day === 5 ? `Friday` : medication.RecuringWeekly.day === 6 ? `Saturday` : medication.RecuringWeekly.day === 7 ? `Sunday` : ``}
            </div>
            <div><span class="text-gray">Time : </span>${mySqlTimetoNorTime(medication.RecuringWeekly.time)}</div>
            <div><span class="text-gray">Start : </span>${mySqlDatetoNorDate(medication.RecuringWeekly.startDate)}</div>
            <div><span class="text-gray">End : </span>${mySqlDatetoNorDate(medication.RecuringWeekly.endDate)}</div>
            </div>
            `}
        
        </div>`
    })
    // console.log(MedicationsGrid);

    return node.innerHTML = MedicationsGrid;
}

const fetchGrid = async () => {
    let medications = await fetch(window.location.origin.concat("/medications-list"));
    medications = await medications.json();
    displayMedicationsByFilter(medications.data, OneTimeOnlyMedicationGrid, 1);
    displayMedicationsByFilter(medications.data, RecuringDailyMedicationGrid, 2);
    displayMedicationsByFilter(medications.data, RecuringWeeklyMedicationGrid, 3);
}
fetchGrid();

