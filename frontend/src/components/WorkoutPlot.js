import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import 'chart.js/auto';

function WorkoutPlot() {
    const [workouts, setWorkouts] = useState([]);

    useEffect(() => {
        const fetchWorkouts = async () => {
            const response = await fetch('/api/workouts');
            const data = await response.json();
            setWorkouts(data);
        };
        fetchWorkouts();
    }, []);

    const data = {
        labels: workouts.map(workout => workout.date),
        datasets: [
            {
                label: 'Workout Duration (minutes)',
                data: workouts.map(workout => workout.duration),
                borderColor: 'rgba(75,192,192,1)',
                fill: false,
            },
        ],
    };

    return <Line data={data} />;
}

export default WorkoutPlot;
