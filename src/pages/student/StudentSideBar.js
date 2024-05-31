import React from 'react';
import { Divider, ListItemButton, ListItemIcon, ListItemText, ListSubheader } from '@mui/material';
import { Link, useLocation } from 'react-router-dom';

import HomeIcon from '@mui/icons-material/Home';
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import ClassOutlinedIcon from '@mui/icons-material/ClassOutlined';
import AssignmentIcon from '@mui/icons-material/Assignment';

const StudentSideBar = () => {
    const location = useLocation();

    const NavItem = ({ to, icon, text }) => (
        <ListItemButton component={Link} to={to} sx={{ color: location.pathname.startsWith(to) ? 'primary.main' : 'text.primary', borderRadius: '0 20px 20px 0', mb: 1 }}>
            <ListItemIcon>{icon}</ListItemIcon>
            <ListItemText primary={text} />
        </ListItemButton>
    );

    return (
        <div style={{ backgroundColor: '#f0f0f0', width: '100%', maxWidth: '280px', height: '100vh', paddingTop: '20px' }}>
            <div style={{ marginBottom: '20px' }}>
                <ListItemButton component={Link} to="/" sx={{ color: location.pathname === "/" ? 'primary.main' : 'text.primary', borderRadius: '0 20px 20px 0', mb: 1 }}>
                    <ListItemIcon><HomeIcon /></ListItemIcon>
                    <ListItemText primary="Home" />
                </ListItemButton>
            </div>
            <div style={{ marginBottom: '20px' }}>
                <NavItem to="/Student/subjects" icon={<AssignmentIcon />} text="Subjects" />
                <NavItem to="/Student/attendance" icon={<ClassOutlinedIcon />} text="Attendance" />
            </div>
            <Divider sx={{ my: 1 }} />
            <div>
                <ListSubheader component="div" inset style={{ fontWeight: 'bold', color: '#333' }}>
                    User
                </ListSubheader>
                <NavItem to="/Student/profile" icon={<AccountCircleOutlinedIcon />} text="Profile" />
                <NavItem to="/logout" icon={<ExitToAppIcon />} text="Logout" />
            </div>
        </div>
    );
};

export default StudentSideBar;
