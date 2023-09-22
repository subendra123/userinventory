import '../styles/app.scss';
import {DeleteUserParams} from "../types/user_types";

const DeleteUser = (params: DeleteUserParams) => {
    return (
        <div onClick={params.onCancel} className={"dialog-wrapper"}>
            <div onClick={(event) => {
                event.stopPropagation();
            }} className={"dialog sm"}>
                <div className={"p-normal"}>
                    <h2 className={"m-0"}>Delete user?</h2>
                    <p><strong>{params.user?.name}</strong> will be deleted from the list. Do you really want to delete?
                    </p>
                    <div className={"flex flex-middle flex-end gap-normal mt-20"}>
                        <button onClick={params.onCancel} className={"btn btn-muted"}>Cancel</button>
                        <button onClick={() => {
                            params.onConfirm(params.user);
                        }} className={"btn btn-danger"}>Yes, Delete
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default DeleteUser;