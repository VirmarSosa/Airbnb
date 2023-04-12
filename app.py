from sqlalchemy import create_engine, Table, MetaData, func
from sqlalchemy.orm import scoped_session, sessionmaker
from sqlalchemy.ext.automap import automap_base
from flask import Flask, jsonify, request

engine = create_engine("sqlite:///Resources/airbnb_data.db")
metadata = MetaData()
metadata.reflect(bind=engine)
Base = automap_base()
Base.prepare(engine, reflect=True)

airbnb = Base.classes.airbnb_clean

session_factory = sessionmaker(bind=engine)
Session = scoped_session(session_factory)

app = Flask(__name__)
app.config['JSON_SORT_KEYS'] = False

@app.teardown_request
def remove_session(*args):
    Session.remove()

@app.route("/")
def welcome():
    return (
        "Welcome To The Mealbourne Airbnb Data API<br/>"
        "We Currently Offer Data On Over 20k Airbnbs In Melbourne <br/>"
        "Available Routes:<br/>"
        "/api/v1.0/GeoJson<br/>"
        "/api/v1.0/players<br/>"
        "/api/v1.0/teams/name<br/>"
        "/api/v1.0/players/name<br/>"
        "<p> /team/'name' should be full name of desired team with '_' in spaces. For example new york giants =  New_York_Giants"
        "<p> /players/'name' should be full name of player with spaces for example 'Saquon Barkley' "
    )

@app.route("/api/v1.0/GeoJson")
def all():
    features = {
        "type": "FeatureCollection",
        "features": []
    }
    for row in Session.query(airbnb).all():
        feature = {
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [row.Longitude, row.Latitude]
            },
            "properties": {
                "description": row.Description,
                "host_name": row.Host_Name,
                "index": row.index
            }
        }
        features["features"].append(feature)
    return jsonify(features)

if __name__ == "__main__":
    app.run(debug=True)
