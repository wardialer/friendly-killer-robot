angular.module('ChartsCtrl', [])
.controller('ChartsController', ['$scope', '$http', 'googleChartApiPromise', function($scope, $http, googleChartApiPromise) {

    $http.get('/get').success(function(readings) {

        googleChartApiPromise.then(function() {
            var countersChart = new google.visualization.DataTable();
            countersChart.addColumn("string", "Date");
            countersChart.addColumn("number", "Temperature (°C)");
            countersChart.addColumn("number", "Humidity (scaled)");
            countersChart.addColumn("number", "Light (scaled)");

            countersChart.addRows(readings.length);
            for (var i=0; i<readings.length; i++) {
                var reading = readings[i];
                var readingDate = new Date(reading.date);
                var chartDate = new Date(readingDate.getFullYear(), readingDate.getMonth(), _date.getDate(), _date.getHours(), _date.getMinutes());

                countersChart.setCell(i, 0, chartDate);
                countersChart.setCell(i, 1, reading.temp);
                countersChart.setCell(i, 2, reading.humidity.scaled);
                countersChart.setCell(i, 3, reading.light.scaled);
            }

            $scope.countersChart = {
                type: 'LineChart',
                data: countersChart,
                options: {
                    title: 'Sensors',
                    height: 500,
                    vAxes: {
                        0: {
                            title: 'Temp (Celsius)',
                            minValue: 0,
                            gridlines: {count: 5}
                        },
                        1: {
                            title: 'Values (%)',
                            minValue: 0,
                            gridlines: {count: 5}
                        }
                    },
                    hAxis: {
                        showTextEvery: Math.floor(readings.length/5)
                    },
                    series: {
                        0: {targetAxisIndex: 0},
                        1: {targetAxisIndex: 1},
                        2: {targetAxisIndex: 1}

                    },
                    legend: {
                        position: 'top',
                        maxLines: 3
                    }
                }
            };

        });
    });


}]);