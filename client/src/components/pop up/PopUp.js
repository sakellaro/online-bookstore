import { useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import FileBase64 from 'react-file-base64';
import classes from './PopUp.module.css'

function PopUp(props) {

    // For navigation when the form is submitted
    const navigate = useNavigate();

    // state variables


    // title

    const [title, setTitle] = useState(()=>{
        return ""
      })
    
    const [invalidTitle, setInvalidTitle] = useState(()=>{
        return false
      })

    
    // description

    const [description, setDescription] = useState(()=>{
        return ""
      })
    
    const [invalidDescription, setInvalidDescription] = useState(()=>{
        return false
      })


    // image

    const [image, setImage] = useState(()=>{
        return ""
      })
    
    const [invalidImage, setInvalidImage] = useState(()=>{
        return false
      })


    // categories

    const [categories, setCategories] = useState(()=>{
        return [""]
      })

    const [sameCategories, setSameCategories] = useState(()=>{
        return false
    })

    const [emptyCategories, setEmptyCategories] = useState(()=>{
        return false
    })


    // authors

    const [authors, setAuthors] = useState(()=>{
        return [""]
      })

    const [invalidAuthor, setInvalidAuthors] = useState(()=>{
        return false
      })


    // publisher

    const [publisher, setPublisher] = useState(()=>{
        return ""
      })
    
    const [invalidPublisher, setInvalidPublisher] = useState(()=>{
        return false
      })


    // year

    const [year, setYear] = useState(()=>{
        return ""
      })
    
    const [invalidYear, setInvalidYear] = useState(()=>{
        return false
      })

    
    // numberOfPages

    const [numberOfPages, setNumberOfPages] = useState(()=>{
        return ""
      })

    const [invalidNumberOfPages, setInvalidNumberOfPages] = useState(()=>{
        return false
      })


    // rating 

    const [rating, setRating] = useState(()=>{
        return ""
      })

    const [invalidRating, setInvalidRating] = useState(()=>{
        return false
      })


    // ISBN

    const [isbn10, setIsbn10] = useState(()=>{
        return ""
      })
    
    const [invalidISBN10, setInvalidISBN10] = useState(()=>{
        return false
      })

    const [isbn13, setIsbn13] = useState(()=>{
        return ""
      })

    const [invalidISBN13, setInvalidISBN13] = useState(()=>{
        return false
      })

    // Failure to post data
    const [failedToSaveBook, setFailedToSaveBook] = useState(()=>{
        return false
      })



    // ref variables

    const titleInput = useRef()
    const descriptionInput = useRef()


    // functions

    function titleChanged(e) {
        setTitle(e.target.value)
        if (invalidTitle) setInvalidTitle(false)
    }

    function descriptionChanged(e) {
        setDescription(e.target.value)
        if (invalidDescription) setInvalidDescription(false)
    }


    function imageChanged({base64}) {
        setImage(base64)
        if (invalidImage) setInvalidImage(false)
    }
    
    // Categories

    function addNewCategory() {
        setEmptyCategories(false)
        setSameCategories(false)

        setCategories([...categories, ""])
    }

    function removeCategory(e) {
        setEmptyCategories(false)
        setSameCategories(false)

        let categoryIsGoingToBeRemoved = parseInt(e.target.id.split("binIcon")[1])
        setCategories([...categories])
        setCategories(cat=>{
            cat.splice(categoryIsGoingToBeRemoved,1)
            return cat
        })
    }

    function categoriesChanged(e) {
        setEmptyCategories(false)
        setSameCategories(false)

        setCategories([...categories])
        setCategories(cat=>{
            cat[parseInt(e.target.id.split("category")[1])] = e.target.value
            return cat
        })
    }


    // Authors

    function addNewAuthor() {
        setInvalidAuthors(false)

        setAuthors([...authors, ""])
    }

    function removeAuthor(e) {
        setInvalidAuthors(false)

        let authorIsGoingToBeRemoved = parseInt(e.target.id.split("binIconForAuthor")[1])
        setAuthors([...authors])
        setAuthors(auth=>{
            auth.splice(authorIsGoingToBeRemoved,1)
            return auth
        })
    }

    function authorsChanged(e) {
        setInvalidAuthors(false)

        setAuthors([...authors])
        setAuthors(auth=>{
            auth[parseInt(e.target.id.split("author")[1])] = e.target.value
            return auth
        })
    }


    function publisherChanged(e) {
        setPublisher(e.target.value)
        if (invalidPublisher) setInvalidPublisher(false)
    }

    function yearChanged(e) {
        setYear(e.target.value)
        if (invalidYear) setInvalidYear(false)
    }

    function numberOfPagesChanged(e) {
        setNumberOfPages(e.target.value)
        if (invalidNumberOfPages) setInvalidNumberOfPages(false)
    }

    function ratingChanged(e) {
        setRating(e.target.value)
        if (invalidRating) setInvalidRating(false)
    }

    function isbn10Changed(e) {
        setIsbn10(e.target.value)
        if (invalidISBN10) setInvalidISBN10(false)
    }

    function isbn13Changed(e) {
        setIsbn13(e.target.value)
        if (invalidISBN13) setInvalidISBN13(false)
    }


    // Form Submission

    function handleSubmit(e) {
        e.preventDefault()

        // VALIDATION
        
        /* For the book title are allowed all lowercase and uppercase letters, numbers, space, comma apostrophe (as it was in titles of the book.json file) as well as all special characters mentioned in the project notes (@”#&*!).
           Also the min characters should be 10 */
        const validTitle = new RegExp(/^[a-zA-Z0-9 ,\'@”#&*!]+$/g)
        if (!validTitle.test(title) || title.length < 10) {
            setInvalidTitle(true)
            titleInput.current.focus()
            return
        }

        /* For the book description is allowed every character after an uppercase letter. 
           Also a new line is allowed after an uppercase letter followed by any character. */
        const validDescription = new RegExp(/^[A-Z].+/g)
        if (!validDescription.test(description)) {
            setInvalidDescription(true)
            descriptionInput.current.focus()
            return
        }

        // For the image the field is required
        if (!image) {
            setInvalidImage(true)
            descriptionInput.current.focus()
            return
        }

        /* For the categories, the "open" fields are required so they can't be empty 
           and it is not allowed to be the same. */
        const categoriesValuesArray = []
        for (let cat of categories) {
            if (cat.length === 0) {
                setEmptyCategories(true)
                return
            }
            else if (categoriesValuesArray.includes(cat)) {
                setSameCategories(true)
                return
            }
            else categoriesValuesArray.push(cat)
        }

        /* For the authors, the "open" fields are required so they can't be empty, 
           but it is allowed to be the same. */
        for (let auth of authors) {
            if (auth.length === 0) {
                setInvalidAuthors(true)
                return
            }
        }

        // For the publisher the min characters should be 5
        if (publisher.length < 5) {
            setInvalidPublisher(true)
            return
        }

        // For the year are allowed 4 digits
        const validYear = new RegExp(/^\d{4}$/g)
        if (!validYear.test(year)) {
            setInvalidYear(true)
            return
        }

        // For the number of pages the field is required and the values should be integers from 1-9999
        if (numberOfPages.length === 0 || parseInt(numberOfPages) < 1 || parseInt(numberOfPages) > 9999 || parseInt(numberOfPages) !== parseFloat(numberOfPages)) {
            setInvalidNumberOfPages(true)
            return
        }

        // For the rating the field is required and the values should be from 0-5 with 0.5 step
        if (rating.length === 0 || parseFloat(rating) < 0 || (parseFloat(rating) > 5) || (parseInt(rating) !== parseFloat(rating) && (parseInt(rating[2]) !== 5 || rating.length !==3 )) ) {
            setInvalidRating(true)
            return
        }

        // For the ISBN inputs are allowed 10 and 13 digits correspondingly
        const validIsbn10 = new RegExp(/^\d{10}$/g)
        if (!validIsbn10.test(isbn10)) {
            setInvalidISBN10(true)
            return
        }
        const validIsbn13 = new RegExp(/^\d{13}$/g)
        if (!validIsbn13.test(isbn13)) {
            setInvalidISBN13(true)
            return
        }


        // POST data

        let newBook

        newBook = {
            title: title,
            description: description,
            image: image,
            categories: categories,
            authors: authors,
            publisher: publisher,
            year: year,
            numberOfPages: numberOfPages,
            rating: rating,
            isbn10: isbn10,
            isbn13: isbn13
          }


        axios.post("http://localhost:3001/books", newBook)
          .then(res => {

            props.setSubmitEvent(prev=>prev+1)
            props.closePopUp()

            // Redirect to home page
            if (window.location.pathname !== '/') {
                navigate('/')
            }
          })
          .catch(error => {
            setFailedToSaveBook(true)
            return
          });

    }

    return (
        <>
            <div className={classes.popUpBackground} onClick={props.closePopUp}/>
            <div className={classes.popUpContent}>
                <div className={classes.closePopUp}><span onClick={props.closePopUp}>close</span></div>
                <h3 className={classes.formTitle} >Add new book</h3>
                <form onSubmit={handleSubmit} noValidate>
                    <div>
                        <label className={classes.label} htmlFor="title"><b>Title *</b></label><br/>
                        <input ref={titleInput} className={classes.input} type="text" id="title" name="title" placeholder="Enter book title" maxLength={120} onChange={titleChanged}/>
                        {invalidTitle && 
                            <div className={classes.invalidInput}>The book title is invalid!</div>
                        }
                    </div>
                    <div className={classes.labelAndInputDiv}>
                        <label className={classes.label} htmlFor="description"><b>Description *</b></label><br/>
                        <textarea ref={descriptionInput} className={classes.input} id="description" name="description" placeholder="Enter book description" rows={6} maxLength={512} onChange={descriptionChanged}/>
                        {invalidDescription && 
                            <div className={classes.invalidInput}>The book description is invalid!</div>
                        }
                    </div>
                    <div className={`${classes.labelAndInputDiv} ${classes.importImageInput}`}>
                        <label className={classes.label} htmlFor="image"><b>Import Book Image *</b></label><br/>
                        <FileBase64 multiple={ false } onDone={imageChanged} />
                        {invalidImage && 
                            <div className={classes.invalidInput}>The book image is required!</div>
                        }
                    </div>
                    <div className={classes.labelAndInputDiv}>
                        <label className={classes.label} htmlFor="category0"><b>Categories (4 max) *</b></label><br/>
                        { categories.map((category, index)=>{
                            return (
                                <span key={index} className={`${classes.categoryInput} `+classes[`categoryInput${index}`]}>
                                    <nobr>
                                        <input className={`${classes.input} ${classes.categoryInput}`} type="text" id={`category${index}`} name={`category${index}`} placeholder="Enter category name" maxLength={30} onChange={categoriesChanged} value={categories[index]}/>
                                        { (categories.length > 1) &&
                                            <i className={`fa fa-trash-o ${classes.binIcon}`} id={`binIcon${index}`} onClick={removeCategory}/>
                                        }
                                    </nobr>
                                </span>
                            )
                        })}
                        { (categories.length < 4) &&
                        <div className={classes.addCategory}>
                            <i onClick={addNewCategory} className={`fa fa-plus ${classes.plusIcon}`}/>
                            <span onClick={addNewCategory} className={classes.hint}>Add category</span>
                        </div> }
                        { emptyCategories && 
                            <div className={classes.invalidInput}>The category fields are required!</div>
                        }
                        { sameCategories && 
                            <div className={classes.invalidInput}>The categories must not be the same!</div>
                        }
                    </div>
                    <div className={classes.labelAndInputDiv}>
                        <label className={classes.label} htmlFor="author0"><b>Authors (3 max) *</b></label><br/>
                        {authors.map((author, index)=>{
                            return (
                                <span key={index} className={`${classes.categoryInput} `+classes[`categoryInput${index}`]}>
                                    <nobr>
                                        <input className={`${classes.input} ${classes.categoryInput}`} type="text" id={`author${index}`} name={`author${index}`} placeholder="Enter author name" maxLength={30} onChange={authorsChanged} value={authors[index]}/>
                                        { (authors.length > 1) &&
                                            <i className={`fa fa-trash-o ${classes.binIcon}`} id={`binIconForAuthor${index}`} onClick={removeAuthor}/>
                                        }
                                    </nobr>
                                </span>
                            )
                        })}
                        { (authors.length < 3) &&
                        <div className={classes.addCategory}>
                            <i onClick={addNewAuthor} className={`fa fa-plus ${classes.plusIcon}`}/>
                            <span onClick={addNewAuthor} className={classes.hint}>Add author</span>
                        </div> }
                        {invalidAuthor && 
                            <div className={classes.invalidInput}>The author fields are required!</div>
                        }
                    </div>
                    <div className={`${classes.pairDiv} ${classes.labelAndInputDiv}`}>
                        <div className={classes.publisher}>
                            <label className={classes.label} htmlFor="publisher"><b>Publisher *</b></label><br/>
                            <input className={`${classes.input} ${classes.pairInput}`} type="text" id="publisher" name="publisher" placeholder="Enter publisher" maxLength={60} onChange={publisherChanged}/>
                            {invalidPublisher && 
                                <div className={classes.invalidInput}>The min characters of the field must be 5!</div>
                            }
                        </div>
                        <div className={classes.year}>
                            <label className={classes.label} htmlFor="year"><b>Year *</b></label><br/>
                            <input className={`${classes.input} ${classes.pairInput}`} type="text" id="year" name="year" maxLength={4} placeholder="Enter year of publication" onChange={yearChanged}/>
                            {invalidYear && 
                                <div className={classes.invalidInput}>The year must have 4 digits!</div>
                            }
                        </div>
                    </div>
                    <div className={`${classes.pairDiv} ${classes.labelAndInputDiv}`}>
                        <div className={classes.numberOfPages}>
                            <label className={classes.label} htmlFor="numberOfPages"><b>Number of pages *</b></label><br/>
                            <input className={`${classes.input} ${classes.pairInput}`} type="number" id="numberOfPages" name="numberOfPages" placeholder="Enter number of pages" min={1} max={9999} onChange={numberOfPagesChanged}/>
                            {invalidNumberOfPages && 
                                <div className={classes.invalidInput}>The field is invalid!</div>
                            }
                        </div>
                        <div className={classes.rating}>
                            <label className={classes.label} htmlFor="rating"><b>Rating *</b></label><br/>
                            <input className={`${classes.input} ${classes.pairInput}`} type="number" id="rating" name="rating" placeholder="Enter rating" min={0} max={5} step={0.5} onChange={ratingChanged}/>
                            {invalidRating && 
                                <div className={classes.invalidInput}>The field is invalid!</div>
                            }
                        </div>
                    </div>
                    <div className={`${classes.pairDiv} ${classes.labelAndInputDiv}`}>
                        <div className={classes.isbn10}>
                            <label className={classes.label} htmlFor="isbn10"><b>ISBN-10 *</b></label><br/>
                            <input className={`${classes.input} ${classes.pairInput}`} type="text" id="isbn10" name="isbn10" maxLength={10} placeholder="Enter ISBN-10 number" onChange={isbn10Changed}/>
                            {invalidISBN10 && 
                                <div className={classes.invalidInput}>The ISBN-10 must have 10 digits!</div>
                            }
                        </div>
                        <div className={classes.isbn13}>
                            <label className={classes.label} htmlFor="isbn13"><b>ISBN-13 *</b></label><br/>
                            <input className={`${classes.input} ${classes.pairInput}`} type="text" id="isbn13" name="isbn13" maxLength={13} placeholder="Enter ISBN-13 number" onChange={isbn13Changed}/>
                            {invalidISBN13 && 
                                <div className={classes.invalidInput}>The ISBN-13 must have 13 digits!</div>
                            }
                        </div>
                    </div>
                    <div className={classes.submission}>
                        <button type="submit" className={classes.submitButton}>Save</button>
                        { failedToSaveBook && 
                            <div className={classes.invalidInput}>Failed to save book. Please check your internet connection and try again!</div>
                        }
                        <div className={classes.hint}>The character (*) indicates that the field is required.</div>
                    </div>
                </form>
            </div>
        </>
    )

}

export default PopUp