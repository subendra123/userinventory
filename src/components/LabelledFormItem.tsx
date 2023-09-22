import {LabelledInputParams, LabelledSelectParams} from "../types/input_types";

export const LabelledInput = (params: LabelledInputParams) => {
    return (
        <div className={"labelled-input"}>
            <label>{params.label}</label>
            {params.lines && params.lines > 1 ?
                <textarea disabled={params.disabled} value={params.defaultValue} rows={params.lines}
                          placeholder={params.placeholder}
                          onInput={(event) => params.onInput(event.currentTarget.value)}></textarea> :
                <input disabled={params.disabled} value={params.defaultValue} type={params.type}
                       placeholder={params.placeholder} max={params.max} min={params.min}
                       onInput={(event) => params.onInput(event.currentTarget.value)}/>}

        </div>
    );
}

export const LabelledRadio = (params: LabelledSelectParams) => {
    return (
        <div className={"labelled-input"}>
            <label>{params.label}</label>
            <div className={"flex flex-middle gap-normal pv-small"}>
                {params.items.map((e, index) => (
                    <div key={params.name + "_" + e.value}>
                        <input disabled={params.disabled} id={"input_" + params.name + "_" + e.value}
                               checked={params.defaultValue == e.value}
                               type={"radio"} name={params.name}
                               value={e.value}
                               onChange={(event) => params.onChange(event.currentTarget.value)}/>
                        <label htmlFor={"input_" + params.name + "_" + e.value}>{e.label}</label>
                    </div>
                ))}
            </div>
        </div>
    );
}

export const LabelledSelect = (params: LabelledSelectParams) => {
    return (
        <div className={"labelled-input"}>
            <label>{params.label}</label>
            <select disabled={params.disabled} value={params.defaultValue}
                    onChange={(event) => params.onChange(event.currentTarget.value)}
                    name={params.name}>
                {params.items.map((e, index) => (
                    <option key={params.name + "_" + e.value} value={e.value}>{e.label}</option>
                ))}
            </select>
        </div>
    );
}
