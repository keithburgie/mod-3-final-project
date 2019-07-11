class Message < ApplicationRecord
  belongs_to :conversation
  belongs_to :user

  attr_accessor :username

  def username
    self.user.username
  end

end