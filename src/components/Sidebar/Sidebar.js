import React from 'react';
import logo from "../../assets/logo.png";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  CDBSidebar,
  CDBSidebarContent,
  CDBSidebarFooter,
  CDBSidebarHeader,
  CDBSidebarMenu,
  CDBSidebarMenuItem,
} from 'cdbreact';
import { NavLink } from 'react-router-dom';
 
const Sidebar = () => {
    return (
      <div
        style={{ display:'grid', height: '100vh' }}
      >
        <CDBSidebar textColor="#fff" backgroundColor="#333">
        <img src={logo} alt="logo"  style={{width:"80px", padding:"8px"}}/>
          <CDBSidebarHeader prefix={<i className="fa fa-bars fa-large"></i>}>
        
            <a
              href="/"
              className="text-decoration-none"
              style={{ color: 'inherit' }}
            >
              Sidebar
            </a>
            
          </CDBSidebarHeader>
   
          <CDBSidebarContent className="sidebar-content">
            <CDBSidebarMenu>
              <NavLink exact to="/" activeClassName="activeClicked">
                <CDBSidebarMenuItem icon="home">Home</CDBSidebarMenuItem>
              </NavLink>
              <NavLink exact to="/files" activeClassName="activeClicked">
                <CDBSidebarMenuItem icon="file">Files</CDBSidebarMenuItem>
              </NavLink>
              <NavLink exact to="/archive" activeClassName="activeClicked">
                <CDBSidebarMenuItem icon="archive">archive</CDBSidebarMenuItem>
              </NavLink>
              <NavLink exact to="/profile" activeClassName="activeClicked">
                <CDBSidebarMenuItem icon="user">Profile page</CDBSidebarMenuItem>
              </NavLink>
              <NavLink exact to="/analytics" activeClassName="activeClicked">
                <CDBSidebarMenuItem icon="chart-line">
                  Analytics
                </CDBSidebarMenuItem>
              </NavLink>
              <NavLink exact to="/Administration" activeClassName="activeClicked">
                <CDBSidebarMenuItem icon="hdd">
              
                  Administration
                </CDBSidebarMenuItem>
              </NavLink>
           
              <NavLink exact to="/groupes" activeClassName="activeClicked">
                <CDBSidebarMenuItem icon="users">
              Groupes
                </CDBSidebarMenuItem>
              </NavLink>
          
              <NavLink
                exact
                to="/hero404"
                target="_blank"
                activeClassName="activeClicked"
              >
                <CDBSidebarMenuItem icon="">
                  404 page
                </CDBSidebarMenuItem>
              </NavLink>
              <NavLink
                exact
                to="/hero404"
                target="_blank"
                activeClassName="activeClicked"
              >
                <CDBSidebarMenuItem icon="exclamation-circle">
                  404 page
                </CDBSidebarMenuItem>
              </NavLink>
              <NavLink exact to="/Chat" activeClassName="activeClicked">
                <CDBSidebarMenuItem icon="">
              Chat
                </CDBSidebarMenuItem>
              </NavLink>
         
            </CDBSidebarMenu>
          </CDBSidebarContent>
   
          <CDBSidebarFooter style={{ textAlign: 'center' }}>
            <div
              style={{
                padding: '20px 5px',
              }}
            >
              Sidebar Footer
            </div>
          </CDBSidebarFooter>
        </CDBSidebar>
      </div>
    );
  };
   
 
export default Sidebar;