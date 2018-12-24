class Api::V1::AuthController < ApplicationController
  def create 
    @user = User.find_by(username: params[:username])
    if @user && @user.authenticate(params[:password])
      render json: {
        message: "correct username and password",
        user_info: @user,
        error: false,
        token: encode({user_id: @user.id})
      }, 
      status: :accepted
    else  
      render json: {
        message: "Incorrect!",
        error: true
        }, 
        status: :unauthorized
    end
  end
end
