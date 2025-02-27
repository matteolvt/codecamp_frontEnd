import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "./map.css";
const API_URL = "http://localhost:8000/api/denonciations/";

export const Map = () => {
  const [denonciations, setDenonciations] = useState([]);

  useEffect(() => {
    const fetchDenonciations = async () => {
      try {
        const token = localStorage.getItem("access_token"); // Récupération du token JWT
        const headers = token ? { Authorization: `Bearer ${token}` } : {};

        const response = await fetch(API_URL, { headers });
        if (!response.ok)
          throw new Error("Erreur lors du chargement des données");

        const data = await response.json();
        setDenonciations(data);
      } catch (error) {
        console.error("Erreur de récupération :", error);
      }
    };

    fetchDenonciations();
  }, []);

  return (
    <MapContainer
      center={[48.8566, 2.3522]}
      zoom={13}
      minZoom={2} // Permet de dézoomer mais pas en-dessous du niveau 10
      maxZoom={13} // Empêche de zoomer au-delà du niveau 13
      scrollWheelZoom={false} // Activation du zoom à la molette
      touchZoom={true} // Activation du zoom tactile
      doubleClickZoom={true} // Activation du zoom au double-clic
      style={{
        height: "500px",
        width: "100%",
        marginBottom: "30px",
      }}
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

      {denonciations.map(
        (denonciation) =>
          denonciation.point && (
            <Marker
              key={denonciation.id}
              position={[
                denonciation.point.coordinates[1],
                denonciation.point.coordinates[0],
              ]}
            >
              <Popup>
                <strong>Catégorie :</strong> {denonciation.categorie}
                <br />
                <strong>Localisation :</strong> {denonciation.localisation}
              </Popup>
            </Marker>
          )
      )}
    </MapContainer>
  );
};
