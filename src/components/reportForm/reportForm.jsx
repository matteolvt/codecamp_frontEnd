import { useState } from "react";

export function ReportForm() {
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
    <form
      onSubmit={handleSubmit}
      className="max-w-2xl mx-auto p-6 bg-white shadow-md rounded-lg"
    >
      <div className="mb-4">
        <label className="block text-gray-700 font-semibold">
          Titre du signalement
        </label>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          className="w-full p-2 border rounded mt-1"
          required
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 font-semibold">Description</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          className="w-full p-2 border rounded mt-1"
          rows="4"
          required
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 font-semibold">Catégorie</label>
        <select
          name="category"
          value={formData.category}
          onChange={handleChange}
          className="w-full p-2 border rounded mt-1"
          required
        >
          <option value="">Sélectionner une catégorie</option>
          <option value="corruption">Corruption</option>
          <option value="abus-de-pouvoir">Abus de pouvoir</option>
          <option value="discrimination">Discrimination</option>
          <option value="violence">Violence</option>
        </select>
      </div>

      <div className="mb-4">
        <label className="flex items-center">
          <input
            type="checkbox"
            name="anonymous"
            checked={formData.anonymous}
            onChange={handleChange}
            className="mr-2"
          />
          Signaler anonymement
        </label>
      </div>

      <button
        type="submit"
        className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
      >
        Envoyer le signalement
      </button>
    </form>
  );
}
