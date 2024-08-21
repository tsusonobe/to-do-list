import { Reorder, motion } from "framer-motion";
import Item from "./Item";

export default function ListItem(props) {
	const itemVariants = {
		open: {
			opacity: 1,
			y: 0,
			transition: { type: "spring", stiffness: 300, damping: 24 },
		},
		closed: { opacity: 0, y: 20 },
	};

	return (
		<>
			<Reorder.Group
				className={`${props.currentPage}-group`}
				axis="y"
				values={props.items}
				onReorder={props.handleReorder}
				initial={"closed"}
				animate={"open"}
			>
				{props.items.length !== 0 ? (
					props.items.map((item) => (
						<Item
							key={item.id}
							item={item}
							handleCheck={props.handleCheck}
							handleDeleteItem={props.handleDeleteItem}
							variants={itemVariants}
						/>
					))
				) : (
					<motion.p
						className="empty-message"
						variants={itemVariants}
					>
						{props.currentPage === "unchecked" ? "ufa terminamos tudo 😮‍💨" : "isso aqui tá meio vazio... temos que começar a fazer algumas tarefas 😶‍🌫️"}
					</motion.p>
				)}
			</Reorder.Group>
		</>
	);
}
