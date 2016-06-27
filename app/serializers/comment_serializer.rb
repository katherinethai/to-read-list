class CommentSerializer < ActiveModel::Serializer
  attributes :id, :title, :text
  has_one :book
  has_one :user
end
