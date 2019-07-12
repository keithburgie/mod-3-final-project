# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

User.destroy_all
Message.destroy_all
Conversation.destroy_all

user1 = User.create!(username: "keith", email: "keith@email.com", password: "password")
user2 = User.create!(username: "meghan", email: "meghan@email.com", password: "password")
user3 = User.create!(username: "natany", email: "natany@email.com", password: "password")
user4 = User.create!(username: "rob", email: "rob@email.com", password: "password")
user5 = User.create!(username: "dan", email: "dan@email.com", password: "password")
user6 = User.create!(username: "sean", email: "sean@email.com", password: "password")
user7 = User.create!(username: "ethan", email: "ethan@email.com", password: "password")
user8 = User.create!(username: "gian", email: "gian@email.com", password: "password")

conversation1 = Conversation.create!(name: "dc-513-mod-3")
# conversation2 = Conversation.create!(name: "dc-513-mod-5")

message1 = Message.create!(content: "Hey Meghan how are things?", user_id: user1.id, conversation_id: conversation1.id)
message2 = Message.create!(content: "Everything is fantastic and wonderful.", user_id: user2.id, conversation_id: conversation1.id)
message3 = Message.create!(content: "It was great having this pretend conversation with you.", user_id: user1.id, conversation_id: conversation1.id)
message4 = Message.create!(content: "Yay!", user_id: user3.id, conversation_id: conversation1.id)
message5 = Message.create!(content: "I wrote a bunch of words.", user_id: user3.id, conversation_id: conversation1.id)
message6 = Message.create!(content: "MAGA ALL DAY, SON.", user_id: user4.id, conversation_id: conversation1.id)
message7 = Message.create!(content: "Where are the fucking conflicts?!", user_id: user2.id, conversation_id: conversation1.id)
message8 = Message.create!(content: "My name is Ethan.", user_id: user7.id, conversation_id: conversation1.id)
message9 = Message.create!(content: "I'm out of juice.", user_id: user6.id, conversation_id: conversation1.id)
