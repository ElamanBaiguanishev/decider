// import { Box, Typography, useTheme } from '@mui/material';
// import { Menu, MenuItem, SubMenu, Sidebar, MenuItemStyles } from "react-pro-sidebar";
// import SchoolOutlinedIcon from '@mui/icons-material/SchoolOutlined';
// import MenuBookOutlinedIcon from '@mui/icons-material/MenuBookOutlined';
// import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined';
// import GroupOutlinedIcon from '@mui/icons-material/GroupOutlined';
// import SubjectOutlinedIcon from '@mui/icons-material/SubjectOutlined';
// import BarChartOutlinedIcon from '@mui/icons-material/BarChartOutlined';
// import AssessmentOutlinedIcon from '@mui/icons-material/AssessmentOutlined';
// import PeopleAltOutlinedIcon from '@mui/icons-material/PeopleAltOutlined';
// import PersonAddOutlinedIcon from '@mui/icons-material/PersonAddOutlined';
// import PersonAddAltOutlinedIcon from '@mui/icons-material/PersonAddAltOutlined';
// import AdminPanelSettingsOutlinedIcon from '@mui/icons-material/AdminPanelSettingsOutlined';
// import ReceiptOutlinedIcon from '@mui/icons-material/ReceiptOutlined';
// import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
// import TableChartOutlinedIcon from '@mui/icons-material/TableChartOutlined';
// import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
// import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
// import { NavLink } from "react-router-dom";
// import { FC } from 'react';
// import { useAppDispatch, useAppSelector } from '../../store/hooks';
// import { setIsBroken, setIsCollapsed, toggleSidebar } from "../../store/sidebar/sidebarSlice";
// import { AdminPanelSettings, Person } from '@mui/icons-material';
// import { RoleTypes } from '../../types/role/role-types';
// import QrCodeIcon from '@mui/icons-material/QrCode';

// const SideBarFC: FC = () => {
//     const theme = useTheme();
//     const dispatch = useAppDispatch();
//     const isToggled = useAppSelector((state) => state.sidebar.isToggled);
//     const isCollapsed = useAppSelector((state) => state.sidebar.isCollapsed);
//     const userRole = useAppSelector((state) => state.user.user?.role);

//     const menuItemStyles: MenuItemStyles = {
//         SubMenuExpandIcon: {
//             color: '#e0e0e0',
//         }
//     };

//     const renderIfRole = (roles: string[], element: JSX.Element) => {
//         return roles.includes(userRole!.type) ? element : null;
//     };

//     return (
//         <Box sx={{ position: "sticky", display: "flex", height: "100vh", top: 0, bottom: 0, zIndex: 1299, "a": { color: `${theme.palette.background.default}`, textDecoration: "None" }, "& .ps-menu-button:hover": { color: `${theme.palette.primary} !important`, backgroundColor: "transparent !important", }, "& .ps-submenu-content": { backgroundColor: `${theme.palette.primary.main} !important` } }}>
//             <Sidebar
//                 collapsed={isCollapsed}
//                 toggled={isToggled}
//                 backgroundColor={theme.palette.primary.main}
//                 onBreakPoint={(broken) => dispatch(setIsBroken(broken))}
//                 breakPoint="md"
//                 onBackdropClick={() => dispatch(toggleSidebar())}
//             >
//                 <Menu menuItemStyles={menuItemStyles}>
//                     <MenuItem
//                         color="#e0e0e0"
//                         icon={
//                             isCollapsed ? (
//                                 <MenuOutlinedIcon sx={{ color: '#fff' }} onClick={() => dispatch(setIsCollapsed(false))} />
//                             ) : (
//                                 <CloseOutlinedIcon sx={{ color: '#fff' }} onClick={() => dispatch(setIsCollapsed(true))} />
//                             )
//                         }
//                     >
//                         {!isCollapsed && (
//                             <Box display="flex" justifyContent="space-between" alignItems="center" ml="15px">
//                                 <Typography variant="h3"
//                                     color="#e0e0e0"
//                                 >ADMINS v1.0
//                                 </Typography>
//                             </Box>
//                         )}
//                     </MenuItem>

//                     {renderIfRole([RoleTypes.ADMIN, RoleTypes.DEPUTY], (
//                         <SubMenu
//                             label={<Typography sx={{ color: '#fff' }}>Редактор</Typography>}
//                             icon={<SchoolOutlinedIcon sx={{ color: '#fff' }} />}
//                         >
//                             <NavLink style={({ isActive }) => {
//                                 return {
//                                     color: isActive ? theme.palette.action.active : ""
//                                 };
//                             }} to="/study-mode">
//                                 <MenuItem icon={<SchoolOutlinedIcon />}>
//                                     Форма обучения
//                                 </MenuItem>
//                             </NavLink>
//                             <NavLink style={({ isActive }) => {
//                                 return {
//                                     color: isActive ? theme.palette.action.active : ""
//                                 };
//                             }} to="/courses">
//                                 <MenuItem icon={<MenuBookOutlinedIcon />}>
//                                     Курс обучения
//                                 </MenuItem>
//                             </NavLink>
//                             <NavLink style={({ isActive }) => {
//                                 return {
//                                     color: isActive ? theme.palette.action.active : ""
//                                 };
//                             }} to="/semesters">
//                                 <MenuItem icon={<CalendarMonthOutlinedIcon />}>
//                                     Семестр
//                                 </MenuItem>
//                             </NavLink>
//                             <NavLink style={({ isActive }) => {
//                                 return {
//                                     color: isActive ? theme.palette.action.active : ""
//                                 };
//                             }} to="/groups">
//                                 <MenuItem icon={<GroupOutlinedIcon />}>
//                                     Группы
//                                 </MenuItem>
//                             </NavLink>
//                             <NavLink style={({ isActive }) => {
//                                 return {
//                                     color: isActive ? theme.palette.action.active : ""
//                                 };
//                             }} to="/lessons">
//                                 <MenuItem icon={<SubjectOutlinedIcon />}>
//                                     Предметы
//                                 </MenuItem>
//                             </NavLink>
//                             <NavLink style={({ isActive }) => {
//                                 return {
//                                     color: isActive ? theme.palette.action.active : ""
//                                 };
//                             }} to="/qr">
//                                 <MenuItem icon={<QrCodeIcon />}>
//                                     QR
//                                 </MenuItem>
//                             </NavLink>
//                         </SubMenu>
//                     ))}

//                     {renderIfRole([RoleTypes.ADMIN, RoleTypes.DEPUTY], (
//                         <SubMenu
//                             label={<Typography sx={{ color: '#fff' }}>Отчеты</Typography>}
//                             icon={<BarChartOutlinedIcon sx={{ color: '#fff' }} />}
//                         >
//                             <NavLink style={({ isActive }) => {
//                                 return {
//                                     color: isActive ? theme.palette.action.active : ""
//                                 };
//                             }} to="/reports/report1">
//                                 <MenuItem icon={<BarChartOutlinedIcon />}>
//                                     Форма отчета #1
//                                 </MenuItem>
//                             </NavLink>
//                             <NavLink style={({ isActive }) => {
//                                 return {
//                                     color: isActive ? theme.palette.action.active : ""
//                                 };
//                             }} to="/reports/report2">
//                                 <MenuItem icon={<AssessmentOutlinedIcon />}>
//                                     Форма отчета #2
//                                 </MenuItem>
//                             </NavLink>
//                         </SubMenu>
//                     ))}

//                     {renderIfRole([RoleTypes.ADMIN, RoleTypes.DEPUTY, RoleTypes.MANAGER], (
//                         <SubMenu
//                             label={<Typography sx={{ color: '#fff' }}>Студенты</Typography>}
//                             icon={<PeopleAltOutlinedIcon sx={{ color: '#fff' }} />}
//                         >
//                             <NavLink style={({ isActive }) => {
//                                 return {
//                                     color: isActive ? theme.palette.action.active : ""
//                                 };
//                             }} to="/clients">
//                                 <MenuItem icon={<PeopleAltOutlinedIcon />}>
//                                     Список
//                                 </MenuItem>
//                             </NavLink>
//                             <NavLink style={({ isActive }) => {
//                                 return {
//                                     color: isActive ? theme.palette.action.active : ""
//                                 };
//                             }} to="/create-client">
//                                 <MenuItem icon={<PersonAddOutlinedIcon />}>
//                                     Добавить
//                                 </MenuItem>
//                             </NavLink>

//                             <NavLink style={({ isActive }) => {
//                                 return {
//                                     color: isActive ? theme.palette.action.active : ""
//                                 };
//                             }} to="/clients-parser">
//                                 <MenuItem icon={<PersonAddOutlinedIcon />}>
//                                     Парсер
//                                 </MenuItem>
//                             </NavLink>
//                         </SubMenu>
//                     ))}

//                     {renderIfRole([RoleTypes.ADMIN], (
//                         <SubMenu
//                             label={<Typography sx={{ color: '#fff' }}>Сотрудники</Typography>}
//                             icon={<AdminPanelSettingsOutlinedIcon sx={{ color: '#fff' }} />}
//                         >
//                             <Typography sx={{ padding: '0 24px', color: '#fff', ml: '16px', mt: '8px' }} variant="body2">
//                                 Пользователи
//                             </Typography>
//                             <NavLink style={({ isActive }) => {
//                                 return {
//                                     color: isActive ? theme.palette.action.active : ""
//                                 };
//                             }} to="/create-user">
//                                 <MenuItem icon={<PersonAddAltOutlinedIcon />}>
//                                     Регистрация
//                                 </MenuItem>
//                             </NavLink>
//                             <NavLink style={({ isActive }) => {
//                                 return {
//                                     color: isActive ? theme.palette.action.active : ""
//                                 };
//                             }} to="/users">
//                                 <MenuItem icon={<Person />}>
//                                     Список
//                                 </MenuItem>
//                             </NavLink>

//                             <Typography sx={{ padding: '0 24px', color: '#fff', ml: '16px', mt: '8px' }} variant="body2">
//                                 Роли
//                             </Typography>
//                             <NavLink style={({ isActive }) => {
//                                 return {
//                                     color: isActive ? theme.palette.action.active : ""
//                                 };
//                             }} to="/roles">
//                                 <MenuItem icon={<AdminPanelSettings />}>
//                                     Список
//                                 </MenuItem>
//                             </NavLink>
//                             <NavLink style={({ isActive }) => {
//                                 return {
//                                     color: isActive ? theme.palette.action.active : ""
//                                 };
//                             }} to="/create-role">
//                                 <MenuItem icon={<AdminPanelSettingsOutlinedIcon />}>
//                                     Новая роль
//                                 </MenuItem>
//                             </NavLink>
//                         </SubMenu>
//                     ))}

//                     {renderIfRole([RoleTypes.ADMIN, RoleTypes.DEPUTY], (
//                         <NavLink style={({ isActive }) => {
//                             return {
//                                 color: isActive ? theme.palette.action.active : ""
//                             };
//                         }} to="/price-list">
//                             <MenuItem icon={<ReceiptOutlinedIcon />}>
//                                 Прайс лист
//                             </MenuItem>
//                         </NavLink>
//                     ))}

//                     {renderIfRole([RoleTypes.ADMIN, RoleTypes.DEPUTY], (
//                         <NavLink style={({ isActive }) => {
//                             return {
//                                 color: isActive ? theme.palette.action.active : ""
//                             };
//                         }} to="/logs">
//                             <MenuItem icon={<ReceiptOutlinedIcon />}>
//                                 Журнал
//                             </MenuItem>
//                         </NavLink>
//                     ))}

//                     {renderIfRole([RoleTypes.ADMIN, RoleTypes.DEPUTY], (
//                         <NavLink style={({ isActive }) => {
//                             return {
//                                 color: isActive ? theme.palette.action.active : ""
//                             };
//                         }} to="/bot-interaction">
//                             <MenuItem icon={<ShoppingCartOutlinedIcon />}>
//                                 Обращения к боту
//                             </MenuItem>
//                         </NavLink>
//                     ))}

//                     {renderIfRole([RoleTypes.ADMIN, RoleTypes.DEPUTY, RoleTypes.MANAGER], (
//                         <NavLink style={({ isActive }) => {
//                             return {
//                                 color: isActive ? theme.palette.action.active : ""
//                             };
//                         }} to="/orders">
//                             <MenuItem icon={<ShoppingCartOutlinedIcon />}>
//                                 Заказы
//                             </MenuItem>
//                         </NavLink>
//                     ))}

//                     {renderIfRole([RoleTypes.ADMIN, RoleTypes.DEPUTY], (
//                         <NavLink style={({ isActive }) => {
//                             return {
//                                 color: isActive ? theme.palette.action.active : ""
//                             };
//                         }} to="/parser">
//                             <MenuItem icon={<TableChartOutlinedIcon />}>
//                                 Парсер
//                             </MenuItem>
//                         </NavLink>
//                     ))}
//                 </Menu>
//             </Sidebar>
//         </Box>
//     );
// }

// export default SideBarFC;
