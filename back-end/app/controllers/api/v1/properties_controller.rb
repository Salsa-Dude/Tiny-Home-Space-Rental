class Api::V1::PropertiesController < ApplicationController
  def index 
    @properties = Property.all
    render json: @properties
  end

  def show 
    @property = Property.find(params[:id])
    render json: @property
  end

  def update
    @property = Property.find(params[:id]).update(property_params)
    render json: @property
  end

  private
  
  def property_params
    params.require(:property).permit(:id, :name, :image, :address, :city, :state, :description, :perks, :notes, :price)
  end
end
