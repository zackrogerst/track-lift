
const addLiftForm = document.getElementById("addALift");
const userEmail = document.getElementById("userEmail");
const liftType = document.getElementById("liftType");
const weightAmount = document.getElementById("weightAmount");
const repsCompleted = document.getElementById("repsCompleted");
const rpeExertion = document.getElementById("rpeExertion");



////////////////////////////////////

const clearDivCallback = elm => elm.innerHTML = ``;
const errCallback = err => console.log(err.response.data);

////////////////// ADD LIFT //////////////////

const addALiftHeading = document.getElementById("addALiftHeading");

function sendNewLift(body) {
    axios.post("/api/lifts", body)
        .then(res => {
            addALiftHeading.textContent = "Added Successfully!";
            setTimeout(() => {
                addALiftHeading.textContent = `Add a Lift`;
            }, 4000)
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
    }

    sendNewLift(body)

    weightAmount.value = "";
    repsCompleted.value = "";
    rpeExertion.value = "";
}

addLiftForm.addEventListener('submit', addLiftFormHandler);

////////////////// VIEW LIFTS //////////////////

const viewLiftsForm = document.getElementById("viewLiftsForm");
const viewLiftsButton = document.getElementById("viewLiftsButton");
const viewUserEmail = document.getElementById("viewUserEmail");
const viewLiftType = document.getElementById("viewLiftType");
const liftHistoryRow = document.getElementById("liftHistoryRow");
const chartRow = document.getElementById("chartRow");

function getLifts(body) {

    if (liftHistoryRow.classList.contains("hidden")) {
        liftHistoryRow.classList.remove("hidden")
    }
    axios.post(`/api/view-lifts`, body)
        .then(res => {

            let liftsArr = res.data

            clearDivCallback(liftHistoryRow)
            clearDivCallback(chartRow)

            if (liftsArr.length === 0) {

                let h2 = document.createElement('h2')
                h2.textContent = `No ${body.liftType} Available!`
                chartRow.appendChild(h2)

                if (!liftHistoryRow.classList.contains("hidden")) {
                    liftHistoryRow.classList.add("hidden")
                }
            } else {

                let h2 = document.createElement('h2')
                h2.textContent = `${liftsArr[0].lift_name} History`
                chartRow.appendChild(h2)

                let chartCanvas = document.createElement('canvas');
                chartCanvas.setAttribute('id', 'myChart')
                chartRow.appendChild(chartCanvas)

                const ctx = document.getElementById('myChart').getContext('2d');


                clearDivCallback(liftHistoryRow)

                let weightsArr = liftsArr.map((e, i, a) => a[i].weight)
                let dateArr = liftsArr.map((e, i, a) => a[i].add_date)

                let maxWeight = Math.max(...weightsArr) + 30;
                let minWeight = Math.min(...weightsArr) - 30;

                let xValues = dateArr.reverse();
                let yValues = weightsArr.reverse();

                let myChart = new Chart(ctx, {
                    type: "line",
                    data: {
                        labels: xValues,
                        datasets: [{
                            fill: false,
                            lineTension: 0,
                            backgroundColor: "#33e602",
                            borderColor: "#33e6027b",
                            borderWidth: "1",
                            borderJoinStyle: "bevel",
                            data: yValues
                        }]
                    },
                    options: {
                        legend: {
                            display: false
                        },
                        scales: {
                            yAxes: [{
                                ticks: {
                                    fontColor: "white",
                                    fontSize: "15",
                                    min: minWeight,
                                    max: maxWeight
                                },
                                gridLines: {
                                    color: '#202857',
                                    lineWidth: 0.5
                                }
                            }],
                            xAxes: [{
                                ticks: {
                                    fontColor: "white",
                                    fontSize: "15"
                                },
                                gridLines: {
                                    color: '#202857',
                                    lineWidth: 0.5
                                }
                            }]
                        }
                    }
                });

                let newTable = document.createElement('table')
                newTable.setAttribute('id', 'liftsTable')
                liftHistoryRow.appendChild(newTable)

                let newTRh = document.createElement('tr')
                newTable.appendChild(newTRh)

                let dateHead = document.createElement('th')
                dateHead.textContent = "Date"
                newTRh.appendChild(dateHead)

                let weightHead = document.createElement('th')
                weightHead.textContent = "Weight"
                newTRh.appendChild(weightHead)

                let repsHead = document.createElement('th')
                repsHead.textContent = "Reps"
                newTRh.appendChild(repsHead)

                let rpeHead = document.createElement('th')
                rpeHead.textContent = "RPE"
                newTRh.appendChild(rpeHead)


                for (let i = 0; i < liftsArr.length; i++) {
                    let newTr = document.createElement('tr')
                    liftsTable.appendChild(newTr)

                    let addDate = document.createElement('td')
                    addDate.textContent = liftsArr[i].add_date
                    newTr.appendChild(addDate)

                    let weight = document.createElement('td')
                    weight.textContent = liftsArr[i].weight
                    newTr.appendChild(weight)

                    let reps = document.createElement('td')
                    reps.textContent = liftsArr[i].reps
                    newTr.appendChild(reps)

                    let rpe = document.createElement('td')
                    rpe.textContent = liftsArr[i].rpe
                    newTr.appendChild(rpe)
                }
            }
        })
        .catch(errCallback);
}

function viewLiftsHandler(event) {
    event.preventDefault()
    let body = { userEmail: viewUserEmail.value, liftType: viewLiftType.value }
    getLifts(body)
}

viewLiftsForm.addEventListener('submit', viewLiftsHandler);