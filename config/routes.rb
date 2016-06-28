Rails.application.routes.draw do
  root 'books#index'

  post '/books/:id/edit',to: 'books#update'

  resources :books
  resources :comments
end
