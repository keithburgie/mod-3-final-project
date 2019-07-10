class Api::V1::UsersController < ApplicationController
  before_action :find_user, only: [:show, :update]

  def index
    @users = User.all
    render json: render_user(@users)
  end

  def show
    render json: render_user(@user)
  end

  def update
    @user.update(user_params)
    if @user.save
      render json: @user, status: :accepted
    else
      render json: {errors: @user.errors.full_messages}, status: :unprocessible_entity
    end
  end

  private

  def render_user(object)
    object.to_json(:include => {
      :conversations => {:only => :id}
    }, :except => [:created_at, :updated_at])
  end

  def user_params(*args)
    params.require(:user).permit(*args) 
  end

  def find_user
    @user = User.find(params[:id])
  end

end