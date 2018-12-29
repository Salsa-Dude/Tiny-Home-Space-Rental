class Api::V1::PropertiesController < ApplicationController
  def index 
    @properties = Property.all
    render json: @properties
  end

  def show 
    @property = Property.all.find(params[:id])
    render json: @property
  end

  def test 
    
  end
end
