import { Toaster } from "sonner";
import { Tracker } from "./components/Tracker";

function App() {
	return (
		<>
			<div className="rounded-t-3xl w-full min-h-screen bg-gray-200/10 overflow-hidden py-2 px-2">
				<div className="w-full px-3 py-1 flex items-center justify-between">
					<h2 className="text-2xl font-semibold">Все смены</h2>
					<p className="text-lg text-gray-100/80">Name</p>
				</div>
				<Tracker />
			</div>
			<Toaster />
		</>
	);
}

export default App;
