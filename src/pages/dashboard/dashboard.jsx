import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  PieChart, Pie, Cell,
  BarChart, Bar
} from "recharts";

const Dashboard = () => {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [categoryData, setCategoryData] = useState([]);
  const [cityData, setCityData] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    const userRole = localStorage.getItem("user_role");

    if (!token || userRole !== "admin") {
      navigate("/forbidden");
      return;
    }

    fetch("http://localhost:8000/api/denonciations/")
      .then((response) => response.json())
      .then((data) => {
        setData(data);
        processGraphData(data);
      })
      .catch((error) => console.error("Erreur de récupération :", error));
  }, [navigate]);

  const processGraphData = (data) => {
    const monthCounts = {};
    data.forEach((item) => {
      const month = new Date(item.date_creation).toLocaleString("fr-FR", { month: "short" });
      monthCounts[month] = (monthCounts[month] || 0) + 1;
    });
    const formattedMonthData = Object.keys(monthCounts).map((month) => ({
      name: month,
      Signalements: monthCounts[month],
    }));

    const categoryCounts = {};
    data.forEach((item) => {
      categoryCounts[item.categorie] = (categoryCounts[item.categorie] || 0) + 1;
    });
    const formattedCategoryData = Object.keys(categoryCounts).map((category) => ({
      name: category,
      value: categoryCounts[category],
    }));

    const cityCounts = {};
    data.forEach((item) => {
      cityCounts[item.localisation] = (cityCounts[item.localisation] || 0) + 1;
    });
    const formattedCityData = Object.keys(cityCounts).map((city) => ({
      name: city,
      Signalements: cityCounts[city],
    }));

    setCategoryData(formattedCategoryData);
    setCityData(formattedCityData);
    setData(formattedMonthData);
  };

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#A28EFF"];

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h2 className="text-4xl font-bold text-gray-900 text-center mb-10">📊 Dashboard Admin</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* 📈 Signalements par mois */}
        <div className="bg-white p-6 rounded-lg shadow-lg flex flex-col items-center">
          <h3 className="text-2xl font-semibold text-center mb-6">📅 Signalements par mois</h3>
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

        {/* 🥧 Répartition par catégorie */}
        <div className="bg-white p-6 rounded-lg shadow-lg flex flex-col items-center">
          <h3 className="text-2xl font-semibold text-center mb-6">📌 Répartition des signalements</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie data={categoryData} cx="50%" cy="50%" outerRadius={100} fill="#8884d8" dataKey="value" label>
                {categoryData.map((_, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* 📊 Signalements par ville */}
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
