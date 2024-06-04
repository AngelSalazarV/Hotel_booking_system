import { LayoutDashboard, Circle, Check, ClipboardCheck } from "lucide-react"
import Sidebar, { SidebarItem } from './Sidebar'
import DashboardContent from './sidebarContent/DashboardContent'
import VentasContent from "./sidebarContent/VentasContent"
import HabitacionesContent from "./sidebarContent/HabitacionesContent"
import CategoriasContent from "./sidebarContent/CategoriasContent"
import NivelesContent from "./sidebarContent/NivelesContent"
import { Routes, useNavigate, Route,Navigate, useLocation } from 'react-router-dom'
import useTheme from '../hook/useTheme'
import VentasProductosContent from "./sidebarContent/VentasProductosContent"
import UsuariosContent from "./sidebarContent/UsuariosContent"
import VentasVentaContent from "./sidebarContent/VentasVentaContent"


export default function MainApp() {

    //Estado poner activo el elemento y cambiar el contenido
    const navigate = useNavigate()
    const location = useLocation()
    const { theme } = useTheme()

    const isActive = (path) => location.pathname === path

    return(
    <div className={`flex  ${theme} h-`}>
        <Sidebar>
            <SidebarItem icon={<LayoutDashboard size={20}/>} text="Dashboard" active={isActive("/dashboard")} onClick={() => navigate("/dashboard")}/>
            <SidebarItem icon={<LayoutDashboard size={20}/>} text="Ventas" active={isActive("/ventas")} >
                <SidebarItem icon={<Circle size={20}/>} text="Productos" active={isActive("/ventas/productos")} onClick={() => navigate("/ventas/productos")}/>
                <SidebarItem icon={<Circle size={20}/>} text="Venta" active={isActive("/ventas/venta")} onClick={() => navigate("/ventas/venta")}/>
            </SidebarItem>
            <SidebarItem icon={<ClipboardCheck size={20}/>} text="Configuración" active={isActive("/configuracion")}>
                <SidebarItem icon={<Circle size={20}/>} text="Habitaciones" active={isActive("/habitaciones")} onClick={() => navigate("configuracion/habitaciones")}/>
                <SidebarItem icon={<Circle size={20}/>} text="Categorias" active={isActive("/categorias")} onClick={() => navigate("/configuracion/categorias")}/>
                <SidebarItem icon={<Circle size={20}/>} text="Niveles" active={isActive("/niveles")} onClick={() => navigate("/configuracion/niveles")}/>
            </SidebarItem>
            <SidebarItem icon={<LayoutDashboard size={20}/>} text="Usuarios" active={isActive("/usuarios")} onClick={() => navigate("/usuarios")}/>
        </Sidebar>
        <section className={`w-full min-h-screen bg-gray-50 dark:bg-negro-claro`}>
            <Routes>
                <Route path="/" element={<Navigate to="/dashboard" />} />
                <Route path="/dashboard" element={<DashboardContent/>} />
                <Route path="/ventas" element={<VentasContent/>} />
                <Route path="/ventas/productos" element={<VentasProductosContent/>} />
                <Route path="/ventas/venta" element={<VentasVentaContent/>} />
                <Route path="/configuracion/habitaciones" element={<HabitacionesContent/>} />
                <Route path="/configuracion/categorias" element={<CategoriasContent/>} />
                <Route path="/configuracion/niveles" element={<NivelesContent/>} />
                <Route path="/usuarios" element={<UsuariosContent/>} />
            </Routes>
        </section>
    </div>

    )
}