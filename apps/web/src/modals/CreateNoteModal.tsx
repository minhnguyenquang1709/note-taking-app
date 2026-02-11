import { useRef } from "react";
import { useNavigation } from "../components/NavigationProvider";
import { createNote } from "../utils/httpClient";

export const CreateNoteModal: React.FC = () => {
  const { closeModal } = useNavigation();

  const isUploadingRef = useRef(false);
  const titleRef = useRef<HTMLTextAreaElement>(null);
  const contentRef = useRef<HTMLTextAreaElement>(null);

  async function submitNote() {
    try {
      if (isUploadingRef.current) return;
      if (!titleRef.current || !contentRef.current) return;
      if (
        titleRef.current.value.trim().length === 0 ||
        contentRef.current.value.trim().length === 0
      )
        return;

      isUploadingRef.current = true;

      const response = await createNote(
        titleRef.current.value,
        contentRef.current.value,
      );
      if (response) {
        console.log(response);
      }
    } catch (error) {
    } finally {
      isUploadingRef;
    }
  }

  return (
    <div className="flex max-h-[80vh] w-[60vw] flex-col items-center gap-4 bg-white">
      <div className="flex w-full flex-col">
        <p>Title</p>
        <textarea
          ref={titleRef}
          name="title"
          className="resize-none border-2 border-gray-300 p-2"
          rows={1}
        />
      </div>
      <div className="mt-4 flex w-full flex-col">
        <p>Content</p>
        <textarea
          ref={contentRef}
          name="content"
          className="resize-none border-2 border-gray-300 p-2"
          rows={10}
        />
      </div>
      <div className="flex flex-col items-center justify-center gap-4">
        <button className="bg-green-400 p-2" onClick={submitNote}>
          Submit
        </button>
        <button onClick={closeModal}>
          <img
            src="/assets/icons/close-ellipse-svgrepo-com.svg"
            alt="close popup"
            className="h-8 w-8"
          />
        </button>
      </div>
    </div>
  );
};
