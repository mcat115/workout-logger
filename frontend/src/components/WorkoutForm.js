import React, { useState } from "react";
import "../styles.css";

const WorkoutForm = ({ workouts, setWorkouts }) => {
  const [type, setType] = useState("");
  const [duration, setDuration] = useState("");
  const [date, setDate] = useState("");

  const WORKOUT_TYPES = [
    "",
    "Run",
    "Bike",
    "Stair master",
    "Elliptical",
    "Swim",
    "Lift - Chest",
    "Lift - Triceps",
    "Lift - Back",
    "Lift - Biceps",
    "Lift - Shoulders",
    "Lift - Legs",
    "Lift - Abs",
    "Other",
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (parseFloat(duration) <= 0 || parseFloat(duration) > 360) {
      alert("Workout length cannot be negative, zero, or over 6 hours.");
    } else {
      try {
        const response = await fetch("http://127.0.0.1:5000/api/workouts", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ type, duration, date }),
        });

        if (response.ok) {
          const updatedWorkouts = { ...workouts };

          if (date in updatedWorkouts) {
            updatedWorkouts[date] = {
              duration: updatedWorkouts[date].duration + parseFloat(duration),
              type: `${updatedWorkouts[date].type} + ${type}`,
            };
          } else {
            updatedWorkouts[date] = { duration: parseFloat(duration), type };
          }

          setWorkouts(updatedWorkouts);
          setType("");
          setDuration("");
          setDate("");
        } else {
          console.error(`Error creating workout, status: ${response.status}`);
        }
      } catch (error) {
        console.error("Error creating workout: ", error);
      }
    }
  };

  const handleDelete = async () => {
    try {
      const response = await fetch("http://127.0.0.1:5000/api/workouts", {
        method: "DELETE",
      });

      if (response.ok) {
        setWorkouts({});
      } else {
        console.error(`Error deleting workout, status: ${response.status}`);
      }
    } catch (error) {
      console.error("Error deleting workouts: ", error);
    }
  };

  return (
    <div className="forms-container">
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
          <button type="submit" className="form-element clickable">
            Add Workout
          </button>
        </form>
      </div>
      <div>
        <form onSubmit={handleDelete} className="delete-button">
          <button type="submit" className="clickable">
            Clear Workout History
          </button>
        </form>
      </div>
    </div>
  );
};

export default WorkoutForm;
