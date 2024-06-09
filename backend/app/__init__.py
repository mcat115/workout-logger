from flask import Flask
from .models import db
from .routes import init_routes
from config import SQLALCHEMY_DATABASE_URI

def create_app():
    app = Flask(__name__)
    
    # Configuration and database setup
    app.config['SQLALCHEMY_DATABASE_URI'] = SQLALCHEMY_DATABASE_URI
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
    
    db.init_app(app)
    
    # Initialize routes
    init_routes(app)
    
    return app
