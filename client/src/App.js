import React, { useEffect, useState } from "react";
import ReactMapGL, { Marker, Popup } from "react-map-gl";
import RoomIcon from "@material-ui/icons/Room";
import StarIcon from "@material-ui/icons/Star";
import "./App.css";
import axios from "axios";
import { format } from "timeago.js";

function App() {
    const currentUser = "John Doe";
    const [pins, setPins] = useState([]);
    const [currentPlaceId, setCurrentPlaceId] = useState(null);
    const [newPlace, setNewPlace] = useState(null);

    const [title, setTitle] = useState(null);
    const [desc, setDesc] = useState(null);
    const [rating, setRating] = useState(0);

    const [viewport, setViewport] = useState({
        width: "100vw",
        height: "100vh",
        latitude: 28.6139,
        longitude: 77.209,
        zoom: 4,
    });

    useEffect(() => {
        const getPins = async () => {
            try {
                const res = await axios.get("/pins");
                console.log(res);
                setPins(res.data.data);
            } catch (err) {
                console.log(err);
            }
        };
        getPins();
    }, []);

    const handleMarkerClick = (id, lat, long) => {
        setCurrentPlaceId(id);
        setViewport({
            ...viewport,
            latitude: lat,
            longitude: long,
        });
    };

    const handleAddClick = (event) => {
        const [long, lat] = event.lngLat;
        setNewPlace({
            lat,
            long,
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const newPin = {
            username: currentUser,
            title: title,
            description: desc,
            rating: rating,
            latitude: newPlace.lat,
            longitude: newPlace.long,
        };
        try {
            const res = await axios.post("/pins", newPin);
            setPins([...pins, res.data]);
            setNewPlace(null);
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div>
            <ReactMapGL
                {...viewport}
                onViewportChange={(nextViewport) => setViewport(nextViewport)}
                mapboxApiAccessToken={process.env.REACT_APP_MAPBOX}
                mapStyle="mapbox://styles/firebolt667/cksblhh6g61bi17qp01sa18de"
                onDblClick={handleAddClick}
                transitionDuration="200"
            >
                {pins.map((pin) => {
                    return (
                        <>
                            <Marker
                                latitude={pin.latitude}
                                longitude={pin.longitude}
                                offsetLeft={-viewport.zoom * 3.5}
                                offsetTop={-viewport.zoom * 7}
                            >
                                <RoomIcon
                                    style={{
                                        fontSize: viewport.zoom * 7,
                                        color:
                                            pin.username === currentUser
                                                ? "#fa8128"
                                                : "slateblue",
                                        cursor: "pointer",
                                    }}
                                    onClick={() =>
                                        handleMarkerClick(
                                            pin._id,
                                            pin.latitude,
                                            pin.longitude
                                        )
                                    }
                                />
                            </Marker>
                            {pin._id === currentPlaceId && (
                                <Popup
                                    latitude={pin.latitude}
                                    longitude={pin.longitude}
                                    closeButton={true}
                                    closeOnClick={false}
                                    anchor="left"
                                    onClose={() => {
                                        setCurrentPlaceId(null);
                                    }}
                                >
                                    <div className="card">
                                        <div>
                                            <label>Place</label>
                                            <div className="place">
                                                {pin.title}
                                            </div>
                                        </div>

                                        <div>
                                            <label>Review</label>
                                            <div className="desc">
                                                Great place
                                            </div>
                                        </div>

                                        <div>
                                            <label>Rating</label>
                                            <div>
                                                {Array(pin.rating).fill(
                                                    <StarIcon className="star"></StarIcon>
                                                )}
                                            </div>
                                        </div>
                                        <div>
                                            <label>Information</label>
                                            <div>
                                                Created By
                                                <span className="username">
                                                    {" "}
                                                    {pin.username}
                                                </span>
                                                <br />
                                                <span className="date">
                                                    {format(pin.createdAt)}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </Popup>
                            )}
                        </>
                    );
                })}
                {newPlace && (
                    <Popup
                        latitude={newPlace.lat}
                        longitude={newPlace.long}
                        closeButton={true}
                        closeOnClick={false}
                        anchor="left"
                        onClose={() => {
                            setNewPlace(null);
                        }}
                    >
                        <div>
                            <form onSubmit={handleSubmit}>
                                <label>Title</label>
                                <input
                                    placeholder="Enter a title"
                                    autoFocus
                                    onChange={(e) => setTitle(e.target.value)}
                                />
                                <label>Description</label>
                                <textarea
                                    placeholder="Say us something about this place."
                                    onChange={(e) => setDesc(e.target.value)}
                                />
                                <label>Rating</label>
                                <select
                                    onChange={(e) => setRating(e.target.value)}
                                >
                                    <option value="1">1</option>
                                    <option value="2">2</option>
                                    <option value="3">3</option>
                                    <option value="4">4</option>
                                    <option value="5">5</option>
                                </select>
                                <button type="submit" className="submitButton">
                                    Add Pin
                                </button>
                            </form>
                        </div>
                    </Popup>
                )}
            </ReactMapGL>
        </div>
    );
}

export default App;
