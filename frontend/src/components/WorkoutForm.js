import React, { useState } from "react";
import "./WorkoutForm.css";

function WorkoutForm({ onAddWorkout }) {
  const [type, setType] = useState("");
  const [duration, setDuration] = useState("");
  const [date, setDate] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const workout = { type, duration, date };
    const response = await fetch("http://127.0.0.1:5000/api/workouts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(workout),
    });
    if (response.ok) {
      onAddWorkout(workout);
      setType("");
      setDuration("");
      setDate("");
    }
  };

  const WORKOUT_TYPES = [
    "",
    "Run",
    "Bike",
    "Stair master",
    "Elliptical",
    "Swim",
    "Lift: Chest",
    "Lift: Triceps",
    "Lift: Biceps",
    "Lift: Back",
    "Lift: Shoulders",
    "Lift: Legs",
    "Lift: Abs",
  ];

  return (
    <form onSubmit={handleSubmit} className="workout-form">
      <label className="form-element">
        <span className="form-label">Type</span>
        <select value={type} onChange={(e) => setType(e.target.value)} required>
          {WORKOUT_TYPES.map((workoutType) => (
            <option key={workoutType} value={workoutType}>
              {workoutType}
            </option>
          ))}
        </select>
      </label>
      <label className="form-element">
        <span className="form-label">Duration (minutes)</span>
        <input
          type="number"
          value={duration}
          onChange={(e) => setDuration(e.target.value)}
          required
        />
      </label>
      <label className="form-element">
        <span className="form-label">Date</span>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
        />
      </label>
      <button type="submit" className="form-element">
        Add Workout
      </button>
    </form>
  );
}

export default WorkoutForm;
