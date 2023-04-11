import datetime as dt
import numpy as np
from sqlalchemy import *
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, func
from sqlalchemy import Table, MetaData
from flask import Flask, jsonify, request
from sqlalchemy import create_engine, MetaData


engine = create_engine("sqlite:///Resources/sport_caps.db")
metadata = MetaData()
metadata.reflect(bind=engine)
Base = automap_base()
Base.prepare(engine)

data = Base.classes.airbnb_data
Players = Base.classes.Players

session = Session(engine)

app = Flask(__name__)
app.config['JSON_SORT_KEYS'] = False

from flask import request
def shutdown_server():
    func = request.environ.get('werkzeug.server.shutdown')
    if func is None:
        raise RuntimeError('Not running with the Werkzeug Server')
    func()
    
@app.route('/shutdown', methods=['POST'])
def shutdown():
    shutdown_server()
    return 'Server shutting down...'
@app.route("/")
def welcome():
    return(
        f"Welcome To The Sport Cap API<br/>"
        f"We Currently Offer Cap/Salary #s for Football <br/>"
        f"Available Routes:<br/>"
        f"/api/v1.0/teams<br/>"
        f"/api/v1.0/players<br/>"
        f"/api/v1.0/teams/name<br/>"
        f"/api/v1.0/players/name<br/>"
        f"<p> /team/'name' should be full name of desired team with '_' in spaces. For example new york giants =  New_York_Giants"
        f"<p> /players/'name' should be full name of player with spaces for example 'Saquon Barkley' "
    )
