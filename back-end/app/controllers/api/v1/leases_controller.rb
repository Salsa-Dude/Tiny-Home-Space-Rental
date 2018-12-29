class Api::V1::LeasesController < ApplicationController
  def index 
    @leases = Lease.all
    render json: @leases
  end
end
