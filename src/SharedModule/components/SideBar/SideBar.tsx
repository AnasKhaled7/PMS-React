import { useState } from "react";
import { NavLink } from "react-router-dom";
import { Sidebar, Menu, MenuItem } from "react-pro-sidebar";

export default function SideBar() {
  const [isCollapsed, setIsCollapsed] = useState(true);

  const toggleSidebar = () => setIsCollapsed((prev) => !prev);

  return (
    <Sidebar
      backgroundColor="transparent"
      rootStyles={{
        position: "sticky",
        top: 0,
        left: 0,
        bottom: 0,
        maxHeight: "100vh",
        backgroundColor: "#0E382F",
      }}
      collapsed={isCollapsed}
    >
      <Menu
        className="mt-5"
        menuItemStyles={{
          button: {
            color: "#FFF",
            [`&.active ,&:hover`]: {
              backgroundColor: "#EF9B284D",
            },
          },
        }}
      >
        <button
          onClick={toggleSidebar}
          style={{
            position: "absolute",
            top: "5px",
            right: "0px",
            zIndex: 1000,
            backgroundColor: "#EF9B28",
            color: "#FFF",
            border: "none",
            padding: "5px 4px",
            borderRadius: "5px 0px 0px 5px",
          }}
        >
          <i className={`fa fa-chevron-${isCollapsed ? "right" : "left"}`} />
        </button>

        <MenuItem
          icon={<i className="fa fa-home"></i>}
          component={<NavLink to="/dashboard" end />}
        >
          Home
        </MenuItem>
        <MenuItem
          icon={<i className="fa fa-users"></i>}
          component={<NavLink to="/dashboard/users" />}
        >
          Users
        </MenuItem>
        <MenuItem
          icon={<i className="fa-solid fa-table"></i>}
          component={<NavLink to="/dashboard/projects" />}
        >
          Projects
        </MenuItem>
        <MenuItem
          icon={<i className="fa-solid fa-list-check"></i>}
          component={<NavLink to="/dashboard/tasks" />}
        >
          Tasks
        </MenuItem>
      </Menu>
    </Sidebar>
  );
}
