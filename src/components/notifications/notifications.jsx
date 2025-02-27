import React, { useEffect, useState } from "react";
import "./notifications.css";

export const Notifications = () => {
  const [notifications, setNotifications] = useState([]);
  const [lastDenonciationId, setLastDenonciationId] = useState(null);

  useEffect(() => {
    const fetchDenonciations = async () => {
      try {
        const response = await fetch("http://localhost:8000/api/denonciations/");
        if (!response.ok) throw new Error("Erreur lors de la récupération des signalements");

        const data = await response.json();
        const denonciations = data.features || [];

        if (denonciations.length > 0) {
          const newestDenonciation = denonciations[0];

          if (lastDenonciationId && newestDenonciation.id !== lastDenonciationId) {
            setNotifications((prev) => [
              `📢 Nouveau signalement : ${newestDenonciation.properties.titre} (${newestDenonciation.properties.localisation})`,
              ...prev
            ]);
          }

          setLastDenonciationId(newestDenonciation.id);
        }
      } catch (error) {
        console.error("Erreur lors de la récupération des signalements :", error);
      }
    };

    fetchDenonciations();
    const interval = setInterval(fetchDenonciations, 10000);

    return () => clearInterval(interval);
  }, [lastDenonciationId]);

  return (
    <div className="notification-container">
      <h3>🔔 Notifications</h3>
      <ul>
        {notifications.map((notif, index) => (
          <li key={index} className="notif-item">{notif}</li>
        ))}
      </ul>
    </div>
  );
};
