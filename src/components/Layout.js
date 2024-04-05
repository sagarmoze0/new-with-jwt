
import React, { useState } from 'react';
import SideBar from './SideBar';
import { HiOutlineMenuAlt1 } from 'react-icons/hi';
 
function Layout(props) {
    const [showSideBar, setShowSideBar] = useState(true);
  return (
    <div className='layout flex w-full'>
      <div className='sidebar'>
        <SideBar showSideBar={showSideBar} />
      </div>
      <div className='w-full'>
        <div className='header bg-primary h-20 w-full'>
          <HiOutlineMenuAlt1
            onClick={() => setShowSideBar(!showSideBar)}
            color='gray'
            size={30}
            className='cursor-pointer'
          />
        </div>
        <div className='content'>{props.children}</div>
      </div>
    </div>
  );
}
 
export default Layout;