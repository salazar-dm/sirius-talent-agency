function ListGroup(items: string[]) {


    return (
    <>
        <h1>List</h1>
        {items.length === 0 && <p>No item found</p>}
        <ul className="list-group">
            {items.map((item, index) => (
                //key="{item.id}" in real-world app
                <li key={item}
                    className="list-group-item"
                    onClick={() => console.log(item, index)}>{item}</li>
            ))}
        </ul>
    </>)
}

export default ListGroup