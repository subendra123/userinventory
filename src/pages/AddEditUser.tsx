import {useState} from "react";
import '../styles/app.scss';
import {LabelledInput, LabelledRadio, LabelledSelect} from "../components/LabelledFormItem";
import {AddUserParams, User} from "../types/user_types";

const AddEditUser = (params: AddUserParams) => {
    const user = params.user
    const [name, setName] = useState(user?.name ?? "");
    const [err, setErr] = useState("");
    const [age, setAge] = useState(user?.age?.toString() ?? "");
    const [dob, setDob] = useState(user?.dob ?? "");
    const [gender, setGender] = useState(user?.gender ?? "");
    const [food, setFood] = useState(user?.food ?? "");
    const [hobbies, setHobbies] = useState(user?.hobbies ?? "");


    const submit = (): User => {
        console.log(!name, !age, !dob, !gender, !food, !hobbies);
        if (!name || !age || !dob || !gender || !food || !hobbies) {
            throw "All fields are required!"
        }
        let a = 0;
        try {
            a = parseInt(age)
        } catch (e) {
            throw "Age must be numeric!"
        }
        if (!Number.isInteger(a)) {
            throw "Age must be numeric."
        }
        if (a < 1 || a > 200) {
            throw "Invalid age range. Valid range 1 - 200!"
        }

        return {
            age: a,
            dob: dob,
            food: food,
            gender: gender,
            hobbies: hobbies,
            name: name,
            timeAdded: user?.timeAdded ?? new Date().getTime()
        };
    }
    return (
        <div onClick={params.onClose} className={"dialog-wrapper"}>
            <div onClick={(event) => {
                event.stopPropagation();
            }} className={"dialog"}>
                <div className={"p-normal"}>
                    <h2 className={"m-0"}>Add User</h2>
                    {err ? <div className={"mt-20 alert alert-danger"}>{err}</div> : null}
                    <div className={"user-form-grid mt-20"}>
                        <LabelledInput
                            disabled={params.mode == "view"}
                            defaultValue={name} label={"Name"}
                            placeholder={"Enter name"} onInput={setName}/>
                        <LabelledInput
                            max={200}
                            min={1}
                            disabled={params.mode == "view"}
                            defaultValue={age} type={"number"} label={"Age"}
                            placeholder={"Enter age"} onInput={setAge}/>
                        <LabelledInput
                            max={new Date().toISOString().split("T")[0]}
                            disabled={params.mode == "view"}
                            defaultValue={dob} type={"date"} label={"Date of Birth"}
                            placeholder={"Select date of birth"} onInput={setDob}/>
                        <LabelledRadio
                            disabled={params.mode == "view"}
                            defaultValue={gender} name={"gender"} label={"Gender"}
                            items={[{label: "Male", value: "m"}, {label: "Female", value: "f"}]}
                            onChange={setGender}/>
                        <LabelledSelect
                            disabled={params.mode == "view"}
                            defaultValue={food} name={"food"} label={"Favourite food"}
                            items={[
                                {label: "-- select --", value: ""},
                                {label: "Pizza", value: "pizza"},
                                {label: "Burger", value: "burger"},
                                {label: "Pasta", value: "pasta"}
                            ]} onChange={setFood}/>
                        <LabelledInput
                            disabled={params.mode == "view"}
                            defaultValue={hobbies} label={"Hobbies"}
                            placeholder={"Enter hobbies"} lines={2} onInput={setHobbies}/>
                    </div>
                    <div className={"flex flex-middle flex-end gap-normal mt-20"}>
                        <button onClick={params.onClose} className={"btn btn-muted"}>
                            {params.mode == "view" ? "Close" : "Cancel"}
                        </button>
                        {params.mode == "view" ? null : params.mode == "edit" ? <button onClick={() => {
                            try {
                                params.onSubmit(submit(), true);
                            } catch (e: any) {
                                setErr(e);
                            }
                        }} className={"btn btn-accent"}>Update
                        </button> : <button onClick={() => {
                            try {
                                params.onSubmit(submit());
                            } catch (e: any) {
                                setErr(e);
                            }
                        }} className={"btn btn-success"}>Add
                        </button>}

                    </div>
                </div>
            </div>
        </div>
    );
}

export default AddEditUser;