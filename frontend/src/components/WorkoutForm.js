import React, { useState } from 'react';

function WorkoutForm({ onAddWorkout }) {
    const [type, setType] = useState('');
    const [duration, setDuration] = useState('');
    const [date, setDate] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const workout = { type, duration, date };
        const response = await fetch('/api/workouts', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(workout),
        });
        if (response.ok) {
            onAddWorkout(workout);
            setType('');
            setDuration('');
            setDate('');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <label>
                Type:
                <input type="text" value={type} onChange={(e) => setType(e.target.value)} required />
            </label>
            <label>
                Duration (minutes):
                <input type="number" value={duration} onChange={(e) => setDuration(e.target.value)} required />
            </label>
            <label>
                Date:
                <input type="date" value={date} onChange={(e) => setDate(e.target.value)} required />
            </label>
            <button type="submit">Add Workout</button>
        </form>
    );
}

export default WorkoutForm;
