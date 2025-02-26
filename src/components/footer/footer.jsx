import React from "react";
import "./footer.css";

export function Footer() {
  return (
    <footer className="bg-gray-900 text-white p-4 text-center">
      <p>© 2025 Dénonciation Civique. Tous droits réservés.</p>
      <nav className="mt-2 space-x-4">
        <a href="/mentions-legales" className="text-gray-400">
          Mentions légales
        </a>
        <a href="/contact" className="text-gray-400">
          Contact
        </a>
      </nav>
    </footer>
  );
}
