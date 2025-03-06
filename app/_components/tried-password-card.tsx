import { TrashIcon } from "lucide-react";

interface TriedPasswordCardInterface {
    id: string;
    tried_password: string;
    index: number;
}

export const TriedPasswordCard = ({ id, tried_password, index }: TriedPasswordCardInterface) => {
    return (
        <div className="bg-teal-400 flex rounded-sm items-center">
            <p className="flex-1 p-2 text-md">{tried_password}</p>
            <div className="w-[1px] h-full bg-white" />
            <button 
                className="flex items-center justify-center p-2 cursor-pointer delete-button" 
                password-index={index}
                password-id={id}
                password-text={tried_password}
            >
                <TrashIcon className="h-4 w-4" />
            </button>
        </div>
    );
}