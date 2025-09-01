"use client";
import { useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";

interface Message {
  name: string;
  text: string;
}

export default function Home() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [messageText, setMessageText] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [isJoined, setIsJoined] = useState<boolean>(false);
  const [typingDisplay, setTypingDisplay] = useState<string | null>(null);
  const [socket, setSocket] = useState<Socket | null>(null);

  useEffect(() => {
    const newSocket = io("http://localhost:3001");
    setSocket(newSocket);

    newSocket.emit("findAllMessages", {}, (response: Message[]) => {
      setMessages(response);
    });

    newSocket.on("message", (message: Message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    newSocket.on("typing", ({ name, isTyping }) => {
      setTypingDisplay(isTyping ? `${name} is typing...` : null);
    });

    return () => {
      newSocket.close();
    };
  }, []);

  const join = () => {
    console.log("Submitted name: ", name);
    if (socket) {
      socket.emit("join", { name }, () => {
        setIsJoined(true);
      });
    }
  };

  const sendMessage = () => {
    if (socket && messageText.trim()) {
      socket.emit("createMessage", { text: messageText }, () => {
        setMessageText("");
      });
    }
  };

  let timeout: NodeJS.Timeout;
  const handleTyping = () => {
    if (socket) {
      socket.emit("typing", { isTyping: true });
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        socket.emit("typing", { isTyping: false });
      }, 2000);
    }
  };

  if (!isJoined)
    return (
      <div className="flex items-center gap-2">
        <input
          type="text"
          placeholder="Enter your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          onKeyPress={(e) => {
            if (e.key === "Enter") {
              join();
            }
          }}
          className="border border-gray-300 p-2 rounded"
        />
        <button onClick={join} className="bg-blue-500 text-white p-2 rounded">
          Join the chat
        </button>
      </div>
    );

  return (
    <div className="h-screen p-4">
      <h1 className="text-2xl font-bold mb-4">Messages</h1>
      <div className="overflow-y-auto max-h-[70vh] mb-4 border border-gray-300 p-4 rounded">
        {messages.map((message, index) => (
          <div key={index} className="mb-2">
            <strong>{message.name}:</strong> {message.text}
          </div>
        ))}
      </div>
      <div>
        {typingDisplay && (
          <p className="mb-2 italic text-gray-500">{typingDisplay}</p>
        )}
        <div className="flex items-center gap-2">
          <input
            type="text"
            placeholder="Type a message..."
            value={messageText}
            onChange={(e) => {
              setMessageText(e.target.value);
              handleTyping();
            }}
            onKeyPress={(e) => {
              if (e.key === "Enter") {
                sendMessage();
              }
            }}
            className="flex-1 border border-gray-300 p-2 rounded"
          />
          <button
            onClick={sendMessage}
            className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}
