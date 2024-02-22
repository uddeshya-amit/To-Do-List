import { useState, useEffect } from "react";
import deleteIcon from "./trash.png";
import check from "./check-mark.png";

function TodoApp() {
	const [completedScreen, setIsCompletedScreen] = useState(false);
	const [completed, setIsCompleted] = useState([]);
	const [allTask, setAllTask] = useState([]);
	const [task, setTask] = useState("");
	const [description, setDiscription] = useState("");

	function handleAddTask() {
		if (task) {
			let newTAsk = {
				title: task,
				objective: description,
			};
			let updatedTasks = [...allTask];
			updatedTasks.push(newTAsk);
			setAllTask(updatedTasks);
			localStorage.setItem("todolist", JSON.stringify(updatedTasks));
			setTask("");
			setDiscription("");
		}
		return;
	}

	function handelDelete(index) {
		let leftTodos = [...allTask];
		leftTodos.splice(index, 1);
		localStorage.setItem("todolist", JSON.stringify(leftTodos));
		setAllTask(leftTodos);
	}

	function handelCompletedTAsk(index) {
		let completedTask = {
			...allTask[index],
		};
		let updatedCompletedTask = [...completed];
		updatedCompletedTask.push(completedTask);
		setIsCompleted(updatedCompletedTask);
		localStorage.setItem(
			"completedTasks",
			JSON.stringify(updatedCompletedTask)
		);
		handelDelete(index);
	}

	function handelcompletedDelete(index) {
		let leftCompleted = [...completed];
		leftCompleted.splice(index, 1);
		localStorage.setItem("completedTasks", JSON.stringify(leftCompleted));
		setIsCompleted(leftCompleted);
	}

	useEffect(() => {
		let savedTodos = JSON.parse(localStorage.getItem("todolist"));
		let savedCompletedTasks = JSON.parse(
			localStorage.getItem("completedTasks")
		);
		if (savedTodos) {
			setAllTask(savedTodos);
		}
		if (savedCompletedTasks) {
			setIsCompleted(savedCompletedTasks);
		}
	}, []);

	return (
		<div className="bg-gray-800 h-screen w-full text-white">
			<div className="flex justify-center p-7 bg-gray-800">
				<h1 className="text-white text-3xl font-bold ">My Tasks</h1>
			</div>
			<div className="bg-gray-800 overflow-auto">
				<div className="flex justify-between bg-slate-900 mx-80 p-5">
					<div className="ml-4">
						<div>
							<label className="text-l font-semibold" htmlFor="task">
								Task:
							</label>
						</div>
						<div>
							<input
								className="w-80 mt-2 p-1 text-gray-800 focus:outline-none border-2 focus:border-green-500 focus:scale-105 focus:transition duration-150 ease-in-out"
								type="text"
								placeholder="enter the task"
								value={task}
								onChange={(e) => setTask(e.target.value)}
							/>
						</div>
					</div>
					<div className="ml-4">
						<div>
							<label className="text-l font-semibold" htmlFor="description">
								Description:
							</label>
						</div>

						<div>
							<input
								className="w-80 mt-2 p-1 text-gray-800 focus:outline-none border-2 focus:border-green-500 focus:scale-105 focus:transition duration-150 ease-in-out"
								type="text"
								placeholder="description"
								value={description}
								onChange={(e) => setDiscription(e.target.value)}
							/>
						</div>
					</div>
					<div className="bg-green-600 active:bg-green-700 active:scale-95 active:transition-all duration-100 ease-in-out flex justify-center w-20 h-9 mt-8 mx-8 ">
						<button className="text-l " onClick={handleAddTask}>
							Add
						</button>
					</div>
				</div>

				<div className="mx-80 bg-slate-700 ">
					<hr className="border border-slate-600 mx-20 " />

					<div className="flex mt-10 mx-10 py-4">
						<div
							className={`bg-green-500 p-1 px-2 ${
								!completedScreen ? "bg-green-500" : "bg-slate-800"
							}`}>
							<button onClick={() => setIsCompletedScreen(false)}>Todo</button>
						</div>
						<div
							className={`p-1 px-2 ${
								completedScreen ? "bg-green-500" : "bg-slate-800"
							}`}>
							<button onClick={() => setIsCompletedScreen(true)}>
								Completed
							</button>
						</div>
					</div>
					<div className=" p-4">
						{completedScreen === false &&
							allTask.map((singleTask, index) => {
								return (
									<div
										className="flex justify-between mt-4 mx-10 p-3 bg-gray-900 shadow-lg shadow-slate-800 "
										key={index}>
										<div className="">
											<h1 className="text-3xl text-green-700 font-bold">
												{singleTask.title}
											</h1>
											<p className="text-gray-400 mt-2 font-medium">
												{singleTask.objective}
											</p>
										</div>
										<div className="flex gap-6">
											<button
												className="active:scale-90 active:transition-all duration-150 ease-in-out"
												onClick={() => handelCompletedTAsk(index)}>
												<img className="h-8 w-8" src={check} alt="" />
											</button>
											<button
												className="active:scale-90 active:transition-all duration-150 ease-in-out"
												onClick={() => handelDelete(index)}>
												<img className="h-8 w-8" src={deleteIcon} alt="" />
											</button>
										</div>
									</div>
								);
							})}

						{completedScreen === true &&
							completed.map((singleTask, index) => {
								return (
									<div
										className="flex justify-between mt-4 mx-10 p-3 bg-gray-900 shadow-lg shadow-slate-800"
										key={index}>
										<div className="">
											<h1 className="text-3xl text-green-700 font-bold">
												{singleTask.title}
											</h1>
											<p className="text-gray-400 mt-2 font-medium">
												{singleTask.objective}
											</p>
										</div>
										<div className="flex gap-6">
											<button onClick={() => handelcompletedDelete(index)}>
												<img
													className="h-8 w-8 active:scale-90 active:transition-all duration-150 ease-in-out"
													src={deleteIcon}
													alt=""
												/>
											</button>
										</div>
									</div>
								);
							})}
					</div>
				</div>
			</div>
		</div>
	);
}
export default TodoApp;
