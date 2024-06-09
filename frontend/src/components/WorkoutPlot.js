import React, { useEffect } from "react";
import { Line } from "react-chartjs-2";
import "chart.js/auto";

const WorkoutPlot = ({ workouts, setWorkouts }) => {
  const mergeWorkouts = (res) => {
    const mergedWorkouts = {};

    res.forEach((workout) => {
      if (workout.date in mergedWorkouts) {
        mergedWorkouts[workout.date].duration += workout.duration;
        mergedWorkouts[workout.date].type += ` + ${workout.type}`;
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

  const sortedWorkouts = Object.entries(workouts).sort(
    (a, b) => new Date(a[0]) - new Date(b[0])
  );

  const dataWithTypes = sortedWorkouts.map(([_, workout]) => ({
    x: workout.duration,
    y: workout.duration,
    type: workout.type,
  }));

  const chartData = {
    labels: sortedWorkouts.map(([date, _]) => date),
    datasets: [
      {
        label: "Workout Duration (minutes)",
        data: dataWithTypes,
        borderColor: "rgba(75,192,192,1)",
        fill: false,
      },
    ],
  };

  const chartOptions = {
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
          label: function (context) {
            const type = context.raw.type;
            const duration = context.raw.y;
            return `Total duration: ${duration} minutes, Type: ${type}`;
          },
        },
      },
    },
  };

  return <Line data={chartData} options={chartOptions} />;
};

export default WorkoutPlot;
