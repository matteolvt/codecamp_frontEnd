const Forbidden = () => {
    return (
      <div
        className="min-h-screen flex items-center justify-center relative"
        style={{
          backgroundImage: `url('https://coloriageenfant.com/wp-content/uploads/2023/09/coloriage-picsou-triste.jpg')`,
          backgroundSize: "contain", // Réduit l'image tout en la gardant entière
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          width: "100vw",
          height: "100vh",
        }}
      >
        {/* Overlay sombre pour améliorer le contraste */}
        <div
          className="absolute inset-0"
          style={{ backgroundColor: "rgba(0, 0, 0, 0.4)" }} // Fond légèrement sombre
        ></div>
  
        {/* Boîte de message semi-transparente avec effet "verre dépoli" */}
        <div
          className="relative z-10 text-center text-white p-8 rounded-xl shadow-xl"
          style={{
            backgroundColor: "rgba(255, 255, 255, 0.2)", 
            backdropFilter: "blur(8px)", 
            maxWidth: "500px",
          }}
        >
          <span className="text-6xl">🚫</span>
          <h2 className="text-4xl font-bold mt-4">403 - Accès Interdit</h2>
          <p className="mt-4 text-lg">
            Vous n'avez pas l'autorisation d'accéder à cette page.
          </p>
          <p className="mt-6">
            <a
              href="/"
              className="text-black font-bold px-4 py-2 rounded-lg transition duration-300"
              style={{
                backgroundColor: "rgba(255, 255, 255, 0.8)", 
                padding: "10px 20px",
                borderRadius: "8px",
                display: "inline-block",
              }}
              onMouseOver={(e) => (e.target.style.backgroundColor = "rgba(255, 255, 255, 1)")}
              onMouseOut={(e) => (e.target.style.backgroundColor = "rgba(255, 255, 255, 0.8)")}
            >
              Retour à l'accueil
            </a>
          </p>
        </div>
      </div>
    );
  };
  
  export default Forbidden;
  