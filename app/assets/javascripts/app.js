$(function () {

  function Book (id, title, author, genre, numPages, read) {
    this.id = id
    this.title = title
    this.author = author
    this.genre = genre
    this.numPages = numPages
    this.read = read
  }

  Book.prototype.markAsRead = function () {
    this.read = true;
  }

  Book.prototype.markAsUnread = function () {
    this.read = false;
  }

  Book.prototype.save = function (id) {
    var read = this.read;
    var title = this.title;
    var author = this.author;
    var genre = this.genre;
    var numPages = this.num_pages;
    var url = '/books/' + id + '/edit'; 
    var data = {
        book: {
          id: id,
          title: title,
          author: author,
          genre: genre,
          num_pages: numPages,
          read: read
        }
      }
    $.ajax({
      type: 'POST',
      data: data,
      url: url,
      success: function (data) {
        alert(data.title + ' was successfully saved!');
      }
    });
  }

  $('#bookForm').on('keydown', function(e) {
    if (e.which == 13) {
      e.preventDefault();
      var url = this.action
      var dataString = $(this).serialize();
      $.ajax({
        type: 'POST',
        data: dataString,
        url: url,
        success: function (data) {
        document.getElementById("bookForm").reset();
        var book = data;
        $('.books').append("<li><h3 class='book' id='book_" + book.id + "'>" + book.title + "</h3></li>");
        }
      });
    }
  });

  var title = $('.book');

  title.dblclick(function(e) {
    var elementId = e['toElement'].id;
    var editForm = elementId;
    $('.' + elementId).toggleClass('expanded');
  });

  var finish = $('h3');

  finish.click(function(e) {
    var elementId = e['toElement'].id;
    var bookId = elementId;
    var url = '/books/' + elementId;
    $.ajax({
      type: 'GET',
      url: url,
      success: function (data) { 
        var id = data.id;       
        var title = data.title;
        var author = data.author;
        var genre = data.genre;
        var numPages = data.num_pages;
        var read = data.read;
        book = new Book(id, title, author, genre, numPages, read);
        if (read) {
          book.markAsUnread();
          book.save(book.id);
          debugger;
          $('.' + book.id).removeClass('read');
        } else {
          book.markAsRead();
          book.save(book.id);
          $('.' + book.id).addClass('read');
        }
      }
    });
  });
  
  $('.save').click(function(e) {
    var elementId = e['toElement'].id;
    var url = '/books/' + elementId;
    $.ajax({
      type: 'GET',
      url: url,
      success: function (data) { 
        var id = data.id;       
        var title = data.title;
        var author = data.author;
        var genre = data.genre;
        var numPages = data.num_pages;
        var read = data.read;
        var book = new Book(id, title, author, genre, numPages, read);
        debugger;
        book.save(book.id);
        $('#book_' + data.id).text(book.title);
      }
    });
  });
});
