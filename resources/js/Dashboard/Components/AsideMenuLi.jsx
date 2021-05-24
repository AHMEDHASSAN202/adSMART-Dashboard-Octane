import React, {useContext} from "react";
import { InertiaLink } from '@inertiajs/inertia-react'
import Permissions from "./Permissions";
import {AppContext} from "../AppContext";

export default function AsideMenuLi({menu}) {
    const {data: {newMessagesCount}} = useContext(AppContext);
    if (typeof menu.section != 'undefined') {
        return (
            <li className="menu-section">
                <h4 className="menu-text">{menu.section}</h4>
            </li>
        );
    }
    return (
        <Permissions hasPermissions={menu.permissions}>
            <li className={'menu-item ' + menu.extraClasses + ((menu.submenu && menu.submenu.length) ? ' menu-item-submenu ' : '')} aria-haspopup="true">
                {(menu.submenu && menu.submenu.length) ?
                    <a
                        id={menu.id}
                        href='#'
                        className='menu-link'
                    >
                        <i className={'menu-icon '+ menu.icon}></i>
                        <span className="menu-text">{menu.title}</span>
                        <i className="menu-arrow"></i>
                    </a> :
                    <InertiaLink
                        id={menu.id}
                        href={menu.page}
                        className='menu-link'
                    >
                        <i className={'menu-icon '+ menu.icon}></i>
                        <span className="menu-text">{menu.title}</span>
                       {menu.id == 'chat' && newMessagesCount != 0 && <span className="new-messages-count label label-md font-weight-bold label-danger d-flex align-self-center">{newMessagesCount}</span>}
                    </InertiaLink>
                }
                {
                    menu.submenu && menu.submenu.length ?
                        (
                            <div className="menu-submenu">
                                <i className="menu-arrow"></i>
                                <ul className="menu-subnav">
                                    {menu.submenu.map((m, i) => (
                                        <AsideMenuLi menu={m} key={i}/>
                                    ))}
                                </ul>
                            </div>
                        )
                        : ''
                }
            </li>
        </Permissions>
    );
}
