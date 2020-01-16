import React from 'react';

const ItemList = (props) => {
  const listItems = props.data.map((item) =>
    <li key={item.description}>
      {item.description}
    </li>
  );

  return (
    <ul>
      {listItems}
    </ul>
  );
}

export default ItemList;