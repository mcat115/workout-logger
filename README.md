To setup this app:
in the backend folder
```
python3 -m venv venv # Use python instead of python3 if on Windows
pip install -r requirements.txt
```
in the frontend folder
```
npm install
```

To start the app locally:
in the backend folder
```
source venv/bin/activate  # On Windows use `venv\Scripts\activate`
export FLASK_APP=app
export FLASK_ENV=development
flask run
```
in the frontend folder
```
npm start
```

Database is titled workoutdb and uses a Postgres
Set up Postgres and database based on your environment
Go into the config.py folder and replace values based on your configuration