import DataTableNiveles from "../../view/DataTableNiveles";
import Header from "./Header";
import Main from "./Main";

export default function NivelesContent() {
    return(
        <>
            <Header text2="Pages / " text="Niveles" icon>
            </Header>
            <Main>
                <DataTableNiveles/>
            </Main>
        </>
    )
}