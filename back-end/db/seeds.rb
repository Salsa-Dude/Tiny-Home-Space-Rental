# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

User.destroy_all
Property.destroy_all
Lease.destroy_all
Review.destroy_all
Message.destroy_all


@Joseph = User.create!(first_name: "Joseph", last_name: "Arias", email: "arias.joseph.a@gmail.com", username: "jarias3")
@Liz = User.create!(first_name: "Liz", last_name: "Orellana", email: "liz@gmail.com", username: "liz3")

@Property1 = Property.create!(address: "123 test st", city: "bristow", state: "Virginia", description: "It is a very beautiful place", perks: "Alot of trees, ocean view, cool people around", notes: "no pets, no smoking", price: 80, user_id: @Joseph)

@Lease1 = Lease.create!(owner_id: @Joseph, renter_id: @Liz, property_id: @Property1 )

@Review1 = Review.create!(review_content: "I had a great time", rating: 5, reviewer_id: @Liz, reviewee_id: @Joseph)

Message1 = Message.create!(subject: "is this still available", content: "How much will it be for a week?", sender_id: @Liz, recipient_id: @Joseph)


