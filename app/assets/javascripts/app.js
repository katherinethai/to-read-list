$(function () {
  $('#bookForm').on('keydown', function(e) {
    if (e.which == 13) {
      e.preventDefault();
      var values = $(this).serialize();
      var posting = $.post('/books', values);
      posting.done(function (data) {
        document.getElementById("bookForm").reset();
        var book = data;
        $('.books').append("<li><h2>" + book.title + "</h2></li>");
      });
    }
  });
  
  $('submit').click(function(e) {
    e.preventDefault();
    var id = this.id
    var values = $(this).serialize();
    var posting = $.post('/books/' + id, values);
    posting.done(function (data) {
      var book = data;
      $('#bookTitle').text(book.title);
      $('#bookAuthor').text(book.author);
      $('#bookGenre').text(book.genre);
      $('#bookNumPages').prepend(book.num_pages);
    });
  });
});
