import React, { useState, useEffect, useRef } from "react";

// Bot ikonlarının sabit eşleştirilmesi
const botIcons = {
  AcademyBot: "/icons/academy_icon.png",
  StakeBot: "/icons/stake_icon.png",
  SlotticaBot: "/icons/slottica_icon.png",
  BetsioBot: "/icons/betsio_icon.png",
};

function Chat() {
  const [ws, setWs] = useState(null);
  const [username, setUsername] = useState("");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [icon, setIcon] = useState("");

  // Referans: Mesajlar kutusunu takip eder
  const messagesEndRef = useRef(null);

  // Ses dosyası referansı
  const messageSound = useRef(new Audio("/sounds/message_received.mp3"));

  // Rastgele ikon atanması
  const assignRandomIcon = () => {
    const userIcons = [
      "/icons/icon1.png",
      "/icons/icon2.png",
      "/icons/icon3.png",
      "/icons/icon4.png",
      "/icons/icon5.png",
      "/icons/icon6.png",
    ];
    return userIcons[Math.floor(Math.random() * userIcons.length)];
  };

  useEffect(() => {
     // .env dosyasındaki REACT_APP_WS_URL değişkeninden WebSocket URL'sini alın
     const websocketUrl = process.env.REACT_APP_WS_URL || "ws://localhost:9000";
     const websocket = new WebSocket(websocketUrl);
     setWs(websocket);

    websocket.onmessage = (event) => {
      const data = JSON.parse(event.data);

      if (data.type === "message") {
        const updatedMessage = {
          ...data,
          icon: botIcons[data.username] || assignRandomIcon(),
        };

        setMessages((prevMessages) => [...prevMessages, updatedMessage]);
        websocket.onclose = () => {
          console.log("WebSocket connection closed");
        };
        // Mesaj geldiğinde sesi çal
        messageSound.current.play().catch((error) => {
          console.error("Audio playback error:", error);
        });
      }
    };

    return () => websocket.close();
  }, []);

  // Mesajlar kutusunu otomatik kaydır
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Mesajlar kutusunu en sona kaydırma fonksiyonu
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // Kullanıcı kaydı
  const registerUser = () => {
    if (username.trim()) {
      const assignedIcon = assignRandomIcon();
      setIcon(assignedIcon);

      ws.send(
        JSON.stringify({
          type: "register",
          username,
        })
      );

      alert(`Welcome, ${username}! Your icon is assigned.`);
    } else {
      alert("Please enter a username!");
    }
  };

  // Mesaj gönderimi
  const sendMessage = () => {
    if (message.trim()) {
      ws.send(
        JSON.stringify({
          type: "message",
          username,
          message,
          icon,
        })
      );
      setMessage("");
    }
  };

  // Enter ile mesaj gönderme
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      sendMessage();
    }
  };

  return (
    <div id="chat-container">
      <div id="chat-header">
        <img src="logo.jpg" alt="Chat Logo" id="chat-logo" />

        {/* Kullanıcı İkonu */}
        {icon && (
          <img
            src={icon}
            alt="User Icon"
            id="user-icon"
            style={{
              width: "40px",
              height: "40px",
              borderRadius: "50%",
              marginLeft: "10px",
            }}
          />
        )}
        <h2>Academy CANADA CHAT</h2>
      </div>

      <div id="chat-messages" style={{ overflowY: "scroll", height: "300px" }}>
        {messages.map((msg, index) => (
          <div key={index} className="message">
            <img
              src={msg.icon}
              alt="icon"
              width={20}
              style={{ marginRight: "10px", borderRadius: "50%" }}
            />
            <b className="username">{msg.username}</b>:{" "}
            <span dangerouslySetInnerHTML={{ __html: msg.message }} />
          </div>
        ))}
        {/* Mesajlar kutusunun sonu */}
        <div ref={messagesEndRef} />
      </div>

      <div id="emoji-bar">
        {["😁", "❤️", "😍", "⭐️", "😄", "🤔", "🤣", "🤩", "🤙", "😱", "🫡", "🤬", "🤪", "👎"].map((emoji, index) => (
          <span
            key={index}
            className="emoji"
            onClick={() => setMessage((prevMessage) => prevMessage + emoji)}
            style={{ cursor: "pointer" }}
          >
            {emoji}
          </span>
        ))}
      </div>

      <div id="chat-new-message">
        <input
          type="text"
          id="message-input"
          placeholder="Write a Message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyPress={handleKeyPress} // Enter ile mesaj gönderme
        />
        <button id="send-button" onClick={sendMessage}>
          Send
        </button>
      </div>

      {!icon && (
        <div style={{ marginTop: "10px", textAlign: "center" }}>
          <input
            type="text"
            placeholder="Enter your username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            style={{
              padding: "10px",
              borderRadius: "4px",
              border: "none",
              backgroundColor: "#222",
              color: "#fff",
              width: "100%",
              marginBottom: "10px",
            }}
          />
          <button
            onClick={registerUser}
            style={{
              backgroundColor: "#1e90ff",
              color: "#fff",
              border: "none",
              padding: "10px 15px",
              borderRadius: "4px",
              cursor: "pointer",
              width: "100%",
            }}
          >
            Set Username
          </button>
        </div>
      )}
    </div>
  );
}

export default Chat;
