
class Api::V1::UsersController < ApplicationController

  # Check the token sent to us by client, return the user object that token represents
  def profile
    token = request.headers["Authentication"].split(" ")[1]
    payload = decode(token)
    user_id = payload["user_id"]
    render json: { user: User.find(user_id) }, status: :accepted
  end

  # Sign Up
  # def create
  #   @user = User.create(user_params)
  #   if @user.valid?
  #     render json: { user: UserSerializer.new(@user) }, status: :created
  #   else
  #     render json: { error: 'failed to create user' }, status: :not_acceptable
  #   end
  # end

  def index 
    @users = User.all 
    render json: @users
  end


  # def user_params
  #   params.require(:user).permit(:username, :password, :bio, :avatar)
  # end

end
