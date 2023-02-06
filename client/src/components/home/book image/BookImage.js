import { useNavigate } from 'react-router-dom'
import classes from './BookImage.module.css'

function BookImage(props) {

    const navigate = useNavigate();

    function navigateToBook() {
        navigate(`/${props.id}`)
    }

    return (
        <div className={classes.imageContainer}>
            <div className={classes.blurImage} style={{width:`${props.width}px`, height:`${props.height}px`}} onClick={navigateToBook}>
                <div className={classes.blur}/>
                <img className={classes.imageIcon} width={20} src='./images/link.png' alt='link'/>
                <div className={classes.image} style={{backgroundImage: `url(${props.image})`}}/>
                <div className={classes.title}>{props.title}</div>
            </div>
            <div>
                {props.stars}
            </div>
        </div>
    )
}

export default BookImage