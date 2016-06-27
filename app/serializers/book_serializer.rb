class BookSerializer < ActiveModel::Serializer
  attributes :id, :title, :author, :genre, :num_pages
  has_one :user
  has_many :comments
end
