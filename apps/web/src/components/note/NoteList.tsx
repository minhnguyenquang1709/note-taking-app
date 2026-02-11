import { useEffect, useRef, useState } from "react";
import { getAllNotes } from "../../utils/httpClient";

interface INoteItemProps {
  title: string;
  content: string;
}

const NoteItem: React.FC<INoteItemProps> = ({ title, content }) => {
  return (
    <div className="flex h-auto max-h-[300px] w-full flex-col gap-4 overflow-hidden rounded-2xl bg-gray-800 p-4 text-white">
      <div className="font-bold">
        <h1>{title}</h1>
      </div>

      <div
        className="h-0 w-full border-2 border-gray-400"
        id="separation-line"
      ></div>

      <div
        className="min-h-0 grow overflow-y-scroll rounded-2xl border border-gray-400 p-2 whitespace-pre-wrap"
        style={{
          scrollbarWidth: "thin",
        }}
      >
        <p>{content}</p>
      </div>
    </div>
  );
};

export const NoteList: React.FC = () => {
  const [notes, setNotes] = useState([]);
  const isFetchingRef = useRef(false);

  const fetchNotes = async () => {
    try {
      if (isFetchingRef.current) return;
      isFetchingRef.current = true;

      const data = await getAllNotes();
      if (data) {
        setNotes(data);
      }
    } catch (error) {
      console.error(error);
    } finally {
      isFetchingRef.current = false;
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  if (notes.length === 0) {
    return null;
  }

  return (
    <div className="h-full w-full p-4">
      <div className="grid grid-cols-4">
        {notes.map((note: any, index) => (
          <NoteItem key={index} title={note.title} content={note.content} />
        ))}
      </div>
    </div>
  );
};
