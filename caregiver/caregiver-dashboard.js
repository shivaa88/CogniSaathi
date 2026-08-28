// ==========================================
// CAREGIVER DASHBOARD DATA
// ==========================================

const patientData = {

    name: "Raj Sharma",

    activities: 3,

    accuracy: 78,

    averageTime: "4m 20s",

    performance: [
        68,
        72,
        75,
        70,
        82,
        78,
        84
    ]

};


// ==========================================
// DISPLAY PATIENT DATA
// ==========================================

document.getElementById("patientName").textContent =
    patientData.name;

document.getElementById("activities").textContent =
    patientData.activities;

document.getElementById("accuracy").textContent =
    patientData.accuracy + "%";

document.getElementById("avgTime").textContent =
    patientData.averageTime;


// ==========================================
// CURRENT DATE
// ==========================================

const dateElement =
    document.getElementById("currentDate");

if (dateElement) {

    dateElement.textContent =
        new Date().toLocaleDateString("en-IN", {
            weekday: "short",
            day: "numeric",
            month: "short"
        });

}


// ==========================================
// PERFORMANCE CHART
// ==========================================

const ctx =
    document.getElementById("performanceChart");


if (ctx) {

    new Chart(ctx, {

        type: "line",

        data: {

            labels: [
                "Aug 17",
                "Aug 18",
                "Aug 19",
                "Aug 20",
                "Aug 21",
                "Aug 22",
                "Today"
            ],

            datasets: [{

                label: "Activity Score",

                data: patientData.performance,

                borderWidth: 3,

                tension: 0.4,

                fill: false,

                borderColor: "#527b5a",

                pointBackgroundColor: "#477657",

                pointRadius: 4,

                pointHoverRadius: 6

            }]

        },

        options: {

            responsive: true,

            maintainAspectRatio: false,

            scales: {

                y: {

                    beginAtZero: true,

                    max: 100,

                    ticks: {
                        color: "#718078"
                    },

                    grid: {
                        color: "#e7eee5"
                    },

                    title: {

                        display: true,

                        text: "Score (%)",

                        color: "#65756b"

                    }

                },

                x: {

                    ticks: {
                        color: "#718078"
                    },

                    grid: {
                        display: false
                    }

                }

            },

            plugins: {

                legend: {

                    labels: {
                        color: "#405547"
                    }

                }

            }

        }

    });

}


// ==========================================
// LOGOUT
// ==========================================

function logout() {

    alert(
        "Logout feature will be connected with Firebase later."
    );

}