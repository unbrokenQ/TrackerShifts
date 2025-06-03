import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { db } from "@/db";
import { Label } from "@radix-ui/react-label";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import {
	Sheet,
	SheetClose,
	SheetContent,
	SheetDescription,
	SheetFooter,
	SheetHeader,
	SheetTitle,
} from "./ui/sheet";

export default function TableShifts() {
	const [shifts, setShifts] = useState<Shift[]>([]);
	const [closeShift, setCloseShift] = useState({
		open: false,
		id: NaN,
		end: "",
		comment: "",
	});

	const getShifts = async () => {
		const data = await db.getShifts();
		if (data.isError) {
			toast("Ошибка", {
				description: data.message,
				action: {
					label: "Закрыть",
					onClick: () => console.log("Undo"),
				},
			});
			return;
		}
		setShifts(data.data);
	};

	const saveShift = async () => {
		const data = await db.closeShifts(closeShift.id, {
			end: closeShift.end,
			comment: closeShift.comment,
		});
		if (data.isError) {
			toast("Ошибка", {
				description: data.message,
				action: {
					label: "Закрыть",
					onClick: () => console.log("Undo"),
				},
			});
			return;
		}
		toast("Успешно", {
			description: data.message,
			action: {
				label: "Закрыть",
				onClick: () => console.log("Undo"),
			},
		});
		getShifts();
	};

	useEffect(() => {
		getShifts();
	}, []);
	return (
		<div className="bg-black overflow-hidden rounded-md border mt-2">
			<Table>
				<TableHeader>
					<TableRow className="bg-muted/50">
						<TableHead className="h-9 py-2">Дата</TableHead>
						<TableHead className="h-9 py-2">Начало</TableHead>
						<TableHead className="h-9 py-2">Конец</TableHead>
						<TableHead className="h-9 py-2">Коммент</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{shifts.map((shift, idx) => (
						<TableRow key={idx}>
							<TableCell className="py-2 font-medium">{shift.date}</TableCell>
							<TableCell className="py-2 font-medium">{shift.start}</TableCell>
							<TableCell className="py-2">
								{shift.end ? (
									shift.end
								) : (
									<Button
										onClick={() => {
											setCloseShift({
												open: true,
												id: shift.id,
												end: shift.end,
												comment: shift.comment,
											});
										}}
										size="sm"
									>
										Закрыть
									</Button>
								)}
							</TableCell>
							<TableCell className="py-2">
								{shift.comment ? shift.comment : "----"}
							</TableCell>
						</TableRow>
					))}
				</TableBody>
				<Sheet
					open={closeShift.open}
					onOpenChange={(state) =>
						setCloseShift((prev) => ({ ...prev, open: state }))
					}
				>
					<SheetContent side="bottom" className="p-1 pb-5">
						<SheetHeader>
							<SheetTitle className="text-lg">Закрыть смену</SheetTitle>
							<SheetDescription className="text-base leading-[1.2]">
								Заполните данные о смене, включая время конца, и комментарий.
								Нажмите "Сохранить", чтобы закрыть смену.
							</SheetDescription>
						</SheetHeader>
						<div className="grid flex-1 auto-rows-min gap-6 px-4">
							<div className="grid gap-3">
								<Label className="text-base" htmlFor="shift-end">
									Конец
								</Label>
								<Input
									onChange={({ target }) =>
										setCloseShift((prev) => ({ ...prev, end: target.value }))
									}
									id="shift-end"
									placeholder="23:40"
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
										setCloseShift((prev) => ({
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
								onClick={saveShift}
								className="py-6 text-base"
								type="submit"
							>
								Сохранить
							</Button>
							<SheetClose asChild>
								<Button className="py-6 text-base" variant="outline">
									Назад
								</Button>
							</SheetClose>
						</SheetFooter>
					</SheetContent>
				</Sheet>
			</Table>
		</div>
	);
}
