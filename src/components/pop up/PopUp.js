import classes from './PopUp.module.css'

function PopUp(props) {

    function handleSubmit(e) {
        e.preventDefault()
    }

    return (
        <>
            <div className={classes.popUpBackground} onClick={props.closePopUp}/>
            <div className={classes.popUpContent}>
                <div className={classes.closePopUp} onClick={props.closePopUp}>close</div>
                <h3 className={classes.formTitle} >Add new book</h3>
                <form onSubmit={handleSubmit}>
                    <label className={classes.label} htmlFor="title"><b>Title</b></label><br/>
                    <input className={classes.input} type="title" id="title" name="title" placeholder="Enter book title" size={30} required/>
                </form>
            </div>
        </>
    )

}

export default PopUp