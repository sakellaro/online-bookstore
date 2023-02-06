import { useState, useEffect } from 'react'
import BookImage from './book image/BookImage';
import classes from './Home.module.css'

function Home(props) {

    // Activates home menu item
    useEffect(() => {
        props.setIsActive(true)
      });

    // Books by filter
    const [booksByFilter, setBooksByFilter] = useState(()=>{
        return []
    })

    // Search value
    const [searchValue, setSearchValue] = useState(()=>{
        return ""
    })

    // Default filter value
    const [filter, setFilter] = useState(()=>{
        return "none"
    })

    function searchingForBooks(filterValue, searchValue) {
        if (filterValue !== "none") {
            const booksByFilterArray = []
            props.books.forEach(book => {
                if (filterValue !== "categories" && filterValue !== "authors") {
                    if (book[filterValue].includes(searchValue)) booksByFilterArray.push(book)
                }
                else {
                    for (let element of book[filterValue]) {
                        if (element.includes(searchValue)) {
                            booksByFilterArray.push(book)
                            break // break because we want to add book only once
                        }
                    }
                }
            })
            setBooksByFilter(booksByFilterArray)
        }
    }

    // Function is called everytime filter is changed
    function filterChanged(e) {
        setFilter(e.target.value)
        searchingForBooks(e.target.value, searchValue)
    }

    // Function is called everytime search is changed
    function searchChanged(e) {
        setSearchValue(e.target.value)
        searchingForBooks(filter, e.target.value)
    }

    // Book image callback
    function bookImage(book, index) {

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
            <BookImage
                key = {index}
                id = {book._id}
                title = {book.title}
                image = {book.image}
                stars = {stars}
                height = {300}
                width = {200}
            />
        )
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
                            <option value="description">Description</option>
                            <option value="categories">Categories</option>
                            <option value="authors">Authors</option>
                            <option value="publisher">Publisher</option>
                            <option value="year">Year</option>
                            <option value="numberOfPages">Number of pages</option>
                            <option value="rating">Rating</option>
                            <option value="isbn10">ISBN-10</option>
                            <option value="isbn13">ISBN-13</option>
                        </select>
                    </nobr>
                </div>
                <div className={classes.inputAndWarning}>
                    <input className={classes.input} type="text" id="search" name="search" placeholder="Search ..." onChange={searchChanged}/>
                    {filter === "none" && searchValue && 
                        <div className={classes.warning}>You should add a filter!</div>
                    }
                </div>
            </div>
            <div className={classes.bookImages}>
                {!(props.serverResponse) && <div className={classes.failed}>Your internet connection failed or the server doesn't response!</div>}
                {props.serverResponse && filter === "none" &&
                    props.books.map(bookImage)
                }
                {props.serverResponse && filter !== "none" && booksByFilter.length !== 0 &&
                    booksByFilter.map(bookImage)
                }
                {props.serverResponse && filter !== "none" && booksByFilter.length === 0 &&
                    <div className={classes.failed}>There are no matching books!</div>
                }
            </div>
        </div>
    )

}

export default Home