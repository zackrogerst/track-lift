const addLiftForm = document.getElementById("addALift");
const userEmail = document.getElementById("userEmail");
const liftType = document.getElementById("liftType");
const weightAmount = document.getElementById("weightAmount");
const repsCompleted = document.getElementById("repsCompleted");
const rpeExertion = document.getElementById("rpeExertion");
const liftNotes = document.getElementById("liftNotes");

////////////////////////////////////

const clearDivCallback = elm => elm.innerHTML = ``;
const errCallback = err => console.log(err.response.data);

////////////////////////////////////

function sendNewLift(body) {
    // let { liftId } = body;
    axios.post("/api/lifts", body)
        .then(res => {
            // console.log(res.data);
            // Add lift to history;
        })
        .catch(errCallback);
}


function addLiftFormHandler(event) {
    event.preventDefault();

    const checkStr = str => str ? str : null;

    const date = new Date();
    let currentDate = `${date.getMonth() + 1}-${date.getDate()}-${date.getFullYear()}`;

    let body = {
        userEmail: userEmail.value,
        date: currentDate,
        liftType: liftType.value,
        weightAmount: +weightAmount.value,
        repsCompleted: +repsCompleted.value,
        rpeExertion: +rpeExertion.value,
        liftNotes: checkStr(liftNotes.value)
    }

    console.table(body);

    sendNewLift(body)

    weightAmount.value = "";
    repsCompleted.value = "";
    rpeExertion.value = "";
    liftNotes.value = "";
}

////////////////////////////////////

addLiftForm.addEventListener('submit', addLiftFormHandler);