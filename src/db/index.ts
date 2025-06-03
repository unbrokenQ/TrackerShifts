import Dexie, { type Table } from "dexie";

class MyDB extends Dexie {
	shifts!: Table<Shift>;

	constructor() {
		super("myDatabase");
		this.version(1).stores({
			shifts: "++id, date, start, end, comment", // Поля: id (автоинкремент), start, end, comment
		});
	}

	public async startShift(start: string, comment: string): Promise<StartShift> {
		try {
			await db.shifts.add({
				id: Date.now(),
				date: new Date().toLocaleDateString("ru-RU"),
				start,
				end: "",
				comment,
			});
			
			return { isError: false, message: "Успешно" };
		} catch (error: any) {
			return { isError: true, message: error };
		}
	}

	public async getShifts(): Promise<GetShifts> {
		try {
			const shifts = (await db.shifts.toArray()).reverse();
			return { data: shifts, isError: false, message: "Успешно" };
		} catch (error: any) {
			return { data: [], isError: true, message: error };
		}
	}

	public async closeShifts(id: number, content: any): Promise<StartShift> {
		try {
			await db.shifts.update(id, content);
			return { isError: false, message: "Успешно" };
		} catch (error: any) {
			return { isError: true, message: error };
		}
	}
}

export const db = new MyDB();
