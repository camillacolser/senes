class FitbitApiController < ApplicationController

  before_filter :authenticate_user!

  def data_request
    client = current_user.fitbit_client
    case params[:resource]
    when "activities"; output = client.activities_on_date(params[:date])
    when "sleep"; output = client.heart_rate_on_date(params[:date])
    when "activities/steps"; output = client.steps_on_date(params[:date])
    end
    render json: output
  end

  def heart
    client = current_user.fitbit_client
    output = client.heart_rate_on_date('today')
    parsed = output["activities-heart"][0]["value"]["restingHeartRate"]
    render json: {'restingHeartRate': parsed}
  end

  def steps
    client = current_user.fitbit_client
    output = client.steps_on_date('today')
    parsed = output["activities-steps"][0]["value"]
    render json: {'steps': parsed}
  end


end
