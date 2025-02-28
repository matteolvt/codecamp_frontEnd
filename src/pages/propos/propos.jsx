export const Propos = () => {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center px-6 py-12">
        <div className="max-w-4xl bg-white p-10 rounded-xl shadow-lg text-center">
          {/* 🌟 Titre principal */}
          <h1 className="text-4xl font-bold text-gray-900 mb-6">À Propos</h1>
          <p className="text-lg text-gray-700 leading-relaxed mb-8">
            Bienvenue sur <span className="font-bold text-blue-600">Dénonciation Civique</span>, une plateforme dédiée à la transparence et à la justice sociale. 
            Nous permettons aux citoyens de signaler anonymement les injustices pour améliorer notre société.
          </p>
  
          {/* 📌 Mission */}
          <div className="mb-8 p-6 border-l-4 border-blue-600 bg-blue-50 rounded-lg shadow-sm text-left">
            <h2 className="text-2xl font-semibold text-gray-900 mb-2">📌 Notre Mission</h2>
            <p className="text-gray-700">
              Offrir une plateforme sécurisée et anonyme où les citoyens peuvent signaler des faits préoccupants tout en garantissant leur confidentialité.
            </p>
          </div>
  
          {/* 🚀 Votre sécurité */}
          <div className="mb-8 p-6 border-l-4 border-yellow-500 bg-yellow-50 rounded-lg shadow-sm text-left">
            <h2 className="text-2xl font-semibold text-gray-900 mb-2">🚀 Votre sécurité</h2>
            <ul className="list-disc list-inside text-gray-700">
              <li>🔹 100% Anonyme & Sécurisé</li>
              <li>🔹 Interface simple et intuitive</li>
              <li>🔹 Accès aux statistiques en temps réel</li>
              <li>🔹 Transparence & Engagement citoyen</li>
            </ul>
          </div>
  
          {/* 🌍 Notre Impact */}
          <div className="mb-8 p-6 border-l-4 border-green-600 bg-green-50 rounded-lg shadow-sm text-left">
            <h2 className="text-2xl font-semibold text-gray-900 mb-2">🌍 Notre Impact</h2>
            <p className="text-gray-700">
              Grâce à notre communauté, des centaines de signalements ont été traités et ont mené à des améliorations concrètes dans les villes et quartiers.
            </p>
          </div>
  
          {/* 📩 Contact */}
          <div className="p-6 border-l-4 border-gray-600 bg-gray-50 rounded-lg shadow-sm text-left">
            <h2 className="text-2xl font-semibold text-gray-900 mb-2">📩 Contactez-nous</h2>
            <p className="text-gray-700">
              Vous avez une question ou souhaitez collaborer avec nous ?
              <br />
              📧 <a href="mailto:contact@denonciationcivique.com" className="text-blue-500 font-bold hover:underline">
                contact@denonciationcivique.com
              </a>
            </p>
          </div>
        </div>
      </div>
    );
  }; 