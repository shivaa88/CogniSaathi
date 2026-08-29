// ==========================================
// CAREGIVER DASHBOARD DATA
// ==========================================

// ==========================================
// REAL GAME DATA FROM LOCAL STORAGE
// ==========================================

const gameResults =
    JSON.parse(localStorage.getItem("gameResults")) || [];

const totalActivities = gameResults.length;

const averageScore =
    totalActivities > 0
        ? Math.round(
            gameResults.reduce(
                (sum, result) => sum + Number(result.score || 0),
                0
            ) / totalActivities
        )
        : 0;

const averageTimeSeconds =
    totalActivities > 0
        ? Math.round(
            gameResults.reduce(
                (sum, result) => sum + Number(result.time || 0),
                0
            ) / totalActivities
        )
        : 0;

const minutes = Math.floor(averageTimeSeconds / 60);
const seconds = averageTimeSeconds % 60;

const averageTime =
    `${minutes}m ${seconds}s`;

const patientData = {
    name: "Raj Sharma",
    activities: totalActivities,
    accuracy: averageScore,
    averageTime: averageTime,

    performance: gameResults.map(
        result => Number(result.score || 0)
    )
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
