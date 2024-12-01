import React from "react";
import "./styles.css";
import SnowEffect from "./SnowEffect"; // Kar efekti bileşeni
import Chat from "./Chat"; // Chat bileşeni

function App() {
  return (
    <div className="container">
      <SnowEffect /> {/* Kar efekti */}
      <Header />
      <TrustedCasinos />
      <RecommendedCasinos />
      <Chat /> {/* Chat bileşeni */}
      <Footer />
    </div>
  );
}

function Header() {
  return (
    <div className="header">
      <h1>Roulette Academy CANADA 🔥</h1>
    </div>
  );
}

function TrustedCasinos() {
  return (
    <div className="trusted-casinos">
      <h2>BEST CASINOS CANADA</h2>
      <div className="casino-grid">
        <a
          href="https://stake.com/?c=9dd9dbc553"
          target="_blank"
          rel="noopener noreferrer"
          className="casino-card"
        >
          <img src="stake.jpg" alt="Casino 1" />
        </a>
        <a
          href="https://t.ly/9-D_G"
          target="_blank"
          rel="noopener noreferrer"
          className="casino-card"
        >
          <img src="betsio.jpg" alt="Casino 2" />
        </a>
      </div>
    </div>
  );
}

function RecommendedCasinos() {
  return (
    <div className="recommended-casinos">
      <h2>RECOMMENDED CASINOS CANADA</h2>
      <div className="casino-grid">
      <a
       href="https://gopartner.link/?a=205678&c=184089&s1=6028"
          target="_blank"
          rel="noopener noreferrer"
          className="casino-card"
        >
          <img src="slottica.jpg" alt="Casino 3" />
        </a>
        <a
       href=" "
          target="_blank"
          rel="noopener noreferrer"
          className="casino-card"
        >
          <img src="Advertise.jpg" alt="Casino 4" />
        </a>
        <a
       href=" "
          target="_blank"
          rel="noopener noreferrer"
          className="casino-card"
        >
          <img src="Advertise.jpg" alt="Casino 5" />
        </a>
        <a
       href=" "
          target="_blank"
          rel="noopener noreferrer"
          className="casino-card"
        >
          <img src="Advertise.jpg" alt="Casino 6" />
        </a>
      </div>
    </div>
  );
}

function CasinoCard({ imgSrc, altText }) {
  return (
    <a href="#" className="casino-card">
      <img src={imgSrc} alt={altText} />
    </a>
  );
}

function Footer() {
  return (
    <div className="footer">
      <a
        href="https://t.me/rouletteacademycanada"
        target="_blank"
        rel="noopener noreferrer"
      >
        <img src="telegramlogo.png" alt="Telegram Logo" className="icon" />
        TELEGRAM CHAT
      </a>
      <a
        href="https://join.skype.com/invite/KS2mlg8PdN5w"
        target="_blank"
        rel="noopener noreferrer"
      >
        <img src="skypelogo.png" alt="Skype Logo" className="icon" />
        SKYPE
      </a>
      <p>ROULETTE ACADEMY CANADA 2024</p>
    </div>
  );
}

export default App;
