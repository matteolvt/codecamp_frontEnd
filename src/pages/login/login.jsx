import { useState } from "react";

export const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-md">
        <h2 className="text-2xl font-bold text-center text-gray-900">
          {isLogin ? "Connexion" : "Inscription"}
        </h2>

        <form className="mt-6 space-y-4">
          {!isLogin && (
            <div>
              <label className="block text-gray-700 font-medium">Nom</label>
              <input
                type="text"
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                placeholder="Votre nom"
                required
              />
            </div>
          )}

          <div>
            <label className="block text-gray-700 font-medium">Email</label>
            <input
              type="email"
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              placeholder="email@example.com"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium">
              Mot de passe
            </label>
            <input
              type="password"
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              placeholder="••••••••"
              required
            />
          </div>

          {!isLogin && (
            <div>
              <label className="block text-gray-700 font-medium">
                Confirmer le mot de passe
              </label>
              <input
                type="password"
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                placeholder="••••••••"
                required
              />
            </div>
          )}

          {isLogin && (
            <div className="text-right">
              <a href="#" className="text-blue-600 text-sm hover:underline">
                Mot de passe oublié ?
              </a>
            </div>
          )}

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-bold hover:bg-blue-700 transition"
          >
            {isLogin ? "Se connecter" : "S'inscrire"}
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
