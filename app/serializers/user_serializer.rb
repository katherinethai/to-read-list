class UserSerializer < ActiveModel::Serializer
  attributes :id, :name
  has_many :books
  has_many :comments
end
