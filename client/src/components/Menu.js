import React from 'react'
import { Link } from "react-router-dom";



function Menu() {
    return (
        <>
            <div className="menu_bar">

                <div className="menu_contenedor">
                    <div className="menu_titulo">
                        <h2>UTN TP FINAL</h2>
                    </div>

                    <div >
                        <ul className="menu_links">
                            <Link to="/persona"><li> Persona</li>  </Link>
                            <Link to="/libro"> <li>Libro</li> </Link>
                            <Link to="/categoria"> <li>Categoria</li> </Link>                            
                        </ul>

                    </div>

                </div>
            </div>


        </>
    )
}

export default Menu
