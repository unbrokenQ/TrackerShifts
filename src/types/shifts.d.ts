interface Shift {
	id: number; // Автоинкрементный ключ
	date: string;
	start: string; // Например, дата и время начала смены
	end: string; // Дата и время окончания смены
	comment: string; // Комментарий
}

interface GetShifts {
	data: Shift[];
	isError: boolean;
	message: string;
}

interface StartShift {
	isError: boolean;
	message: string;
}
