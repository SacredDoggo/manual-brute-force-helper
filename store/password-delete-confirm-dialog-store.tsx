import { create } from "zustand";

type PasswordDeleteConfirmDialogStore = {
    isConfirmDialogOpen: boolean;
    openConfirmDialog: () => void;
    closeConfirmDialog: () => void;

    triedPasswordToBeDeleted: string;
    setTriedPasswordToBeDeleted: (tried_password: string) => void;

    triedPasswordToBeDeletedId: string;
    setTriedPasswordToBeDeletedId: (tried_password_id: string) => void;

    triedPasswordToBeDeletedIndex: number;
    setTriedPasswordToBeDeletedIndex: (index: number) => void;

    resetData: () => void;
};

export const usePasswordDeleteConfirmDialogStore = create<PasswordDeleteConfirmDialogStore>((set) => ({
    isConfirmDialogOpen: false,
    openConfirmDialog: () => set({ isConfirmDialogOpen: true }),
    closeConfirmDialog: () => set({ isConfirmDialogOpen: false }),

    triedPasswordToBeDeleted: "",
    setTriedPasswordToBeDeleted: (tried_password) => set({ triedPasswordToBeDeleted: tried_password }),

    triedPasswordToBeDeletedId: "",
    setTriedPasswordToBeDeletedId: (tried_password_id) => set({ triedPasswordToBeDeletedId: tried_password_id }),

    triedPasswordToBeDeletedIndex: -1,
    setTriedPasswordToBeDeletedIndex: (index: number) => set({ triedPasswordToBeDeletedIndex: index }),

    resetData: () => set({
        triedPasswordToBeDeleted: "",
        triedPasswordToBeDeletedId: "",
        triedPasswordToBeDeletedIndex: -1
    })
}));