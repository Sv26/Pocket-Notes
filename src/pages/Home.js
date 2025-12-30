import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar/Sidebar";
import NotesPanel from "../components/NotesPanel/NotesPanel";
import { load, save } from "../utils/storage";
import bgImage from "../assets/note.png";
const Home = () => {
  const { groupId } = useParams();
  const navigate = useNavigate();

  const [groups, setGroups] = useState([]);
  const [notes, setNotes] = useState({});
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [showNotes, setShowNotes] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    setGroups(load("notesGroups", []));
    setNotes(load("notesData", {}));
  }, []);

  useEffect(() => {
    save("notesGroups", groups);
    save("notesData", notes);
  }, [groups, notes]);

  useEffect(() => {
    if (!groupId || !groups.length) return;
    const group = groups.find((g) => String(g.id) === groupId);
    if (group) {
      setSelectedGroup(group);
      setShowNotes(true);
    }
  }, [groupId, groups]);

  return (
    <div style={{ display: "flex", height: "100vh" }}>
      {(!isMobile || !showNotes) && (
        <Sidebar
          groups={groups}
          setGroups={setGroups}
          selectedGroup={selectedGroup}
          setSelectedGroup={(group) => {
            setSelectedGroup(group);
            setShowNotes(true);
            navigate(`/group/${group.id}`);
          }}
          notes={notes}
          setNotes={setNotes}
        />
      )}

      {showNotes && selectedGroup && (
        <NotesPanel
          selectedGroup={selectedGroup}
          notes={notes}
          setNotes={setNotes}
          onBack={() => {
            if (isMobile) {
              setShowNotes(false);
              navigate("/");
            }
          }}
        />
      )}

      {!showNotes && !selectedGroup && !isMobile && (
        <div
          style={{
            flex: 1,
            display: "grid",
            placeItems: "center",
            height: "100%",
            width: "100%",
            backgroundImage: `url(${bgImage})`,
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
            backgroundSize: "cover",
          }}
        ></div>
      )}
    </div>
  );
};

export default Home;
