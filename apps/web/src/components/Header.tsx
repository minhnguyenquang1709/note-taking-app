import { CreateNoteModal } from "../modals/CreateNoteModal";
import { useNavigation } from "./NavigationProvider";

export const Header: React.FC = () => {
  const { openModal } = useNavigation();

  function onAddNoteClick() {
    openModal(<CreateNoteModal />);
    console.log("clicked open create note modal button");
  }

  return (
    <div className="flex h-16 w-full bg-gray-800 p-2">
      <button className="h-8 w-8" onClick={onAddNoteClick}>
        <img
          src="/assets/icons/plus-large-svgrepo-com.svg"
          alt="plus sign"
          className="bg-amber-50"
        />
      </button>
    </div>
  );
};
