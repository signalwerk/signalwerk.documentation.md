import React from "react";

// check abstraction
const isActive = (item, path) => item.path === path;
// set an 'active' key on each object if
// a child is active
const setActive = (menu, path) => {
  // the returned menu
  let newMenu = {
    ...menu,
  };
  // is this menu active
  let subActive = false;

  // children check
  if (menu.children) {
    newMenu.children = [];
    menu.children.forEach((item) => {
      let { active, menu } = setActive(item, path);
      if (active) {
        subActive = true;
      }
      newMenu.children.push(menu);
    });
  }

  // if one of the children is active or the item itself
  newMenu.active = subActive || isActive(menu, path);

  // return
  return {
    active: newMenu.active,
    menu: newMenu,
  };
};
function menu(items, { level } = { level: 0 }) {
  if (!items) return null;
  return (
    <ul className={`menu menu--level-${level}`}>
      {items.map((item) => {
        return (
          <li
            className={`menu__item menu__item--${
              item.active ? "active" : "not-active"
            }`}
          >
            <a href={item.path} className="menu__item-link">
              <span className="menu__item-inner">{item.label}</span>
            </a>
          </li>
        );
      })}
    </ul>
  );
}
export function PageMenu({ page, name }) {
  const items = page?.menus?.[name]?.items;
  if (!items) return null;

  const menuData = setActive({ children: items }, page.path || "/");

  return (
    <div className={`page-menu page-menu--${name}`}>
      {menu(menuData?.menu?.children)}
    </div>
  );
}
