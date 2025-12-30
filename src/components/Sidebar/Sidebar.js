import { useState } from "react";
import styles from "./Sidebar.module.css";
import CreateGroupModal from "../CreateGroupModal/CreateGroupModal";

const Sidebar = ({
  groups,
  setGroups,
  selectedGroup,
  setSelectedGroup,
  notes,
  setNotes,
}) => {
  const [showModal, setShowModal] = useState(false);

  const deleteGroup = (id) => {
    setGroups((prev) => prev.filter((g) => g.id !== id));

    setNotes((prev) => {
      const copy = { ...prev };
      delete copy[id];
      return copy;
    });

    setSelectedGroup((prevSelected) => {
      if (prevSelected && prevSelected.id === id) {
        return null;
      }
      return prevSelected;
    });
  };

  return (
    <div className={styles.sidebar}>
      <h1 className={styles.title}>Pocket Notes</h1>

      <div className={styles.groupList}>
        {groups.map((group) => (
          <div
            key={group.id}
            className={`${styles.groupItem} ${
              selectedGroup?.id === group.id ? styles.active : ""
            }`}
            onClick={() => setSelectedGroup(group)}
          >
            <div
              className={styles.avatar}
              style={{ backgroundColor: group.color }}
            >
              {group.initials}
            </div>

            <span className={styles.name}>{group.name}</span>

            <button
              className={styles.delete}
              onClick={(e) => {
                e.stopPropagation();
                deleteGroup(group.id);
              }}
            >
              ✕
            </button>
          </div>
        ))}
      </div>

      <button className={styles.addBtn} onClick={() => setShowModal(true)}>
        +
      </button>

      {showModal && (
        <CreateGroupModal
          close={() => setShowModal(false)}
          groups={groups}
          setGroups={setGroups}
        />
      )}
    </div>
  );
};

export default Sidebar;
