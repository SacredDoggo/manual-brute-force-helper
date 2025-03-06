import { useSharedState } from "@/providers/shared-state-provider";
import { usePasswordDeleteConfirmDialogStore } from "@/store/password-delete-confirm-dialog-store";
import { toast } from "sonner";

export const ConfirmModal = () => {
    const pdcds = usePasswordDeleteConfirmDialogStore();

    const { passwords, setPasswords } = useSharedState();

    const handleClose = () => {
        pdcds.resetData();
        pdcds.closeConfirmDialog();
    }

    const handleAccept = () => {
        try {
            const promise = fetch(`/api/password/${pdcds.triedPasswordToBeDeletedId}`, {
                method: "DELETE",
            });

            toast.promise(promise, {
                loading: "Deleting password...",
                success: "Password sucessfully deleted!",
                error: "Error while deleting password."
            });

            promise
                .then((data) => {
                    if (data.status == 200) {
                        const indexToRemove = pdcds.triedPasswordToBeDeletedIndex;
                        const newPasswordsList = [
                            ...passwords.slice(0, indexToRemove),
                            ...passwords.slice(indexToRemove + 1)
                          ];
                        setPasswords(newPasswordsList);
                    }
                })
        } catch (error) {
            console.error(error);
        }
        
        handleClose();
    }

    return (
        <>
            {pdcds.isConfirmDialogOpen &&
                <div className="fixed inset-0 flex items-center justify-center z-50">
                    <div className="absolute inset-0 bg-black bg-opacity-50" onClick={handleClose} />
                    <div className="relative w-[600px] z-50 font-mono bg-gray-900 p-4 rounded-lg shadow-lg border border-gray-700">
                        <p className="w-full text-xl font-bold">Are you sure?</p>
                        <p className="text-md mt-2">{`Do you want to delete ${pdcds.triedPasswordToBeDeleted} ?`}</p>
                        <div className="flex justify-evenly md:justify-end md:gap-x-2">
                            <button className="bg-black text-white dark:bg-white dark:text-black dark:hover:bg-white/90 cursor-pointer p-2 rounded-sm" onClick={handleClose}>Cancel</button>
                            <button className="bg-red-600 hover:bg-red-800 text-white cursor-pointer p-2 rounded-sm" onClick={handleAccept}>Yes</button>
                        </div>
                    </div>
                </div>
            }
        </>
    );
}