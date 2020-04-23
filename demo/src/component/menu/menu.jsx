import React from 'react';
import { Link } from 'react-router-dom';
//引用antd的Menu组件
import { Menu } from 'antd';
import './menu.css';

const ZLMenu = ({menuList}) => (
    <Menu className='style_menu' mode='inline' theme="dark">
        {menuList.map((menu, index) => {
            if (menu.subMenus) {
                return <Menu.SubMenu key={index} title={<span>{menu.icon}<span>{menu.label}</span></span>}>
                    {menu.subMenus.map((subMenu, subIndex) => {
                        return <Menu.Item key={index + '-' + subIndex}>
                            <Link to={subMenu.link}>{subMenu.label}</Link>
                        </Menu.Item>
                    })}
                </Menu.SubMenu>;
            } else if (menu.link) {
                return <Menu.Item key={index}>
                    {menu.icon}
                    <span><Link className="menu-nochild-link" to={menu.link}>{menu.label}</Link></span>
                </Menu.Item>;
            } else {
                return <Menu.Item key={index}>
                    {menu.icon}
                    <span>{menu.label}</span></Menu.Item>
            }
        })}
    </Menu>
);

export default ZLMenu;