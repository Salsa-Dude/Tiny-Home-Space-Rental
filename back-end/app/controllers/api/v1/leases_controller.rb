class Api::V1::LeasesController < ApplicationController
  def index 
    @leases = Lease.all
    render json: @leases
  end

  def create 
   @lease = Lease.create(lease_params)
   render json: @lease
  

  end

  def update
    @lease = Lease.find(params[:id]).update(lease_params)
    render json: @lease
  end

  private 
  
  def lease_params
    params.require(:lease).permit(:checkin, :checkout, :owner_id, :renter_id, :property_id)
  end
end
