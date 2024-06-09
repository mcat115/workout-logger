import React, { useEffect } from "react";
import { Line } from "react-chartjs-2";
import "chart.js/auto";
import "../styles.css";

const WorkoutPlot = ({ workouts, setWorkouts }) => {
  const mergeWorkouts = (res) => {
    const totalWorkouts = {};

    res.forEach((exercise) => {
      if (exercise.date in totalWorkouts) {
        totalWorkouts[exercise.date].duration += exercise.duration;
        totalWorkouts[exercise.date].type += ` + ${exercise.type}`;
      } else {
        totalWorkouts[exercise.date] = {
          duration: exercise.duration,
          type: exercise.type,
        };
      }
    });

    return totalWorkouts;
  };

  useEffect(() => {
    const fetchWorkouts = async () => {
      try {
        const response = await fetch("http://127.0.0.1:5000/api/workouts");

        if (response.ok) {
          const jsonRes = await response.json();
          setWorkouts(mergeWorkouts(jsonRes));
        } else {
          console.error(`Error fetching workouts, status: ${response.status}`);
        }
      } catch (error) {
        console.error("Failed to fetch workouts: ", error);
      }
    };
    fetchWorkouts();
  }, []);

  const chartValues = Object.entries(workouts)
    .sort((a, b) => new Date(a[0]) - new Date(b[0]))
    .reduce(
      (output, [date, workout]) => {
        // Add dates to x axis labels
        output.labels.push(date);
        // Add durations to y axis labels and workout types to tooltip labels
        output.data.push({
          x: date,
          y: workout.duration,
          type: workout.type,
        });
        return output;
      },
      { labels: [], data: [] }
    );

  const data = {
    labels: chartValues.labels,
    datasets: [
      {
        label: "Workout Duration (minutes)",
        data: chartValues.data,
        borderColor: "rgba(75,92,192,1)",
        fill: false,
      },
    ],
  };

  const options = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
    plugins: {
      legend: {
        onClick: null,
      },
      tooltip: {
        callbacks: {
          label: (data) => {
            return `Total duration: ${data.raw.y} minutes, Type: ${data.raw.type}`;
          },
        },
      },
    },
  };

  return <Line data={data} options={options} className="graph" />;
};

export default WorkoutPlot;
