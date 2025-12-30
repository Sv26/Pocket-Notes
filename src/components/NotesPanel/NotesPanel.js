import { useEffect, useRef, useState } from "react";
import styles from "./NotesPanel.module.css";

const NotesPanel = ({ selectedGroup, notes, setNotes, onBack }) => {
  const [text, setText] = useState("");
  const inputRef = useRef(null);
  const bottomRef = useRef(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, [selectedGroup]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [notes, selectedGroup]);

  if (!selectedGroup) return null;

  const addNote = () => {
    if (!text.trim()) return;

    const now = new Date();
    const note = {
      id: Date.now(),
      text,
      date: now.toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }),
      time: now.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    setNotes({
      ...notes,
      [selectedGroup.id]: [...(notes[selectedGroup.id] || []), note],
    });

    setText("");
  };

  return (
    <div className={styles.panel}>
      <div className={styles.header}>
        <button className={styles.backBtn} onClick={onBack}>
          ←
        </button>
        <div
          className={styles.avatar}
          style={{ backgroundColor: selectedGroup.color }}
        >
          {selectedGroup.initials}
        </div>
        <h2>{selectedGroup.name}</h2>
      </div>

      <div className={styles.notes}>
        {(notes[selectedGroup.id] || []).map((n) => (
          <div key={n.id} className={styles.note}>
            <p>{n.text}</p>
            <span>
              {n.date} • {n.time}
            </span>
          </div>
        ))}
        <div ref={bottomRef} />
      </div>

      <div className={styles.inputBox}>
        <textarea
          ref={inputRef}
          value={text}
          placeholder="Enter your text here..."
          onChange={(e) => setText(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              addNote();
            }
          }}
        />
        <button disabled={!text.trim()} onClick={addNote}>
          ➤
        </button>
      </div>
    </div>
  );
};

export default NotesPanel;
