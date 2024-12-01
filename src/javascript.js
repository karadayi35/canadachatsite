import React, { useState, useEffect } from "react";

function Chat() {
  const [ws, setWs] = useState(null);
  const [username, setUsername] = useState("");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [icon, setIcon] = useState("");

  useEffect(() => {
    const websocket = new WebSocket("ws://localhost:9000");
    setWs(websocket);

    websocket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.type === "register_success") {
        setIcon(data.icon);
        alert(data.message);
      } else if (data.type === "message") {
        setMessages((prevMessages) => [...prevMessages, data]);
      }
    };

    return () => websocket.close();
  }, []);

  const registerUser = () => {
    ws.send(JSON.stringify({ type: "register", username }));
  };

  const sendMessage = () => {
    ws.send(JSON.stringify({ type: "message", username, message }));
    setMessage("");
  };

  return (
    <div>
      {!icon && (
        <div>
          <input
            type="text"
            placeholder="Kullanıcı Adınızı Girin"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <button onClick={registerUser}>Giriş Yap</button>
        </div>
      )}
      {icon && (
        <div>
          <h3>Hoşgeldin {username}!</h3>
          <p>İkonun: {icon}</p>
          <div>
            <input
              type="text"
              placeholder="Mesaj Yaz"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
            <button onClick={sendMessage}>Gönder</button>
          </div>
          <div>
            {messages.map((msg, index) => (
              <div key={index}>
                <img src={msg.icon} alt="icon" width={20} />
                <b>{msg.username}</b>: {msg.message}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default Chat;
