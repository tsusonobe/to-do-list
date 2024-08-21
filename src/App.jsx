import { useState, useEffect } from "react";
import { deleteItem } from "./utils/utils";
import { motion } from "framer-motion";
import ListItem from "./components/List";
import NavBar from "./components/NavBar";

export default function App() {
	const [items, setItems] = useState([]);
	const [itemsChecked, setItemsChecked] = useState([]);
	const [itemText, setItemText] = useState("");
	const [currentPage, setCurrentPage] = useState("unchecked");
	const idItem = items.length + itemsChecked.length;

	function handleAddItems(newItemText) {
		const newItem = {
			id: idItem,
			text: newItemText,
			status: "unchecked",
		};

		const newList = [...items, newItem];
		setItems(newList);
		persistData(newList);
	}

	function handleDeleteItem(item, itemStatus) {
		if (itemStatus === "unchecked") {
			const newList = [...items];
			deleteItem(newList, item);
			setItems(newList);
			persistData(newList);
		} else {
			const newListChecked = [...itemsChecked];
			deleteItem(newListChecked, item);
			setItemsChecked(newListChecked);
			persistData(newListChecked);
		}
	}

	function handleCheck(item, itemStatus) {
		const newList = [...items];
		const newListChecked = [...itemsChecked];

		if (itemStatus === "unchecked") {
			const index = newList.indexOf(item);
			newList[index].status = "checked";
			newListChecked[newListChecked.length] = newList[index];
			deleteItem(newList, newList[index]);
		} else {
			const index = newListChecked.indexOf(item);
			newListChecked[index].status = "unchecked";
			newList[newList.length] = newListChecked[index];
			deleteItem(newListChecked, newListChecked[index]);
		}

		setItems(newList);
		setItemsChecked(newListChecked);
		persistData(newList);
		persistDataChecked(newListChecked);
	}

	function handleKey(keyPressed) {
		if (keyPressed === "Enter") {
			handleAddItems(itemText);
			setItemText("");
		}
	}

	function persistData(newList) {
		localStorage.setItem("items", JSON.stringify({ items: newList }));
	}

	function persistDataChecked(newListChecked) {
		localStorage.setItem(
			"itemsChecked",
			JSON.stringify({ items: newListChecked })
		);
	}

	useEffect(() => {
		if (!localStorage) {
			return;
		}

		let localItemsUnchecked = localStorage.getItem("items");
		let localItemsChecked = localStorage.getItem("itemsChecked");

		if (!localItemsUnchecked && !localItemsChecked) {
			setItems([
				{
					text: "Criar funcionalidade x no sistema",
					status: "unchecked",
				},
				{
					text: "Ir pra academia",
					status: "unchecked",
				},
				{
					text: "Estudar React",
					status: "unchecked",
				},
			]);
			return;
		}

		if (localItemsUnchecked) {
			localItemsUnchecked = JSON.parse(localItemsUnchecked).items;
			setItems(localItemsUnchecked);
		}
		if (localItemsChecked) {
			localItemsChecked = JSON.parse(localItemsChecked).items;
			setItemsChecked(localItemsChecked);
		}
	}, []);

	return (
		<main>
			<motion.section>
				<h1>to-do list</h1>
				<hr className="solid" />
				<input
					type="text"
					placeholder="add a new task"
					value={itemText}
					onChange={(e) => {
						setItemText(e.target.value);
					}}
					onKeyUp={(e) => {
						handleKey(e.key);
					}}
				/>

				<NavBar
					currentPage={currentPage}
					handleChangePage={setCurrentPage}
				/>

				<ListItem
					currentPage={currentPage}
					items={currentPage === "unchecked" ? items : itemsChecked}
					handleReorder={
						currentPage === "unchecked" ? setItems : setItemsChecked
					}
					handleCheck={handleCheck}
					handleDeleteItem={handleDeleteItem}
				/>
			</motion.section>
		</main>
	);
}
