import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import "chart.js/auto";

const WorkoutPlot = ({ workouts, setWorkouts }) => {
  const mergeWorkouts = (res) => {
    const mergedWorkouts = {};
    res.forEach((workout) => {
      if (workout.date in mergedWorkouts) {
        mergedWorkouts[workout.date].duration += workout.duration;
        mergedWorkouts[workout.date].type += ` + ${workout.duration}`;
      } else {
        mergedWorkouts[workout.date] = {
          duration: workout.duration,
          type: workout.type,
        };
      }
    });
    return mergedWorkouts;
  };

  useEffect(() => {
    const fetchWorkouts = async () => {
      try {
        const response = await fetch("http://127.0.0.1:5000/api/workouts");
        if (!response.ok) {
          console.error(`Error fetching workouts, status: ${response.status}`);
        }
        const data = await response.json();
        setWorkouts(mergeWorkouts(data));
      } catch (error) {
        console.error("Failed to fetch workouts:", error);
      }
    };
    fetchWorkouts();
  }, []);

  const data = {
    labels: Object.keys(workouts).sort((a, b) => new Date(a) - new Date(b)),
    datasets: [
      {
        label: "Workout Duration (minutes)",
        data: Object.values(workouts).map((workout) => workout.duration),
        borderColor: "rgba(75,192,192,1)",
        fill: false,
      },
    ],
  };

  return <Line data={data} />;
};

export default WorkoutPlot;
