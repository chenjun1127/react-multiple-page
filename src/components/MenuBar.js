import React from 'react';
const MenuBar = (props) => {
  console.log(props);
  const menu = [
    {
      id: 0,
      name: 'index',
      path: 'index.html',
    },
    {
      id: 1,
      name: 'second',
      path: 'second.html',
    },
    // {
    //   id: 2,
    //   name: '第三页',
    //   path: 'third.html',
    // },
  ];
  return (
    <ul className="menu">
      {menu.map((item) => {
        return (
          <li key={item.id} className={props.name === item.name ? 'act' : ''}>
            <a href={item.path}>{item.name}</a>
          </li>
        );
      })}
    </ul>
  );
};

export default MenuBar;
