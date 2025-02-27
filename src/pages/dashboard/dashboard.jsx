import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  PieChart, Pie, Cell,
  BarChart, Bar
} from "recharts";

const API_URL = "http://localhost:8000/api/denonciations/";
const USER_API = "http://localhost:8000/api/user/"; // Route pour récupérer les infos de l'utilisateur

const Dashboard = () => {
  const navigate = useNavigate();
  const [data, setData] = useState([]); // Signalements par jour
  const [categoryData, setCategoryData] = useState([]);
  const [cityData, setCityData] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // État de chargement

  useEffect(() => {
    const token = localStorage.getItem("access_token");

    if (!token) {
      navigate("/forbidden");
      return;
    }

    try {
      const decodedToken = jwtDecode(token);
      if (decodedToken.exp * 1000 < Date.now()) {
        localStorage.removeItem("access_token");
        navigate("/login"); // Rediriger si le token est expiré
        return;
      }
    } catch (error) {
      console.error("Erreur lors du décodage du token:", error);
      navigate("/forbidden");
      return;
    }

    // Vérifier si l'utilisateur est admin via le backend
    fetch(USER_API, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((userData) => {
        if (!userData.is_admin) {
          navigate("/forbidden");
          return;
        }

        fetch(API_URL)
          .then((response) => response.json())
          .then((apiData) => {
            processGraphData(apiData);
            setIsLoading(false); // Fin du chargement
          })
          .catch((error) => {
            console.error("Erreur de récupération des dénonciations :", error);
            setIsLoading(false);
          });
      })
      .catch((error) => {
        console.error("Erreur lors de la récupération de l'utilisateur :", error);
        navigate("/forbidden");
      });
  }, [navigate]);

  const processGraphData = (apiData) => {
    // Vérifier si la réponse contient une FeatureCollection
    const items = apiData.features ? apiData.features : apiData;

    const dayCounts = {};
    const categoryCounts = {};
    const cityCounts = {};

    items.forEach((item) => {
      // Extraire les données depuis properties si elles existent
      const properties = item.properties || item;
      const { date_creation, categorie, localisation } = properties;

      // Comptage par jour : format de date local (ex: "26/02/2025")
      const day = new Date(date_creation).toLocaleDateString("fr-FR");
      dayCounts[day] = (dayCounts[day] || 0) + 1;

      // Comptage par catégorie
      categoryCounts[categorie] = (categoryCounts[categorie] || 0) + 1;

      // Comptage par ville
      cityCounts[localisation] = (cityCounts[localisation] || 0) + 1;
    });

    const formattedDayData = Object.keys(dayCounts).map((day) => ({
      name: day,
      Signalements: dayCounts[day],
    }));

    const formattedCategoryData = Object.keys(categoryCounts).map((category) => ({
      name: category,
      value: categoryCounts[category],
    }));

    const formattedCityData = Object.keys(cityCounts).map((city) => ({
      name: city,
      Signalements: cityCounts[city],
    }));

    setData(formattedDayData);
    setCategoryData(formattedCategoryData);
    setCityData(formattedCityData);
  };

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#A28EFF"];

  if (isLoading) {
    return <div className="text-center text-gray-700">Chargement...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h2 className="text-4xl font-bold text-gray-900 text-center mb-10">📊 Dashboard Admin</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Signalements par jour */}
        <div className="bg-white p-6 rounded-lg shadow-lg flex flex-col items-center">
          <h3 className="text-2xl font-semibold text-center mb-6">📅 Signalements par jour</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="Signalements" stroke="#8884d8" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Répartition par catégorie */}
        <div className="bg-white p-6 rounded-lg shadow-lg flex flex-col items-center">
          <h3 className="text-2xl font-semibold text-center mb-6">📌 Répartition des signalements</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={categoryData}
                cx="50%"
                cy="50%"
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
                label
              >
                {categoryData.map((_, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Signalements par ville */}
        <div className="bg-white p-6 rounded-lg shadow-lg col-span-1 md:col-span-2 flex flex-col items-center">
          <h3 className="text-2xl font-semibold text-center mb-6">📍 Signalements par ville</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={cityData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="Signalements" fill="#82ca9d" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
