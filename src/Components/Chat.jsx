import { useEffect, useState } from "react";
import {
  addDoc,
  collection,
  serverTimestamp,
  onSnapshot,
  query,
  where,
  orderBy,
} from "firebase/firestore";
import { auth, db } from "../config/firebase";
import ChatMessage from "./ChatMessage";

function Chat({ room }) {
  const [newMessage, setNewMessage] = useState();
  const [messages, setMessages] = useState([]);

  const messagesRef = collection(db, "messages");

  useEffect(() => {
    const queryMessages = query(
      messagesRef,
      where("room", "==", room),
      orderBy("createdAt", "asc")
    );
    const unsubscribe = onSnapshot(queryMessages, (snapshot) => {
      let messages = [];
      snapshot.forEach((doc) => {
        messages.push({ ...doc.data(), id: doc.id });
      });
      setMessages(messages);
    });
    return () => unsubscribe();
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();
    if (newMessage === "") return;

    await addDoc(messagesRef, {
      text: newMessage,
      createdAt: serverTimestamp(),
      author: auth.currentUser.displayName,
      authorId: auth.currentUser.uid,
      room,
    });

    setNewMessage("");
  }

  return (
    <div className="bg-gray-950 min-h-screen">
      <div>
        <h1>Welcome to {room}</h1>
      </div>
      <div>
        {messages.map((message) => (
          <ChatMessage key={message.id} message={message} />
        ))}
      </div>
      <form onSubmit={handleSubmit} className="new-message-form">
        <input
          onChange={(e) => setNewMessage(e.target.value)}
          value={newMessage}
          type="text"
          className="new-message-input"
          placeholder="Your Message ..."
        />
        <button className="send-button" type="submit">
          Send
        </button>
      </form>
    </div>
  );
}

export default Chat;
