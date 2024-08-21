import { Reorder, useDragControls } from "framer-motion";
import { DotsSixVertical, X } from "@phosphor-icons/react";
import { useState } from "react";

export default function Item(props) {
	const [isHoveringCheckIcon, setIsHoveringCheckIcon] = useState(false);
	const dragControls = useDragControls();
	const noStatus = props.item.status === "checked" ? "unchecked" : "checked";

	return (
		<Reorder.Item
			className={`${props.item.status}-item`}
			value={props.item}
			dragListener={false}
			dragControls={dragControls}
			variants={props.variants}
		>
			<span className="drag-icon">
				<DotsSixVertical
					onPointerDown={(event) => {
						dragControls.start(event);
					}}
				/>
			</span>

			<span
				className="check-icon"
				onMouseOver={() => {
					setIsHoveringCheckIcon(true);
				}}
				onMouseOut={() => {
					setIsHoveringCheckIcon(false);
				}}
				onClick={() => {
					props.handleCheck(props.item, props.item.status);
				}}
			>
				{isHoveringCheckIcon ? (
					<img
						className={`${props.item.status}-icon`}
						src={`to-do-list/src/assets/${noStatus}.svg`}
					/>
				) : (
					<img
						className={`${props.item.status}-icon`}
						src={`to-do-list/src/assets/${props.item.status}.svg`}
					/>
				)}
			</span>

			<p className={`${props.item.status}`}>{props.item.text}</p>

			<span
				className="delete-icon"
				onClick={() => {
					props.handleDeleteItem(props.item, props.item.status);
				}}
			>
				<X
					className="x"
					size={16}
				/>
			</span>
		</Reorder.Item>
	);
}
