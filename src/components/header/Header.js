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
                    <Link to="/">Home</Link>
                </div>
                <div>
                    <button>
                        Add new book
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Header