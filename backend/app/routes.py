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

    @app.route('/api/workouts', methods=['DELETE'])
    def delete_all_workouts():
        from . import db
        try:
            num_deleted = db.session.query(Workout).delete()
            db.session.commit()
            return jsonify({'message': f'{num_deleted} workouts deleted'}), 200
        except Exception as e:
            db.session.rollback()
            return jsonify({'error': str(e)}), 500