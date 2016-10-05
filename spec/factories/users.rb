FactoryGirl.define do
  factory :user do
    sequence(:name) { |n| "abc#{n}"}
    sequence(:email) { |n| "abc#{n}@example.com"}
    password "foobar"
    password_confirmation "foobar"
    after(:create) do |user, evaluator|
      create_list(:blog, 10, user: user)
    end
  end
end
