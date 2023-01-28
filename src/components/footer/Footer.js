import classes from './Footer.module.css'
import {Link} from 'react-router-dom'

function Footer() {

    return (
        <div className={classes.footer}>
            <div>
                <div>
                    <span>© 2023 All Rights Reserved </span>
                </div>
                <div>
                    <Link to="#">Terms of Use</Link>
                </div>
                <div>
                    <Link to="#">Privacy Notice</Link>
                </div>
            </div>
        </div>
    )
}

export default Footer