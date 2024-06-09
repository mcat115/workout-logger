import React, { useState } from "react";
import WorkoutForm from "./components/WorkoutForm";
import WorkoutPlot from "./components/WorkoutPlot";

function App() {
  const [workouts, setWorkouts] = useState({});

  return (
    <div>
      <h1>Workout Log</h1>
      <WorkoutForm workouts={workouts} setWorkouts={setWorkouts} />
      <WorkoutPlot workouts={workouts} setWorkouts={setWorkouts} />
    </div>
  );
}

export default App;
