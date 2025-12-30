import { useEffect, useRef, useState } from "react";
import styles from "./CreateGroupModal.module.css";

const COLORS = [
  "#cf1717ff",
  "#FF79F2",
  "#43E6FC",
  "#F19576",
  "#9de61fff",
  "#6691FF",
];

const CreateGroupModal = ({ close, groups, setGroups }) => {
  const [name, setName] = useState("");
  const [color, setColor] = useState(null);
  const ref = useRef(null);

  useEffect(() => {
    const handler = (e) => {
      if (ref.current && !ref.current.contains(e.target)) close();
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [close]);

  const create = () => {
    if (!name.trim() || !color) return;

    const words = name.trim().split(" ");
    const initials =
      words.length === 1 ? words[0][0] : words[0][0] + words[1][0];

    setGroups([
      ...groups,
      {
        id: Date.now().toString(),
        name,
        color,
        initials: initials.toUpperCase(),
      },
    ]);

    close();
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.modal} ref={ref}>
        <h2>Create New Group</h2>

        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Group Name"
        />

        <div className={styles.colors}>
          {COLORS.map((c) => (
            <button
              key={c}
              style={{ backgroundColor: c }}
              className={color === c ? styles.active : ""}
              onClick={() => setColor(c)}
            />
          ))}
        </div>

        <button onClick={create} disabled={!name || !color}>
          Create
        </button>
      </div>
    </div>
  );
};

export default CreateGroupModal;
