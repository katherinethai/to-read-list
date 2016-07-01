require 'pry'
require 'json'
class BooksController < ApplicationController
  def index
    @books = Book.all
    @book = Book.new
  end

  def new
    @book = Book.new
  end

  def create
    @book = Book.create(book_params)
    render json: @book, status: 201
  end

  def edit
    set_book
  end

  def update
    set_book
    @book.update(book_params)
    render json: @book
  end

  def show
    set_book
    render json: @book
  end

  def destroy
    set_book
    @book.destroy
    render json: @book.id
  end

  private

  def book_params
    params.require(:book).permit(:title, :author, :genre, :num_pages, :read, :id)
  end

  def set_book
    @book = Book.find(params[:id])
  end
end