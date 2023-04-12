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
                "coordinates": [row.longitude, row.latitude]
            },
            "properties": {
                "description": row.description,
                "host_name": row.host_name,
                "index": row.index
            }
        }
        features["features"].append(feature)
    return jsonify(features)

if __name__ == "__main__":
    app.run(debug=True)
