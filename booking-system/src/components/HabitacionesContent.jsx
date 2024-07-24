import Header from "./Header";
import Main from "./Main";
import DataTableHabitaciones from "../view/DataTablesHotel/DataTableHabitaciones";

export default function HabitacionesContent() {
    return(
        <>
            <Header text2="Pages / " text="Habitaciones" icon>
            </Header>
            <Main>
                <DataTableHabitaciones/>
            </Main>
        </>
    )
}