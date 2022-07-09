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

    const checkStr = element => element ? element : null;

    const date = new Date();
    let currentDate = `${date.getMonth() + 1}-${date.getDate()}-${date.getFullYear()}`;

    let body = {
        user: userEmail.value,
        liftId: Date.now().toString(),
        date: currentDate,
        liftType: liftType.value,
        weightAmount: +weightAmount.value,
        repsCompleted: +repsCompleted.value,
        rpeExertion: +rpeExertion.value,
        liftNotes: checkStr(liftNotes.value)
    }
    
    console.table(body)
    form.reset()
}


addLiftForm.addEventListener('submit', addLiftFormHandler)