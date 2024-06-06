import React, { useState } from 'react';
import WorkoutForm from './components/WorkoutForm';
import WorkoutPlot from './components/WorkoutPlot';

function App() {
    const [workouts, setWorkouts] = useState([]);

    const handleAddWorkout = (workout) => {
        setWorkouts([...workouts, workout]);
    };

    return (
        <div>
            <h1>Workout Tracker</h1>
            <WorkoutForm onAddWorkout={handleAddWorkout} />
            <WorkoutPlot />
        </div>
    );
}

export default App;
