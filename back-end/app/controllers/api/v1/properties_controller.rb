class Api::V1::PropertiesController < ApplicationController
  def index 
    @properties = Property.all
    render json: @properties.to_json(include: :reviews)
  end

  def show 
    @property = Property.all.find(params[:id])
    render json: @property.to_json(include: :reviews)
  end

  def test 
    
  end
end
