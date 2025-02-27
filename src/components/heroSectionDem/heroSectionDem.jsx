export const HeroSectionDem = () => {
  return (
    <div
      className="relative text-white text-center w-full h-[200px] flex flex-col items-center justify-center bg-cover bg-center h-200"
      style={{ backgroundImage: "url('/background-vos-demarches.jpg')" }}
    >
      <div className="absolute inset-0 bg-black opacity-50"></div>
      <div className="relative p-4 rounded">
        <h1 className="text-2xl font-bold">Vos Démarches</h1>
        <p className="mt-1 text-sm">
          Tout ce qu'il faut savoir pour signaler un fait et suivre les
          procédures.
        </p>
      </div>
    </div>
  );
};
