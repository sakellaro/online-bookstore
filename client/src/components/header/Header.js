import classes from './Header.module.css'
import {Link} from 'react-router-dom'

function Header(props) {

    return (
        <div className={classes.header}>
            <div>
                <Link to="/">Bookstore</Link>
            </div>
            <div>
                <div>
                    <Link to="/" className={props.isActive ? classes.active : null}>Home</Link>
                </div>
                <div>
                    <button onClick={props.openPopUp}>Add new book</button>
                </div>
            </div>
        </div>
    )
}

export default Header