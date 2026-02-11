import { Header } from "../components/Header";
import { NoteList } from "../components/note/NoteList";

export const Note: React.FC = () => {
  return (
    <div className="flex h-full w-full flex-col">
      <Header />
      <NoteList />
    </div>
  );
};
