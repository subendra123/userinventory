import {User} from "./types/user_types";

export class Utils {
    static getGender(v: string) {
        return {"m": "Male", "f": "Female"}[v]
    }

    static getFood(v: string) {
        return {"burger": "Burger", "pizza": "Pizza", "pasta": "Pasta"}[v]
    }

    static getColor(v: number) {
        if (v < 25) return "green";
        if (v < 50) return "purple";
        return "orange";
    }

    static storeUsers(users: User[]) {
        localStorage.setItem("users", JSON.stringify(users));
    }

    static retrieveUsers(): User[] {
        let data = localStorage.getItem("users");
        return data ? JSON.parse(data) : [];
    }

    static getPages(len: number, pageSize: number): Array<number> {
        let p = Math.trunc(len / pageSize);
        let rem = len % pageSize;
        if (rem == 0) return this.generateList(p);
        return this.generateList(p + 1);
    }

    private static generateList(len: number): Array<number> {
        let lst = [];
        for (let i = 0; i < len; i++) {
            lst.push(i);
        }
        return lst;
    }

    static getStartEnd(page: number, size: number = 20): [number, number] {
        let start = 0;
        let end = size
        if (page) {
            let startPage = 1
            try {
                start = (page - startPage) * size
                if (start < 0) start = 0
                end = page * size
            } catch (e) {

            }
        }
        return [start, end]
    }
}