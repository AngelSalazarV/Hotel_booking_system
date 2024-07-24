import DataTableReservas from "../view/DataTablesHotel/DataTableReservas";
import Header from "./Header";
import Main from "./Main";

export default function ReservasContent() {
    return(
        <>
            <Header text2="Pages / " text="Reservas" icon>
            </Header>
            <Main>
              <DataTableReservas/>
            </Main>
        </>
    )
}