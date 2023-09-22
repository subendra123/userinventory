import {HTMLInputTypeAttribute} from "react";

export type LabelledInputParams = {
    disabled?: boolean
    label: string
    placeholder: string
    lines?: number | null
    defaultValue?: string
    min?: any
    max?: any
    type?: HTMLInputTypeAttribute
    onInput(text: string): void
}
export type LabelledSelectItem = {
    value: string
    label: string
}

export type LabelledSelectParams = {
    disabled?: boolean
    name: string
    label: string
    defaultValue?: string
    items: LabelledSelectItem[]
    onChange(text: string): void
}
