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

The app is currently hard coded to only work locally in my environment. Search for "mcatanese" to find any paths that will need to be changed based on your machine if you want to run it yourself.

Database uses Postgres and in my case is titled workoutdb.
Set up Postgres and database based on your environment.
Go into the config.py folder and replace values based on your configuration.
