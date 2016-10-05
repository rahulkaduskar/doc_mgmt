module Features
  module SessionHelpers
    def sign_up_with(email, password)
      visit root_url
      click_link "Sign in"
      fill_in 'email', with: email
      fill_in 'password', with: password
      click_button 'Sign in'
    end
  end
end