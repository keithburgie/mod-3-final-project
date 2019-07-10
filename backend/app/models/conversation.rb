class Conversation < ApplicationRecord
  has_many :messages, dependent: :destroy #,inverse_of: :conversation
  has_many :users, through: :messages
end