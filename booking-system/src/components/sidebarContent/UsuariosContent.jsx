import Header from "./Header";
import Main from "./Main";
import DefaultDataUsuarios from "../../view/DataTableUsuarios";

export default function UsuariosContent() {
    return(
        <>
            <Header text2="Pages / " text="Usuarios" icon>
            </Header>
            <Main>
                <DefaultDataUsuarios/>
            </Main>
        </>
    )
}