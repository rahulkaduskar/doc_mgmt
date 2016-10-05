# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

user = User.new
user.name = "user1"
user.email = "user1@test.com"
user.password = "test12345"
user.password_confirmation = "test12345"
user.save!  

10.times do |n| 
  blog = Blog.new
  blog.title = "Title#{n}"
  blog.content = " Blog content #{n}"
  blog.user = user
  blog.save
end
