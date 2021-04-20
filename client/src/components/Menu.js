import react from 'react';
import { Link } from 'react-router-dom'

export default function Menu() {

    return (

        <div className="menu" >

            <div className="logo">
                <Link to="/">  <h2>TP FINAL UTN</h2> </Link>
            </div>

            <ul>
                <Link to="/persona"><li> Persona</li> </Link>
                <Link to="/libro">  <li> Libro</li></Link>
                <Link to="/generos">  <li> Generos</li></Link>
            </ul>

        </div>
    )
}