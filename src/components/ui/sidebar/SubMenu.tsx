import React, { FC, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/solid';
import { useSelector } from 'react-redux';

interface SubNav {
  title: string;
  path: string;
  icon: JSX.Element;
  permisions: string[];
}

interface SubMenuProps {
  item: {
    title: string;
    path: string;
    icon: JSX.Element;
    subNav?: SubNav[];
  };
  showSidebar: () => void;
  setSelectedSubmenu: (value: string) => void;
  selectedSubmenu: string;
  handleSelectMenu: (value: string) => void;
}

const SubMenu: FC<SubMenuProps> = ({
  item,
  showSidebar,
  setSelectedSubmenu,
  selectedSubmenu,
  handleSelectMenu,
}) => {
  const [subnav, setSubnav] = useState(false);
  const { user } = useSelector(({ auth }) => auth);
  //const showSubnav = () => setSubnav(!subnav);

  return (
    <>
      <NavLink
        className={`flex items-center justify-between p-5 text-base text-white cursor-pointer hover:bg-rose-700 hover:border-l-4 hover:pl-4 ${
          selectedSubmenu === item.title ? 'bg-rose-700 border-l-4 pl-4' : ''
        }`}
        to={item.path}
        onClick={() => handleSelectMenu(item.title)}
      >
        <div className='flex items-center gap-4'>
          <i className='text-white'>{item.icon}</i>
          <span className=''>{item.title}</span>
        </div>
        <div>
          {item?.subNav?.length && (
            <ChevronUpIcon
              className={`w-5 h-5 ml-2 -mr-1 transition duration-200 ease-in ${
                selectedSubmenu === item.title ? 'rotate-180' : ''
              }`}
            />
          )}
        </div>
      </NavLink>
      <div
        className={`grid overflow-hidden transition bg-slate-900 duration-500 ease-in-out ${
          selectedSubmenu === item.title
            ? ' text-white '
            : ' max-h-0 transform text-transparent'
        }`}
      >
        {item.subNav.map((subItem, index) => {
          if (
            !subItem?.permisions ||
            subItem?.permisions.includes(user?.role?.role)
          ) {
            return (
              <Link
                className={`flex items-center p-5 pl-5  overflow-hidden  hover:bg-slate-600 `}
                to={subItem.path}
                key={index}
                onClick={() => showSidebar()}
              >
                {subItem.icon} <span>{subItem.title}</span>
              </Link>
            );
          }
        })}
      </div>
    </>
  );
};

export default SubMenu;
