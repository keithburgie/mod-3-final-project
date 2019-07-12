# Consumers subscribe to channels, acting as 
# subscribers. Their connection is called a subscription.

class ChatChannel < ApplicationCable::Channel

  # Called when the consumer has successfully
  # become a subscriber to this channel.
  def subscribed
    stream_from "chat_#{params[:room]}"
  end

end