from flask import request, jsonify
from .models import Workout
from datetime import datetime

def init_routes(app):
    @app.route('/api/workouts', methods=['POST'])
    def add_workout():
        data = request.get_json()
        new_workout = Workout(
            type=data['type'],
            duration=data['duration'],
            date=datetime.strptime(data['date'], '%Y-%m-%d')
        )
        from . import db
        db.session.add(new_workout)
        db.session.commit()
        return jsonify({'message': 'Workout added'}), 201

    @app.route('/api/workouts', methods=['GET'])
    def get_workouts():
        workouts = Workout.query.all()
        output = []
        for workout in workouts:
            workout_data = {
                'type': workout.type,
                'duration': workout.duration,
                'date': workout.date.strftime('%Y-%m-%d')
            }
            output.append(workout_data)
        return jsonify(output)
