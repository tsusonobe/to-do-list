function deleteItem(list, item) {
	const index = list.indexOf(item);
	index > -1 && list.splice(index, 1);
	return list;
}

function reorderItems(list, indexFrom, indexTo) {
	list.splice(indexTo, 0, list.splice(indexFrom, 1)[0]);
	return list;
}

export { deleteItem, reorderItems };
