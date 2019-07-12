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

conversation1 = Conversation.create!(name: "dc-513-mod-3")
conversation2 = Conversation.create!(name: "dc-513-mod-5")

message1 = Message.create!(content: "Hey Meghan how are things?", user_id: user1.id, conversation_id: conversation1.id)
message2 = Message.create!(content: "Everything is fantastic and wonderful.", user_id: user2.id, conversation_id: conversation2.id)
message3 = Message.create!(content: "It was great having this pretend conversation with you.", user_id: user1.id, conversation_id: conversation1.id)
message3 = Message.create!(content: "Today!", user_id: user3.id, conversation_id: conversation2.id)

