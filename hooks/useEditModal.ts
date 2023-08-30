import { create } from "zustand";

interface EditModalStore {
    isOpen: boolean,
    onOpen: () => void,
    onClose: () => void
}

const useEditModal = create<EditModalStore>(set => ({
    isOpen: false,
    onClose: () => set({isOpen: false}),
    onOpen: () => set({isOpen: true})
}))

export default useEditModal