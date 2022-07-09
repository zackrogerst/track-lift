const addLiftForm = document.getElementById("addALift");
const userEmail = document.getElementById("userEmail");
const liftType = document.getElementById("liftType");
const weightAmount = document.getElementById("weightAmount");
const repsCompleted = document.getElementById("repsCompleted");
const rpeExertion = document.getElementById("rpeExertion");
const liftNotes = document.getElementById("liftNotes");

////////////////////////////////////

const clearDivCallback = e => e.innerHTML = ``;








function addLiftFormHandler(event) {
    event.preventDefault();

    const date = new Date();
    let currentDate = `${date.getMonth() + 1}-${date.getDate()}-${date.getFullYear()}`;

    let body = {
        user: userEmail.value,
        date: currentDate,
        liftType: liftType.value,
        weightAmount: +weightAmount.value,
        repsCompleted: +repsCompleted.value,
        rpeExertion: +rpeExertion.value,
        liftNotes: liftNotes.value
    }

    console.table(body)

    liftType.value = "";
    weightAmount.value = "";
    repsCompleted.value = "";
    rpeExertion.value = "";
    liftNotes.value = "";
}


addLiftForm.addEventListener('submit', addLiftFormHandler)