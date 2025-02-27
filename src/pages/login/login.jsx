import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      console.log("🔹 Tentative de connexion avec :", { username, password });

      const response = await fetch("http://127.0.0.1:8000/api/token/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }), // Django attend "username"
      });

      if (!response.ok) {
        throw new Error("❌ Identifiants incorrects !");
      }

      const data = await response.json();
      console.log("✅ Token reçu :", data);

      localStorage.setItem("access_token", data.access);
      localStorage.setItem("refresh_token", data.refresh);

      // 🔹 Vérifier si l'utilisateur est admin via l'API backend
      const userResponse = await fetch("http://127.0.0.1:8000/api/user/", {
        headers: { Authorization: `Bearer ${data.access}` },
      });

      if (!userResponse.ok) {
        throw new Error("⚠️ Impossible de récupérer les infos utilisateur !");
      }

      const userData = await userResponse.json();
      console.log("👤 Infos utilisateur :", userData);

      // ✅ Stockage du rôle utilisateur
      if (userData.is_admin) {
        console.log("✅ Redirection vers /dashboard");
        localStorage.setItem("user_role", "admin");
        navigate("/dashboard");
      } else {
        console.log("✅ Redirection vers page d'accueil");
        localStorage.setItem("user_role", "user");
        navigate("/");
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-md">
        <h2 className="text-2xl font-bold text-center text-gray-900">
          {isLogin ? "Connexion" : "Inscription"}
        </h2>

        {error && <p className="text-red-500 text-center mt-2">{error}</p>} {/* 🔥 Affichage des erreurs */}

        <form className="mt-6 space-y-4" onSubmit={handleLogin}>
          <div>
            <label className="block text-gray-700 font-medium">Nom d'utilisateur</label>
            <input
              type="text"
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              placeholder="Votre nom d'utilisateur"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium">Mot de passe</label>
            <input
              type="password"
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-bold hover:bg-blue-700 transition disabled:opacity-50"
            disabled={loading}
          >
            {loading ? "Connexion..." : isLogin ? "Se connecter" : "S'inscrire"}
          </button>
        </form>

        <p className="mt-4 text-center text-gray-600">
          {isLogin ? "Pas encore de compte ?" : "Déjà un compte ?"}
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="text-blue-600 font-bold ml-2 hover:underline"
          >
            {isLogin ? "Inscrivez-vous" : "Connectez-vous"}
          </button>
        </p>
      </div>
    </div>
  );
};
