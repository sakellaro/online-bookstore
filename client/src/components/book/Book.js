import { useEffect } from 'react'
import { useParams } from "react-router-dom"
import classes from './Book.module.css' 

function Book(props) {

    // Disable home menu item
    useEffect(() => {
        props.setIsActive(false)
      });

    const params = useParams()
    const book = props.books.find(book => book._id === params.id)


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
        )
    }

}

export default Book