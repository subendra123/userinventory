export type EditMode = "view" | "edit" | "add" | null
export type AddUserParams = {
    mode?: EditMode
    user?: User | null
    onClose(): void
    onSubmit(user: User, edited?: boolean): void
}
export type DeleteUserParams = {
    user?: User
    onCancel(): void
    onConfirm(user?: User): void
}

export type UserCardParams = {
    user: User
    onDelete(user: User | null): void
    onAction(action: EditMode, user: User | null): void
}

export type User = {
    name: string
    age: number
    dob: string
    gender: string
    food: string
    hobbies: string
    timeAdded: number
}

