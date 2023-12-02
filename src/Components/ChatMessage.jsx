import { auth } from "../config/firebase";
import { add, format, isToday, isYesterday } from "date-fns";

function ChatMessage({ message }) {
  const { author, text, authorId, createdAt } = message;

  console.log(createdAt);
  const { seconds, nanoseconds } = createdAt;
  const milliseconds = seconds * 1000 + Math.round(nanoseconds / 1e6);
  const date = new Date(milliseconds);

  const formatDate = (date) => {
    if (isToday(date)) {
      return `Today at ${format(date, "HH:mm")}`;
    } else if (isYesterday(date)) {
      return `Yesterday at ${format(date, "HH:mm")}`;
    } else {
      return `${format(date, "iii MMM")} at ${format(date, "HH:mm")}`;
    }
  };

  const formattedDate = formatDate(date);
  console.log(formattedDate);
  //   const displayTime = createdAt.toDateString();
  const messageClass = authorId == auth.currentUser.uid ? "" : "received";

  return (
    <div className={`message ${messageClass}`}>
      <div className="author">
        <div className="author-avatar">
          <img src={auth.currentUser.photoURL} alt="user`s avatar" />
        </div>
        <span className="auhtor-name">{author}</span>
      </div>
      <p>{text}</p>
    </div>
  );
}

export default ChatMessage;
