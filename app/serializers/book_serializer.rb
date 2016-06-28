class BookSerializer < ActiveModel::Serializer
  attributes :id, :title, :author, :genre, :num_pages, :read
  has_one :user
end
