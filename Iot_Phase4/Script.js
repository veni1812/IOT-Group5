document.addEventListener("DOMContentLoaded", function () {
    let useRealData = true; // Set to true to fetch real data, or false to simulate data

    // Function to fetch real sensor data
    function fetchSensorData() {
        fetch('https://your-real-data-source.com/sensors')
            .then(response => response.json())
            .then(data => {
                updateSensorDisplay(data); // Update the sensor display with real data
            })
            .catch(error => {
                console.error('Error fetching real sensor data: ' + error);
                // If there's an error, fall back to simulating data
                useRealData = false;
                simulateSensorData();
            });
    }

    // Function to simulate sensor data
    function simulateSensorData() {
        const sensors = [
            { name: "Sensor 1", location: "Location A", waterLevel: Math.random() * 1 },
            { name: "Sensor 2", location: "Location B", waterLevel: Math.random() * 1 },
        ];

        updateSensorDisplay(sensors);
    }

    // Function to update the sensor display with data
    function updateSensorDisplay(sensors) {
        const sensorList = document.getElementById("sensor-list");

        // Clear the existing sensor list
        sensorList.innerHTML = '';

        sensors.forEach(sensor => {
            const li = document.createElement("li");
            li.textContent = sensor.name;
            li.addEventListener("click", () => displayWaterLevel(sensor));
            sensorList.appendChild(li);
        });
    }

    // Display water level data for a selected sensor
    function displayWaterLevel(sensor) {
        const waterLevelChart = document.getElementById("water-level-chart");
        waterLevelChart.innerHTML = `<h3>${sensor.name} - ${sensor.location}</h3><p>Water Level: ${sensor.waterLevel}</p>`;
    }

    // Add functionality to test flood warning button
    const testWarningButton = document.getElementById("test-warning-button");
    const warningMessage = document.getElementById("warning-message");

    testWarningButton.addEventListener("click", () => {
        // Simulate a flood warning
        warningMessage.innerText = "Flood warning! Evacuate immediately!";
        
        // You would trigger the buzzer or alarm here (hardware implementation is not shown)
    });

    // Determine whether to use real data or simulate data
    if (useRealData) {
        fetchSensorData(); // Fetch real data
    } else {
        simulateSensorData(); // Simulate data
    }
});