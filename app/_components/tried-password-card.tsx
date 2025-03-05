import { usePasswordDeleteConfirmDialogStore } from "@/store/password-delete-confirm-dialog-store";
import { TrashIcon } from "lucide-react";

interface TriedPasswordCardInterface {
    id: string;
    tried_password: string;
}

export const TriedPasswordCard = ({ id, tried_password }: TriedPasswordCardInterface) => {
    const pdcds = usePasswordDeleteConfirmDialogStore();

    const handleDeleteClick = () => {
        pdcds.setTriedPasswordToBeDeleted(tried_password);
        pdcds.setTriedPasswordToBeDeletedId(id);

        pdcds.openConfirmDialog();
    }
    return (
        <div className="bg-teal-400 flex rounded-sm items-center">
            <p className="flex-1 p-2 text-md">{tried_password}</p>
            <div className="w-[1px] h-full bg-white" />
            <button className="flex items-center justify-center p-2 cursor-pointer" onClick={handleDeleteClick}>
                <TrashIcon className="h-4 w-4" />
            </button>
        </div>
    );
}