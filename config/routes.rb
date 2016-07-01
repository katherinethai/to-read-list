Rails.application.routes.draw do
  devise_for :users
  root 'welcome#index'

  post '/books/:id/edit',to: 'books#update'

  resources :books
  resources :comments
end
