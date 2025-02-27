import React, { useEffect, useState } from "react";
import "./actualites.css"; 

export const Actualites = () => {
  const [denonces, setDenonces] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [regionFilters, setRegionFilters] = useState([]);
  const [categoryFilters, setCategoryFilters] = useState([]);

  const regions = {
    Nord: ["Lille"],
    Sud: ["Marseille", "Toulouse"],
    Ouest: ["Bordeaux", "Nantes"],
    Est: ["Lyon", "Strasbourg"],
  };

  const categories = [
    { key: "corruption", label: "Corruption & Abus de pouvoir" },
    { key: "droits_humains", label: "Violations des droits humains" },
    { key: "fraude", label: "Fraudes & Crimes économiques" },
    { key: "sante_securite", label: "Santé publique & Sécurité" },
    { key: "maltraitance_animale", label: "Maltraitance animale" },
  ];

  // 🛠️ Fonction qui génère l'URL avec les filtres sélectionnés
  const getFilteredURL = () => {
    let url = "http://localhost:8000/api/denonciations/?";

    if (regionFilters.length > 0) {
      const cities = regionFilters.flatMap((region) => regions[region]);
      url += `localisation=${cities.join(",")}&`;
    }

    if (categoryFilters.length > 0) {
      url += `categorie=${categoryFilters.join(",")}&`;
    }

    return url;
  };

  // 🛠️ Fetch les données filtrées depuis l'API Django
  useEffect(() => {
    setLoading(true);
    fetch(getFilteredURL(), {
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Erreur lors de la récupération des dénonciations");
        }
        return res.json();
      })
      .then((data) => {
        setDenonces(data.features || []);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [regionFilters, categoryFilters]); // ⚠️ Met à jour les résultats dès qu'un filtre change

  // Gestion des filtres régions
  const toggleRegion = (region) => {
    setRegionFilters((prev) =>
      prev.includes(region)
        ? prev.filter((r) => r !== region)
        : [...prev, region]
    );
  };

  // Gestion des filtres catégories
  const toggleCategory = (category) => {
    setCategoryFilters((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  };

  return (
    <div className="actualites-container">
      <div className="content">
        {/* Filtres (à droite) */}
        <div className="filters">
          <h3>📍 Région</h3>
          {Object.keys(regions).map((region) => (
            <label key={region} className="filter-label">
              <input
                type="checkbox"
                checked={regionFilters.includes(region)}
                onChange={() => toggleRegion(region)}
              />
              {region}
            </label>
          ))}

          <h3>📌 Catégories</h3>
          {categories.map(({ key, label }) => (
            <label key={key} className="filter-label">
              <input
                type="checkbox"
                checked={categoryFilters.includes(key)}
                onChange={() => toggleCategory(key)}
              />
              {label}
            </label>
          ))}
        </div>

        {/* Affichage des dénonciations (à gauche) */}
        <div className="denonces-grid">
          {loading ? (
            <p>Chargement...</p>
          ) : error ? (
            <p className="error">{error}</p>
          ) : denonces.length === 0 ? (
            <p>Aucune dénonciation trouvée.</p>
          ) : (
            denonces.map((d) => (
              <div key={d.id} className="denonce-card">
                <h3>{d.properties.titre}</h3>
                <p>{d.properties.description}</p>
                <p>
                  <strong>Localisation :</strong> {d.properties.localisation}
                </p>
                <p>
                  <strong>Date :</strong>{" "}
                  {new Date(d.properties.date_creation).toLocaleString()}
                </p>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
