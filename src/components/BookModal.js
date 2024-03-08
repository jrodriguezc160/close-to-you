const BookModal = () => {



  return (
    <div className="modal-screen">
      <div className="modal">
        <div className="search-bar">
          <input type="text" name="book-search" id="book-search" placeholder='Search for your favourite books...' />
        </div>

        <div className="books-list"></div>

        <div className="fav-books">
          <div>
            <img src="https://chronicle.durhamcollege.ca/wp-content/uploads/2022/10/dune-novel-cover.jpeg" />
          </div>

          <div>
            <img src="https://media.s-bol.com/R03O4K4200Zw/Rp6k3z/779x1200.jpg" />
          </div>

          <div>
            <img src="https://i.etsystatic.com/9837436/r/il/56f900/1197017746/il_570xN.1197017746_jbuw.jpg" />
          </div>
        </div>
      </div>
    </div>
  )
}

export default BookModal;