import React, { useState } from "react";
import WorkoutForm from "./components/WorkoutForm";
import WorkoutPlot from "./components/WorkoutPlot";
import "./styles.css";

function App() {
  const [workouts, setWorkouts] = useState({});

  return (
    <div>
      <div className="app">
        <h1>Workout Log</h1>
        <WorkoutForm workouts={workouts} setWorkouts={setWorkouts} />
        <WorkoutPlot workouts={workouts} setWorkouts={setWorkouts} />
      </div>
    </div>
  );
}

export default App;
