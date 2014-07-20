QuizzyNet::Application.routes.draw do
  resources :questions

  resources :quizzes

  # You can have the root of your site routed with "root"
  # root 'welcome#index'

  # Example resource route with sub-resources:
  resources :quizzes do
    resources :questions
  end

  resources :scores
  root "home#index"
end
