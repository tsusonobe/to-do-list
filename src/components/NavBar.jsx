export default function NavBar(props) {
	return (
		<nav>
			<ul className="statusBar">
				<li
					className="selected-unchecked-page"
					onClick={(e) => {
						e.target.nextElementSibling.className = "checked-page";
						e.target.className = "selected-unchecked-page";
						props.handleChangePage("unchecked");
					}}
				>
					to-do
				</li>
				<li
					className="checked-page"
					onClick={(e) => {
						e.target.previousElementSibling.className = "unchecked-page";
						e.target.className = "selected-checked-page";
						props.handleChangePage("checked");
					}}
				>
					completed
				</li>
			</ul>
		</nav>
	);
}
