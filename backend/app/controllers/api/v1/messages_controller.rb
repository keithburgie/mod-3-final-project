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
    @message = Message.new(message_params)
    if @message.valid?
      @message.save
      redirect_to message_path(@message)
    else
      render :new
    end
    
  end

  def render_message(object)
    object.to_json(:except => :updated_at)
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

  def message_params(*args)
    params.require(:message).permit(*args)
  end

  def find_message
    @message = Message.find(params[:id])
  end

end
