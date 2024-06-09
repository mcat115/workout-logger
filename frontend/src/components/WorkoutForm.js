import React, { useState } from "react";
import "./WorkoutForm.css";

const WorkoutForm = ({ workouts, setWorkouts }) => {
  const [type, setType] = useState("");
  const [duration, setDuration] = useState("");
  const [date, setDate] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (parseInt(duration) <= 0 || parseInt(duration) > 360) {
      alert("Workout length cannot be negative, zero, or over 6 hours.");
      return;
    }

    const workout = { type, duration, date };

    try {
      const response = await fetch("http://127.0.0.1:5000/api/workouts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(workout),
      });

      if (!response.ok) {
        console.error;
      }

      const updatedWorkouts = { ...workouts };

      if (date in updatedWorkouts) {
        updatedWorkouts[date] = {
          duration: updatedWorkouts[date].duration + parseInt(duration),
          type: `${updatedWorkouts[date].type} + ${type}`,
        };
      } else {
        updatedWorkouts[date] = { duration: parseInt(duration), type };
      }

      setWorkouts(updatedWorkouts);

      setType("");
      setDuration("");
      setDate("");
    } catch (error) {
      console.error("Error creating workout:", error);
    }
  };

  const handleDelete = async () => {
    const isConfirmed = window.confirm(
      "Are you sure you want to delete all workouts?"
    );

    if (isConfirmed) {
      try {
        const response = await fetch("http://127.0.0.1:5000/api/workouts", {
          method: "DELETE",
        });
        if (response.ok) {
          setWorkouts({});
        } else {
          console.error("Error deleting workouts");
        }
      } catch (error) {
        console.error("Error deleting workouts:", error);
      }
    }
  };

  const WORKOUT_TYPES = [
    "",
    "Run",
    "Bike",
    "Stair master",
    "Elliptical",
    "Swim",
    "Lift - Chest",
    "Lift - Triceps",
    "Lift - Biceps",
    "Lift - Back",
    "Lift - Shoulders",
    "Lift - Legs",
    "Lift - Abs",
  ];

  return (
    <div>
      <form onSubmit={handleSubmit} className="workout-form">
        <label className="form-element">
          <span className="form-label">Type</span>
          <select
            value={type}
            onChange={(e) => setType(e.target.value)}
            required
          >
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
      <form onSubmit={handleDelete} className="delete-button">
        <button type="submit">Clear Workout History</button>
      </form>
    </div>
  );
};

export default WorkoutForm;
