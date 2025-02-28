export const InfosRessources = () => {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center px-6 py-12">
        <div className="max-w-5xl bg-white p-10 rounded-xl shadow-lg text-center">
          {/* 🌟 Titre principal */}
          <h1 className="text-4xl font-bold text-gray-900 mb-6">🗂 Infos & Ressources</h1>
          <p className="text-lg text-gray-700 leading-relaxed mb-8">
            Retrouvez ici toutes les informations et ressources utiles pour mieux comprendre vos droits, les procédures et les aides disponibles**.
          </p>
  
          {/* 📖 Guides & Articles */}
          <div className="mb-8 p-6 border-l-4 border-blue-600 bg-blue-50 rounded-lg shadow-sm text-left">
            <h2 className="text-2xl font-semibold text-gray-900 mb-3">📖 Guides & Articles</h2>
            <ul className="list-disc list-inside text-gray-700">
              <li>📌 Comment déposer un signalement ?</li>
              <li>📌 Les protections pour les lanceurs d’alerte</li>
              <li>📌 Que faire en cas de représailles ?</li>
            </ul>
          </div>
  
          {/* 🗂 Liens Utiles */}
          <div className="mb-8 p-6 border-l-4 border-yellow-500 bg-yellow-50 rounded-lg shadow-sm text-left">
            <h2 className="text-2xl font-semibold text-gray-900 mb-3">🗂 Liens Utiles</h2>
            <ul className="list-disc list-inside text-gray-700">
              <li>🔗 <a href="https://www.service-public.fr/" className="text-blue-600 hover:underline">Service Public</a></li>
              <li>🔗 <a href="https://www.defenseurdesdroits.fr/" className="text-blue-600 hover:underline">Défenseur des Droits</a></li>
              <li>🔗 <a href="https://www.transparency.org/" className="text-blue-600 hover:underline">Transparency International</a></li>
            </ul>
          </div>
  
          {/* 📜 Lois & Régulations */}
          <div className="mb-8 p-6 border-l-4 border-green-600 bg-green-50 rounded-lg shadow-sm text-left">
            <h2 className="text-2xl font-semibold text-gray-900 mb-3">📜 Lois & Régulations</h2>
            <p className="text-gray-700">
              Découvrez les lois protégeant les lanceurs d’alerte et les citoyens engagés :
            </p>
            <ul className="list-disc list-inside text-gray-700 mt-2">
              <li>⚖️ Loi Sapin 2 (2016) – Protection des lanceurs d’alerte</li>
              <li>⚖️ Article 40 du Code de procédure pénale – Obligation de signalement</li>
            </ul>
          </div>
  
          {/* 📞 Contacts & Assistance */}
          <div className="mb-8 p-6 border-l-4 border-red-600 bg-red-50 rounded-lg shadow-sm text-left">
            <h2 className="text-2xl font-semibold text-gray-900 mb-3">📞 Contacts & Assistance</h2>
            <p className="text-gray-700">Besoin d'aide ou de conseils ? Contactez :</p>
            <ul className="list-disc list-inside text-gray-700 mt-2">
              <li>☎️ SOS Justice : 01 40 99 99 99</li>
              <li>☎️ Défenseur des Droits : 09 69 39 00 00</li>
            </ul>
          </div>
  
          {/* ❓ FAQ */}
          <div className="p-6 border-l-4 border-gray-600 bg-gray-50 rounded-lg shadow-sm text-left">
            <h2 className="text-2xl font-semibold text-gray-900 mb-3">❓ FAQ</h2>
            <p className="text-gray-700">Des questions fréquentes sur les signalements :</p>
            <ul className="list-disc list-inside text-gray-700 mt-2">
              <li>💬 Puis-je signaler un fait de manière anonyme ?</li>
              <li>💬 Que faire si mon signalement est ignoré ?</li>
              <li>💬 Quels sont mes droits en tant que lanceur d'alerte ?</li>
            </ul>
          </div>
        </div>
      </div>
    );
  }; 