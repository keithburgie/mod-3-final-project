class Api::V1::ConversationsController < ApplicationController

  before_action :find_conversation, only: [:show]

  def index
    @conversations = Conversation.all
    render json: @conversations
  end

  def show
    render json: @conversation
  end

  private

  def conversation_params(*args)
    params.require(:conversation).permit(*args)
  end

  # def conversation_params
  #   params.permit(:content)
  # end

  def find_conversation
    @conversation = Conversation.find(params[:id])
  end



end

