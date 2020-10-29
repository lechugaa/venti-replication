// ----------------------
// CHART CONTROL
// ----------------------
let ctx = document.getElementById('performance-chart').getContext('2d');
const dataUrl = 'http://127.0.0.1:5000/historical_data/';

let chart = new Chart(ctx, {
    type: 'line',

    data: {
        labels: [],
        datasets: [{
            label: 'Total size',
            pointBackgroundColor: 'rgb(47, 57, 68)',
            pointRadius: 4,
            pointBorderColor: 'rgb(47, 57, 68)',
            backgroundColor: 'rgba(47, 57, 68, 0)',
            borderColor: 'rgb(47, 57, 68)',
            data: [],
            lineTension: 0
        },
        {
            label: 'Real size',
            pointBackgroundColor: 'rgb(255, 99, 71)',
            pointRadius: 4,
            pointBorderColor: 'rgb(255, 99, 71)',
            backgroundColor: 'rgba(255, 99, 71, 0)',
            borderColor: 'rgb(255, 99, 71)',
            data: [],
            lineTension: 0
        }]
    },

    options: {
        scales: {
            yAxes: [{
                scaleLabel: {
                     display: true,
                     labelString: 'Size (KB)',
                     fontSize: 15
                  }
            }],
            xAxes: [{
                scaleLabel: {
                     display: true,
                     labelString: 'Backup',
                     fontSize: 15
                  }
            }]
        },
    },
});

// ----------------------
// HELPER FUNCTIONS
// ----------------------
function updateChart(labels, set1, set2) {
    chart.data.labels = labels;
    chart.data.datasets[0].data = set1;
    chart.data.datasets[1].data = set2;
    chart.update();
}

function checkStatus(response) {
    if (response.ok) {
        return Promise.resolve(response);
    } else {
        return Promise.reject(new Error(response.statusText));
    }
}

function processResponse(data) {
    console.log(data);
    let labels = data[0];
    let totalSizeData = data[1];
    let realSizeData = data[2];
    updateChart(labels, totalSizeData, realSizeData);
}

function fetchData(url) {
    return fetch(url)
        .then(checkStatus)
        .then(res => res.json())
        .then(processResponse)
        .catch(error => console.log('Looks like there was a problem', error));
}

// ----------------------
// LOAD
// ----------------------
fetchData(dataUrl);