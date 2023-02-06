import { useEffect } from 'react'
import { useParams } from "react-router-dom"
import Carousel from 'react-multi-carousel';
import BookImage from '../home/book image/BookImage';
import 'react-multi-carousel/lib/styles.css';
import classes from './Book.module.css' 

function Book(props) {

    // Disable home menu item
    useEffect(() => {
        props.setIsActive(false)
      });

    const params = useParams()
    const book = props.books.find(book => book._id === params.id)

    // React carousel
    const responsive = {
        desktop: {
          breakpoint: { max: 3000, min: 1024 },
          items: 4,
          slidesToSlide: 1
        },
        tablet: {
          breakpoint: { max: 1024, min: 464 },
          items: 2,
          slidesToSlide: 1
        },
        mobile: {
          breakpoint: { max: 464, min: 0 },
          items: 1,
          slidesToSlide: 1
        }
      };


    if (book) {
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
            <div className={classes.book}>
                <div className={classes.firstRow}>
                    <div className={classes.leftColumn}>
                        <img className={classes.bookImage} src={book.image} alt='Book'/>
                        <div className={classes.authors}>
                            <img className={classes.profileImage} width={45} src='./images/profile.png' alt='Profile'/>
                            {book.authors.map((author,index)=>{
                                return (
                                    <div key={index} className={classes.author}>
                                        {index === book.authors.length-1 && 
                                            <>{author}</>
                                        }
                                        {index !== book.authors.length-1 && 
                                            <>{author}, </>
                                        }
                                    </div>
                                )
                            })
                            }
                        </div>
                        <div className={classes.stars}>
                            {stars}
                        </div>
                    </div>
                    <div className={classes.rightColumn}>
                        <div className={classes.title}>{book.title}</div><br/>
                        <div className={classes.text}>{book.description}</div><br/>
                        <div>
                            <button className={classes.smallButton}>Favorite</button><button className={classes.smallButton}>Share</button>
                        </div><br/>
                        <div className={classes.categories}>
                            <div className={classes.smallTitle}>Categories:&nbsp;</div>
                            {book.categories.map((cat,index)=>{
                                return(
                                    <div className={classes.categories} key={index}>
                                        {index === book.categories.length-1 && 
                                            <span className={classes.text}>#{cat}</span>
                                        }
                                        {index !== book.categories.length-1 && 
                                            <span className={classes.text}>#{cat}, </span>
                                        }
                                    </div>
                                )
                            })}
                        </div>
                        <div>
                            <span className={classes.smallTitle}>Year:</span> <span className={classes.text}>{book.year}</span>
                        </div>
                        <div>
                        <span className={classes.smallTitle}>Number of Pages:</span> <span className={classes.text}>{book.numberOfPages}</span>
                        </div><br/>
                        <div>
                        <span className={classes.smallTitle}>Publisher:</span> <span className={classes.text}>{book.publisher}</span>
                        </div><br/>
                        <div>
                        <span className={classes.smallTitle}>ISBN-10:</span> <span className={classes.text}>{book.isbn10}</span>
                        </div>
                        <div>
                        <span className={classes.smallTitle}>ISBN-13:</span> <span className={classes.text}>{book.isbn13}</span>
                        </div><br/>
                        <button className={classes.button}>BUY</button>
                    </div>
                </div>
                <div className={classes.secondRow}>
                    <div className={classes.title} style={{textAlign:'center', marginBottom:'50px'}}>
                        Other books you may like
                    </div>
                    <Carousel
                        swipeable={false}
                        draggable={false}
                        showDots={true}
                        arrows={false}
                        responsive={responsive}
                        autoPlay={true}
                        ssr={true}
                        infinite={true}
                        autoPlaySpeed={3000}
                        keyBoardControl={true}
                        customTransition="all .5"
                        transitionDuration={500}>
                        {props.books.map((element, index)=>{
                            if (element._id !== book._id) {
                                const bookStars = []
                                if (parseInt(element.rating) !== parseFloat(element.rating)) {
                                    for (let i=0; i<parseInt(element.rating); i++){
                                        bookStars.push(<i key={i} className={`${classes.bookStar} fa fa-star`}/>)
                                    }
                                    bookStars.push(<i key={9} className={`${classes.bookStar} fa fa-star-half-full`}/>)
                                }
                                else {
                                    for (let i=0; i<parseInt(element.rating); i++){
                                        bookStars.push(<i key={i} className={`${classes.bookStar} fa fa-star`}/>)
                                    }
                                }
                                return(
                                    <BookImage
                                        key = {index}
                                        id = {element._id}
                                        title = {element.title}
                                        image = {element.image}
                                        stars = {bookStars}
                                        height = {200}
                                        width = {133.3}
                                    />
                                )
                            }
                            else return null
                        })}
                    </Carousel>
                </div>
            </div>
        )
    }

}

export default Book