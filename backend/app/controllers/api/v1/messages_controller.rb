class Api::V1::MessagesController < ApplicationController
  before_action :find_message, only: [:update]

  def index
    @messages = Message.all
    render json: @messages
  end

  def update
    @message.update(message_params)
    if message.save
      render json: @message, status: :accepted
    else 
      render json: {errors: @message.errors.full_messages}, status: :unprocessible_entity
    end
  end


  private

  def message_params
    params.permit(:content)
  end

  def find_message
    @message = Message.find(params[:id])
  end

end
