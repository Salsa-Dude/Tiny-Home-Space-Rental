class Api::V1::LeasesController < ApplicationController
  def index 
    @leases = Lease.all
    render json: @leases
  end

  def create 
    @lease = Lease.create(lease_params)
    if @lease.valid?
      render json: { lease: LeaseSerializer.new(@lease) }, status: :created
    else
      render json: { error: 'failed to create lease' }, status: :not_acceptable
    end
  end

  private 
  
  def lease_params
    params.require(:lease).permit(:checkin, :checkout, :owner_id, :renter_id, :property_id)
  end
end
