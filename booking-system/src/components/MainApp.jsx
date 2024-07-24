import { ClipboardList, Coffee, Folder, Circle, LayoutDashboard, Pencil, ShoppingCart, Users, Bolt } from "lucide-react"
import Sidebar, { SidebarItem } from './Sidebar'
import DashboardContent from './DashboardContent'
import VentasContent from './VentasContent'
import OrdenesContent from './OrdenesContent'
import CategoriasContent from './CategoriasContent'
import PlatosContent from './PlatosContent'
import UsuariosContent from './UsuariosContent'
import PisosContent from './PisosContent'
import AjustesContent from './AjustesContent'
import AyudaContent from './AyudaContent'
import MesasContent from './MesasContent'
import VentasProductosContent from "./VentasProductosContent"
import HabitacionesContent from "./HabitacionesContent"
import CategoriasContentHotel from "./CategoriasContentHotel"
import NivelesContent from "./NivelesContent"
import ReservasContent from "./ReservasContent"
import { Routes, useNavigate, Route,Navigate, useLocation } from 'react-router-dom'
import useTheme from '../hook/useTheme'
import { useContext } from 'react'
import { AuthContext } from "../context/AuthProvider"


export default function MainApp() {

    //Estado poner activo el elemento y cambiar el contenido
    const navigate = useNavigate()
    const location = useLocation()
    const { theme } = useTheme()
    const { userRole } = useContext(AuthContext)

    const isActive = (path) => location.pathname === path

    return(
    <div className={`flex  ${theme}`}>
        <Sidebar>
          {userRole === 'admin' && (
            <>
              <SidebarItem icon={<LayoutDashboard size={20}/>} text="Hotel">
              <SidebarItem icon={<ShoppingCart size={20}/>} text="Ventas" active={isActive("/ventas")} >
                <SidebarItem icon={<Circle size={20}/>} text="Productos" active={isActive("/ventas/productos")} onClick={() => navigate("/ventas/productos")}/>
              </SidebarItem>
              <SidebarItem icon={<Bolt size={20}/>} text="Configuración" active={isActive("/configuracion")}>
                <SidebarItem icon={<Circle size={20}/>} text="Habitaciones" active={isActive("/habitaciones")} onClick={() => navigate("configuracion/habitaciones")}/>
                <SidebarItem icon={<Circle size={20}/>} text="Categorias" active={isActive("/categorias")} onClick={() => navigate("/configuracion/categorias")}/>
                <SidebarItem icon={<Circle size={20}/>} text="Niveles" active={isActive("/niveles")} onClick={() => navigate("/configuracion/niveles")}/>
              </SidebarItem>
              <SidebarItem icon={<ClipboardList size={20}/>} text="Reservas" active={isActive("/reservas")} onClick={() => navigate("/reservas")}/>
              </SidebarItem>
              <SidebarItem icon={<LayoutDashboard size={20}/>} text="Restaurante">
                <SidebarItem icon={<LayoutDashboard size={20}/>} text="Dashboard" active={isActive("/dashboard")} onClick={() => navigate("/dashboard")}/>
                <SidebarItem icon={<ShoppingCart size={20}/>} text="Ventas" active={isActive("/ventas")} onClick={() => navigate("/ventas")}/>
                <SidebarItem icon={<ClipboardList size={20}/>} text="Ordenes" active={isActive("/ordenes")} onClick={() => navigate("/ordenes")}/>
                <SidebarItem icon={<Folder size={20}/>} text="Categorias" active={isActive("/categorias")} onClick={() => navigate("/categorias")}/>
                <SidebarItem icon={<Coffee size={20}/>} text="Platos" active={isActive("/platos")} onClick={() => navigate("/platos")}/>
                <SidebarItem icon={<Users size={20}/>} text="Usuarios" active={isActive("/usuarios")} onClick={() => navigate("/usuarios")}/>
                <SidebarItem icon={<Pencil size={20}/>} text="Pisos" active={isActive("/pisos")} onClick={() => navigate("/pisos")}/>
              </SidebarItem>
            </>
          )}
          {userRole === 'waiter' && (
            <>
              <SidebarItem icon={<ShoppingCart size={20}/>} text="Ventas" active={isActive("/ventas")} onClick={() => navigate("/ventas")}/>
              <SidebarItem icon={<ClipboardList size={20}/>} text="Ordenes" active={isActive("/ordenes")} onClick={() => navigate("/ordenes")}/>
              <SidebarItem icon={<Coffee size={20}/>} text="Platos" active={isActive("/platos")} onClick={() => navigate("/platos")}/>
            </>
          )}
          </Sidebar>
        <section className={`w-full min-h-screen bg-gray-50 dark:bg-negro-claro`}>
            <Routes>
                {userRole ==='admin' && (
                  <>
                    <Route path="/ventas" element={<VentasContent/>} />
                    <Route path="/ventas/productos" element={<VentasProductosContent/>} />
                    <Route path="/configuracion/habitaciones" element={<HabitacionesContent/>} />
                    <Route path="/configuracion/categorias" element={<CategoriasContentHotel/>} />
                    <Route path="/configuracion/niveles" element={<NivelesContent/>} />
                    <Route path="/reservas" element={<ReservasContent/>} />
                    <Route path="/" element={<Navigate to="/dashboard" />} />
                    <Route path="/dashboard" element={<DashboardContent/>} />
                    <Route path="/ventas" element={<VentasContent/>} />
                    <Route path="/ventas/:pisoName" element={<MesasContent />}/>
                    <Route path="/ordenes" element={<OrdenesContent/>} />
                    <Route path="/categorias" element={<CategoriasContent/>} />
                    <Route path="/platos" element={<PlatosContent/>} />
                    <Route path="/usuarios" element={<UsuariosContent/>} />
                  </>
                )}
                {userRole === 'waiter' && (
                    <>
                    <Route path="/" element={<Navigate to="/ventas" />} />
                    <Route path="/ventas" element={<VentasContent/>} />
                    <Route path="/ordenes" element={<OrdenesContent/>} />
                    <Route path="/platos" element={<PlatosContent/>} />
                    </>
                )}
                <Route path="/pisos" element={<PisosContent/>} />
                {userRole === 'admin' && (
                    <Route path="/ajustes" element={<AjustesContent/>} />
                )}
                <Route path="/ayuda" element={<AyudaContent/>} />
                <Route path="/mesas" element={<MesasContent/>} />
            </Routes>
        </section>
    </div>

    )
}