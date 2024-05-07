import { LayoutDashboard, Circle, Check, ClipboardCheck } from "lucide-react"
import Sidebar, { SidebarItem } from './Sidebar'
import DashboardContent from './sidebarContent/DashboardContent'
import VentasContent from "./sidebarContent/VentasContent"
import SalidasContent from "./sidebarContent/SalidasContent"
import { Routes, useNavigate, Route,Navigate, useLocation } from 'react-router-dom'
import useTheme from '../hook/useTheme'
import VenderContent from "./sidebarContent/VenderContent"


export default function MainApp() {

    //Estado poner activo el elemento y cambiar el contenido
    const navigate = useNavigate()
    const location = useLocation()
    const { theme } = useTheme()

    const isActive = (path) => location.pathname === path

    return(
    <div className={`flex  ${theme}`}>
        <Sidebar>
            <SidebarItem icon={<LayoutDashboard size={20}/>} text="Dashboard" active={isActive("/dashboard")} onClick={() => navigate("/dashboard")}/>
            <SidebarItem icon={<LayoutDashboard size={20}/>} text="Ventas" active={isActive("/ventas")} onClick={() => navigate("/ventas")}>
                <SidebarItem icon={<Circle size={20}/>} text="Vender" active={isActive("/ventas/vender")} onClick={() => navigate("/ventas/vender")}/>
                <SidebarItem icon={<Circle size={20}/>} text="Listado Consumo" active={isActive("/ventas/consumo")} onClick={() => navigate("/ventas/consumo")}/>
            </SidebarItem>
            <SidebarItem icon={<ClipboardCheck size={20}/>} text="Verificacion de salidas" active={isActive("/salidas")} onClick={() => navigate("/salidas")}/>
        </Sidebar>
        <section className={`w-full min-h-screen bg-gray-50 dark:bg-negro-claro`}>
            <Routes>
                <Route path="/" element={<Navigate to="/dashboard" />} />
                <Route path="/dashboard" element={<DashboardContent/>} />
                <Route path="/ventas" element={<VentasContent/>} />
                <Route path="/ventas/vender" element={<VenderContent/>} />
                <Route path="/salidas" element={<SalidasContent/>} />
            </Routes>
        </section>
    </div>

    )
}