import { useState } from "react";

export const ReportForm = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    anonymous: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Données soumises :", formData);
  };

  return (
    <div className="w-full min-h-[80vh] flex items-center justify-center bg-gray-100 p-2">
      <div className="w-full max-w-3xl bg-white p-6 rounded-2xl shadow-xl">
        <h2 className="text-3xl font-extrabold mb-6 text-gray-900 text-center">
          🚨 Faites entendre votre voix !
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4 w-full">
          {/* Titre */}
          <div>
            <label className="block text-gray-700 font-semibold">
              Titre du signalement
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="w-full p-3 mt-2 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500"
              required
              placeholder="Ex : Corruption dans mon quartier"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-gray-700 font-semibold">
              Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="w-full p-3 mt-2 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500"
              rows="5"
              required
              placeholder="Expliquez la situation en détail..."
            />
          </div>

          {/* Catégorie */}
          <div>
            <label className="block text-gray-700 font-semibold">
              Catégorie
            </label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full p-3 mt-2 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500"
              required
            >
              <option value="">Sélectionnez une catégorie</option>
              <option value="corruption">Corruption</option>
              <option value="abus-de-pouvoir">Abus de pouvoir</option>
              <option value="discrimination">Discrimination</option>
              <option value="violence">Violence</option>
              <option value="autre">Autre</option>
            </select>
          </div>

          {/* Signalement anonyme */}
          <div className="flex items-center gap-4">
            <input
              type="checkbox"
              name="anonymous"
              checked={formData.anonymous}
              onChange={handleChange}
              className="w-6 h-6 accent-red-600 rounded-md"
            />
            <label className="text-gray-700 font-semibold">
              Signaler anonymement
            </label>
          </div>

          {/* Bouton de soumission */}
          <button
            type="submit"
            className="w-full bg-red-600 text-white py-3 rounded-xl text-lg font-bold transition-all hover:bg-red-700 shadow-lg"
          >
            🚀 Envoyer le signalement
          </button>
        </form>
      </div>
    </div>
  );
};
