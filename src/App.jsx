import MoriartyRefonteHomepageLight from "./pages/MoriartyHomepage.jsx";
import BackgroundLabPage from "./pages/BackgroundLabPage.jsx";

// ==========================================================================
// 1) APP SHELL CLEAN
// Purpose: Utiliser directement la homepage principale sans fichier relais.
// Key variables: composant `MoriartyRefonteHomepageLight`.
// Logic flow: import direct -> rendu racine immédiat.
// ==========================================================================
export default function App() {
  // ==========================================================================
  // 2) LIGHTWEIGHT PAGE SWITCHER
  // Purpose: Ouvrir le laboratoire de fonds via URL sans installer de routeur.
  // Key variables: window.location.pathname.
  // Logic flow: si /background-lab -> page labo, sinon homepage standard.
  // ==========================================================================
  if (
    typeof window !== "undefined" &&
    window.location.pathname.toLowerCase() === "/background-lab"
  ) {
    return <BackgroundLabPage />;
  }

  return <MoriartyRefonteHomepageLight />;
}
