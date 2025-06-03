import { db } from "@/db";
import {  useState } from "react";
import { toast } from "sonner";
import TableShifts from "./TableShifts";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import {
	Sheet,
	SheetClose,
	SheetContent,
	SheetDescription,
	SheetFooter,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from "./ui/sheet";

export function Tracker() {
	const [startShift, setStartShift] = useState({
		start: "",
		comment: "",
	});

	const [closeShift, setCloseShift] = useState(false);

	async function saveStartShift() {
		const response = await db.startShift(startShift.start, startShift.comment);
		if (response.isError) {
			toast("Ошибка", {
				description: response.message,
				action: {
					label: "Закрыть",
					onClick: () => console.log("Undo"),
				},
			});
			return;
		}
		toast("Успешно", {
			description: response.message,
			action: {
				label: "Закрыть",
				onClick: () => console.log("Undo"),
			},
		});
		setCloseShift(false);
	}

	return (
		<>
			<div className="px-3 py-2 ">
				<Sheet open={closeShift} onOpenChange={setCloseShift}>
					<SheetTrigger asChild>
						<Button className="w-full py-6 text-base">Добавить</Button>
					</SheetTrigger>
					<SheetContent side="bottom" className="p-1 pb-5">
						<SheetHeader>
							<SheetTitle className="text-lg">Добавить смену</SheetTitle>
							<SheetDescription className="text-base leading-[1.2]">
								Заполните данные о смене, включая время начала, и комментарий.
								Нажмите "Сохранить", чтобы добавить смену.
							</SheetDescription>
						</SheetHeader>
						<div className="grid flex-1 auto-rows-min gap-6 px-4">
							<div className="grid gap-3">
								<Label className="text-base" htmlFor="shift-start">
									Начало
								</Label>
								<Input
									onChange={({ target }) =>
										setStartShift((prev) => ({ ...prev, start: target.value }))
									}
									id="shift-start"
									placeholder="9:40"
								/>
							</div>
						</div>
						<div className="grid flex-1 auto-rows-min gap-6 px-4">
							<div className="grid gap-3">
								<Label className="text-base" htmlFor="shift-comment">
									Комментарий
								</Label>
								<Input
									onChange={({ target }) =>
										setStartShift((prev) => ({
											...prev,
											comment: target.value,
										}))
									}
									id="shift-comment"
									placeholder="Опаздал, пробки были"
								/>
							</div>
						</div>
						<SheetFooter className="z-50">
							<Button
								onClick={saveStartShift}
								className="py-6 text-base"
								type="submit"
							>
								Сохранить
							</Button>
							<SheetClose asChild>
								<Button className="py-6 text-base" variant="outline">
									Закрыть
								</Button>
							</SheetClose>
						</SheetFooter>
					</SheetContent>
				</Sheet>
			</div>
			<TableShifts />
		</>
	);
}
