import React, { useEffect } from "react";

function SnowEffect() {
  useEffect(() => {
    const snowContainer = document.getElementById("snow");
    const snowflakes = [];

    function createSnowflake() {
      const snowflake = document.createElement("div");
      snowflake.classList.add("snowflake");
      snowflake.style.left = Math.random() * window.innerWidth + "px";
      snowflake.style.animationDuration = 5 + Math.random() * 3 + "s"; // 5-8 saniye arasında düşer
      snowflake.style.opacity = Math.random();
      snowflake.style.fontSize = Math.random() * 10 + 10 + "px"; // 10-20px arasında boyut
      snowflake.textContent = "❄";
      snowContainer.appendChild(snowflake);
      snowflakes.push(snowflake);

      setTimeout(() => {
        snowflake.remove();
        snowflakes.splice(snowflakes.indexOf(snowflake), 1);
      }, 8000); // Kar taneleri 8 saniye sonra silinir
    }

    const interval = setInterval(createSnowflake, 200); // Her 200ms'de bir kar tanesi oluşturulur

    return () => clearInterval(interval); // Temizleme işlemi
  }, []);

  return <div id="snow"></div>;
}

export default SnowEffect;
