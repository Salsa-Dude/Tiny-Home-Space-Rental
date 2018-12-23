class Api::V1::AuthController < ApplicationController
  def create 
    @user = User.find_by(username: params[:username])
    if @user && @user.authenticate(params[:password])
      render json: {message: "correct username and password"}, status: :accepted
    else  
      render json: {message: "Incorrect!"}, status: :unauthorized
    end
  end
end
