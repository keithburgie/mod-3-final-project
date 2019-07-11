class Api::V1::MessagesController < ApplicationController
  before_action :find_message, only: [:show, :update, :edit, :destroy]

  def index
    @messages = Message.all
    render json: render_message(@messages)
  end

  def show
    render json: render_message(@message)
  end 

  def new
    @message = Message.new
  end

  def create
    new_message = Message.create(message_params)
    render json: render_message(new_message)
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

  def render_message(object)
    object.to_json(:only => [:id, :user_id, :content, :created_at, :conversation_id], :methods => :username)
  end

  def message_params
    params.require(:message).permit(:conversation_id, :user_id, :content, :created_at)
  end

  # def message_params(*args)
  #   params.require(:message).permit(*args)
  # end

  def find_message
    @message = Message.find(params[:id])
  end

end