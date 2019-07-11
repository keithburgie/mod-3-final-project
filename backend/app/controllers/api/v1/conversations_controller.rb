class Api::V1::ConversationsController < ApplicationController
  before_action :find_conversation, only: [:show]

  def index
    @conversations = Conversation.all
    render json: render_conversation(@conversations)
  end

  def show
    render json: render_conversation(@conversation)
  end

  private

  def render_conversation(object)
    object.to_json(:include => {
      :messages => {:only => [:id, :user_id, :content, :created_at], :methods => :username}
    }, :except => [:created_at, :updated_at])
  end

  def conversation_params(*args)
    params.require(:conversation).permit(*args) 
  end

  def find_conversation
    @conversation = Conversation.find(params[:id])
  end

end