import React, {useEffect, useState} from 'react';
import AddEditUser from "./pages/AddEditUser";
import {EditMode, User} from "./types/user_types";
import {Utils} from "./utils";
import DeleteUser from "./pages/DeleteUser";
import UserCard from "./components/UserCard";

const PAGE_SIZE = 6;

function App() {
    const [selectedUser, setSelectedUser] = useState<User | null>(null);
    const [delUser, setDelUser] = useState<User | null>(null);
    const [mode, setMode] = useState<EditMode>(null);
    const [users, setUsers] = useState<User[]>([]);

    useEffect(() => {
        setUsers(Utils.retrieveUsers());
    }, []);
    const addUser = (user: User) => {
        let tmp = [user, ...users];
        setUsers(tmp);
        Utils.storeUsers(tmp);
    }


    const updateUser = (user: User) => {
        users.map((e, index) => {
            if (e.timeAdded == user.timeAdded) users[index] = user
        })
        Utils.storeUsers(users);
    }


    const deleteUser = (user: User) => {
        let filtered = users.filter((e) => (e.timeAdded != user.timeAdded));
        setUsers(filtered);
        Utils.storeUsers(filtered);
    }

    const closeUser = () => {
        setMode(null);
        setSelectedUser(null);
    }

    let rawPage = new URLSearchParams(window.location.search).get("page") ?? "1";
    let page = parseInt(rawPage);
    let pages = Utils.getPages(users.length, PAGE_SIZE);

    const pagedUsers = (page: number): User[] => {
        let start = Utils.getStartEnd(page, PAGE_SIZE);
        let items = users.slice(start[0], start[1]);
        if (items.length > 0) {
            return items;
        }
        return users.slice(0, PAGE_SIZE);
    }
    return (
        <>
            <div>
                <header className="header flex flex-middle">
                    <div className={"container"}>
                        <div className={"in-h flex flex-middle"}>
                            <h2 className={"flex-fill m-0"}>User Inventory</h2>
                            <button className={"btn btn-avatar"}>U</button>
                        </div>
                    </div>
                </header>
                <div className={"container body"}>
                    <nav>
                        <div className={"flex flex-middle in"}>
                            <h2 className={"flex-fill m-0"}>List of users</h2>
                            <button onClick={() => {
                                setMode("add");
                            }} className={"btn btn-success"}>Add user
                            </button>
                        </div>
                    </nav>
                    <div className={"in"}>
                        {users.length == 0 ? <div className={"err-box"}>
                            <h1 className={"icon-l m-0"}>😔</h1>
                            <h2 className={"m-0"}>It's lonely in here!</h2>
                            <p className={"m-0"}>You have not added any users yet.</p>
                        </div> : null}
                        <div className={"user-grid"}>
                            {pagedUsers(page).map((e) => (
                                <UserCard key={e.timeAdded} user={e} onDelete={(e) => {
                                    setDelUser(e!);
                                }} onAction={(mode, e) => {
                                    setMode(mode);
                                    setSelectedUser(e);
                                }}/>
                            ))}
                        </div>
                    </div>
                    {pages.length <= 1 ? null :
                        <div className={"in"}>
                            <div className={"pagination flex flex-middle flex-end"}>
                                {pages.map((e) => {
                                    let currentPage = page == (e + 1);
                                    return (
                                        <a key={"page-" + e}
                                           className={currentPage ? "active" : ""}
                                           href={currentPage ? 'javascript:void(0)' : "?page=" + (e + 1)}>{e + 1}</a>);
                                })}
                            </div>
                        </div>
                    }
                </div>
            </div>
            {mode ?
                <AddEditUser
                    mode={mode} user={selectedUser} onClose={closeUser}
                    onSubmit={(user, edited) => {
                        if (edited) updateUser(user);
                        else addUser(user);
                        closeUser();
                    }}/> : null}
            {delUser ? <DeleteUser
                user={delUser} onCancel={() => {
                setDelUser(null);
                closeUser();
            }} onConfirm={(user) => {
                setDelUser(null);
                deleteUser(user!);
                closeUser();
            }
            }/> : null}
        </>
    );
}

export default App;
