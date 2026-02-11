import React, {
  createContext,
  useContext,
  useState,
  type ComponentType,
  type PropsWithChildren,
  type ReactNode,
} from "react";
import { Dialog, DialogPanel } from "@headlessui/react";
import { type ClassValue } from "clsx";
import { Note } from "../screens/Note";

export enum EScreenID {
  Note = "note",
}

export const ScreenRegistry: Record<EScreenID, ComponentType> = {
  [EScreenID.Note]: Note,
};

interface INavigationContext {
  currentScreen: EScreenID | null;
  changeScreen: (screen: any) => void;
  closeScreen: () => void;
  currentModal: ReactNode | null;
  openModal: (modal: any) => void;
  closeModal: () => void;
}

const NavigationContext = createContext<INavigationContext | undefined>(
  undefined,
);

export const useNavigation = () => {
  const context = useContext(NavigationContext);
  if (!context) {
    throw new Error("useNavigation must be used within a NavigationProvider");
  }

  return context;
};

interface INavigationProviderProps {}

export const NavigationProvider: React.FC<
  PropsWithChildren<INavigationProviderProps>
> = ({ children }) => {
  const [currentScreen, setCurrentScreen] = useState<EScreenID | null>(
    EScreenID.Note,
  );
  const [currentModal, setCurrentModal] = useState<ReactNode | null>(null);

  const contextValue: INavigationContext = {
    currentScreen,
    changeScreen: (screen) => setCurrentScreen(screen),
    closeScreen: () => setCurrentScreen(null),

    currentModal,
    openModal: (modal) => setCurrentModal(modal),
    closeModal: () => setCurrentModal(null),
  };

  return (
    <NavigationContext.Provider value={contextValue}>
      {children}
    </NavigationContext.Provider>
  );
};

interface IScreenContainerProps {}

export const ScreenContainer: React.FC<IScreenContainerProps> = ({}) => {
  const { currentScreen } = useNavigation();
  const ScreenComponent = currentScreen ? ScreenRegistry[currentScreen] : null;
  return (
    <div className="pointer-events-auto flex h-full w-full justify-center overflow-hidden bg-white">
      {ScreenComponent && <ScreenComponent />}
    </div>
  );
};

export const ModalRegistry = {};

export const ModalTransition: Record<string, ClassValue> = {
  default:
    "duration-300 ease-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0",
};

interface IModalContainerProps {}

export const ModalContainer: React.FC<
  PropsWithChildren<IModalContainerProps>
> = ({}) => {
  const { currentModal } = useNavigation();

  const state = {
    visible: currentModal !== null,
    child: currentModal,
    backgroundColor: "",
  };

  const bgColor = state.backgroundColor ?? "bg-black";
  return (
    <Dialog
      open={state.visible}
      as="div"
      className="relative z-[99] focus:outline-none"
      onClose={() => {}}
    >
      <div
        className={`fixed inset-0 z-[99] h-screen w-screen overflow-x-hidden ${bgColor} bg-opacity-70 pointer-events-auto flex items-center justify-center backdrop-blur-md`}
      >
        <DialogPanel
          transition
          className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 ${ModalTransition.default} pointer-events-auto`}
          style={{}}
        >
          {state.child}
        </DialogPanel>
      </div>
    </Dialog>
  );
};
