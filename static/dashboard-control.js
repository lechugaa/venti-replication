let ctx = document.getElementById('performance-chart').getContext('2d');
let chart = new Chart(ctx, {
    // The type of chart we want to create
    type: 'line',

    // The data for our dataset
    data: {
        labels: ['1', '2', '3', '4', '5', '6', '7'],
        datasets: [{
            label: 'Files size',
            pointBackgroundColor: 'rgb(47, 57, 68)',
            pointRadius: 4,
            pointBorderColor: 'rgb(47, 57, 68)',
            backgroundColor: 'rgba(47, 57, 68, 0)',
            borderColor: 'rgb(47, 57, 68)',
            data: [0, 10, 5, 2, 20, 30, 45]
        },
        {
            label: 'Log size',
            pointBackgroundColor: 'rgb(255, 99, 71)',
            pointRadius: 4,
            pointBorderColor: 'rgb(255, 99, 71)',
            backgroundColor: 'rgba(255, 99, 71, 0)',
            borderColor: 'rgb(255, 99, 71)',
            data: [20, 5, 8, 9, 30, 2, 45]
        }]
    },

    // Configuration options go here
    options: {
        scales: {
            yAxes: [{
                scaleLabel: {
                     display: true,
                     labelString: 'Size (kB)',
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
    }
});