import { useState, useEffect } from 'react'
import classes from './Home.module.css'

function Home(props) {

    // Activates home menu item
    useEffect(() => {
        props.setIsActive(true)
      }, []);

    // Check if the server response is ok
    const [serverResponse, setServerResponse] = useState(()=>{
        return true
    })

    // Books
    const [books, setBooks] = useState(()=>{
        return []
    })

    // Fetch data
    useEffect( () => {
        async function fetchData() {
            const response = await fetch("/books")
            if (response.ok) {
                setServerResponse(true)
                const data = await response.json()
                console.log(books, data)

                // This condition is because we want the useEffect hook to be triggered
                // only when the database is updated
                if (books.length !== data.length) setBooks(data)
            }
            else setServerResponse(false)
        }
          fetchData();
      }, [books, props.submitEvent] )

    // Default filter value
    const [filter, setFilter] = useState(()=>{
        return "none"
    })

    function filterChanged(e) {

    }

    function searchChanged(e) {

    }

    return (
        <div className={classes.home}>
            <div className={classes.searchTitle}>
                <b>Search to find your new book</b>
            </div>
            <div className={classes.searchDescription}>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </div>
            <div className={classes.filterAndSearch}>
                <div>
                    <nobr>
                        <label className={classes.label} htmlFor="filter"><b>Filter:</b></label>
                        <select className={classes.select} name="filter" id="filter" defaultValue={filter} onChange={filterChanged}>
                            <option value="none">None</option>
                            <option value="title">Title</option>
                            <option value="descrition">Descrition</option>
                            <option value="categories">Categories</option>
                            <option value="author">Author</option>
                            <option value="publisher">Publisher</option>
                            <option value="year">Year</option>
                            <option value="numberOfPages">Number of pages</option>
                            <option value="rating">Rating</option>
                            <option value="isbn10">ISBN-10</option>
                            <option value="isbn13">ISBN-13</option>
                        </select>
                    </nobr>
                </div>
                <input className={classes.input} type="text" id="search" name="search" placeholder="Search ..." onChange={searchChanged}/>
            </div>
            <div className={classes.images}>
                {!serverResponse && <div>Your internet connection failed or the server doesn't response!</div>}
                {serverResponse && 
                books.map((book, index)=>{
                    const stars = []
                    if (parseInt(book.rating) !== parseFloat(book.rating)) {
                        for (let i=0; i<parseInt(book.rating); i++){
                            stars.push(<i key={i} className={`${classes.star} fa fa-star`}/>)
                        }
                        stars.push(<i key={9} className={`${classes.star} fa fa-star-half-full`}/>)
                    }
                    else {
                        for (let i=0; i<parseInt(book.rating); i++){
                            stars.push(<i key={i} className={`${classes.star} fa fa-star`}/>)
                        }
                    }
                    return (
                        <div key={index} className={classes.imageContainer}>
                            <div className={classes.blurImage}>
                                <div className={classes.blur}/>
                                <img className={classes.imageIcon} width={30} src='./images/arrow.png'/>
                                <div className={classes.image} style={{backgroundImage: `url(${book.image})`}}/>
                                <div className={classes.title}>{book.title}</div>
                            </div>
                            <div>
                                {stars}
                            </div>
                        </div>
                    )
                })
                }
            </div>
        </div>
    )

}

export default Home