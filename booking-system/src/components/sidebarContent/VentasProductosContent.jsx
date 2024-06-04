import DefaultDataProductos from "../../view/DataTableProductos";
import Header from "./Header";
import Main from "./Main";

export default function VentasProductosContent() {
    return(
        <>
            <Header text2="Pages / " text="Productos" icon>
            </Header>
            <Main>
              <DefaultDataProductos/>
            </Main>
        </>
    )
}