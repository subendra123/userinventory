import {UserCardParams} from "../types/user_types";
import {Utils} from "../utils";
import React from "react";

const UserCard = (params: UserCardParams) => {
    let e = params.user
    return (<div className={"user-card"}>
        <div className={"p-small"}>
            <div className={"flex flex-middle"}>
                <h3 className={"m-0 flex-fill"}>{e.name}</h3>
                <div className={"badge badge-" + Utils.getColor(e.age)}></div>
            </div>
            <hr/>
            <div className={"flex m-0 flex-middle gap-normal-h"}>
                <label>Age:</label>
                <h4 className={"m-0"}>{e.age}</h4>
            </div>
            <div className={"flex m-0 flex-middle gap-normal-h"}>
                <label>Date of Birth:</label>
                <h4 className={"m-0"}>{e.dob}</h4>
            </div>
            <div className={"flex m-0 flex-middle gap-normal-h"}>
                <label>Gender:</label>
                <h4 className={"m-0"}>{Utils.getGender(e.gender)}</h4>
            </div>
            <div className={"flex m-0 flex-middle gap-normal-h"}>
                <label>Food:</label>
                <h4 className={"m-0"}>{Utils.getFood(e.food)}</h4>
            </div>
            <div className={"flex m-0 flex-middle gap-normal-h"}>
                <label>Hobbies:</label>
                <h4 className={"m-0"}>{e.hobbies}</h4>
            </div>
            <hr/>
            <div className={"flex mt-20 flex-middle gap-normal"}>
                <button onClick={() => {
                    params.onDelete(e);
                }} className={"btn btn-danger"}>Delete
                </button>
                <div className={"flex-fill gap-normal flex flex-end"}>
                    <button onClick={() => {
                        params.onAction("view", e);

                    }} className={"btn"}>View
                    </button>
                    <button onClick={() => {
                        params.onAction("edit", e);
                    }} className={"btn btn-accent"}>Edit
                    </button>
                </div>
            </div>
        </div>
    </div>);
}
export default UserCard;