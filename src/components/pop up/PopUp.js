import { useState } from 'react'
import classes from './PopUp.module.css'

function PopUp(props) {

    const [title, setTitle] = useState(()=>{
        return ""
      })

    const [description, setDescription] = useState(()=>{
        return ""
      })

    const [categories, setCategories] = useState(()=>{
        return [""]
      })

    function titleChanged(e) {
        setTitle(e.target.value)
    }

    function descriptionChanged(e) {
        setDescription(e.target.value)
    }

    function addNewCategory() {
        setCategories([...categories, ""])
    }

    function removeCategory(e) {
        let categoryIsGoingToBeRemoved = parseInt(e.target.id.split("binIcon")[1])
        setCategories([...categories])
        setCategories(cat=>{
            cat.splice(categoryIsGoingToBeRemoved,1)
            return cat
        })
    }

    function categoriesChanged(e) {
        setCategories([...categories])
        setCategories(cat=>{
            console.log(parseInt(e.target.id.split("category")[1]))
            cat[parseInt(e.target.id.split("category")[1])] = e.target.value
            return cat
        })
    }

    function handleSubmit(e) {
        e.preventDefault()
        
        /* For the book title are allowed all lowercase and uppercase letters, numbers, space, apostrophe (as it was in titles of the book.json file) as well as all special characters mentioned in the project notes (@”#&*!) */
        const validTitle = new RegExp('[a-zA-Z0-9 \'@”#&*!]+')
        if (validTitle.exec(title)[0] === title) console.log(title)
        else console.log("Non-valid input")

        /* For the book description is allowed every character after an uppercase letter */
        const validDescription = new RegExp('[A-Z].+')
        if (validDescription.exec(description).index === 0) console.log(description)
        else console.log("Non-valid input")

    }

    return (
        <>
            <div className={classes.popUpBackground} onClick={props.closePopUp}/>
            <div className={classes.popUpContent}>
                <div className={classes.closePopUp}><span onClick={props.closePopUp}>close</span></div>
                <h3 className={classes.formTitle} >Add new book</h3>
                <form onSubmit={handleSubmit}>
                    <label className={classes.label} htmlFor="title"><b>Title *</b></label><br/>
                    <input className={classes.input} type="text" id="title" name="title" placeholder="Enter book title" minLength={10} maxLength={120} onChange={titleChanged} required/>
                    <br/><br/>
                    <label className={classes.label} htmlFor="description"><b>Description *</b></label><br/>
                    <textarea className={classes.input} id="description" name="description" placeholder="Enter book description" rows={6} maxLength={512} onChange={descriptionChanged} required/>
                    <br/><br/>
                    <label className={classes.label} htmlFor="Categories"><b>Categories *</b></label><br/>
                    {categories.map((category, index)=>{
                        return (
                            <span key={index} className={`${classes.categoryInput} `+classes[`categoryInput${index}`]}>
                                <nobr>
                                    <input className={`${classes.input} ${classes.categoryInput}`} type="text" id={`category${index}`} name={`category${index}`} placeholder="Enter category name" maxLength={20} onChange={categoriesChanged} value={categories[index]} required/>
                                    <i className={`fa fa-trash-o ${classes.binIcon}`} id={`binIcon${index}`} onClick={removeCategory}/>
                                </nobr>
                            </span>
                        )
                    })}
                    { (categories.length < 4) &&
                    <div className={classes.addCategory}>
                        <img onClick={addNewCategory} className={classes.addCategoryImg} src="/images/add.png" alt="Add category" width="14" height="14"/>
                        <span onClick={addNewCategory} className={classes.hint}>Add category</span>
                    </div> }
                    <br/><br/><br/>
                    <button type="submit" className={classes.submitButton}>Submit</button><br/>
                    <span className={classes.hint}>The character (*) indicates that the field is required.</span>
                </form>
            </div>
        </>
    )

}

export default PopUp