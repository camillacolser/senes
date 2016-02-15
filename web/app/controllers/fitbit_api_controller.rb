class FitbitApiController < ApplicationController

  before_filter :authenticate_user!

  def data_request
    client = current_user.fitbit_client
    case params[:resource]
    when 'activities'; output = client.activities_on_date(params[:date])
    when 'sleep'; output = client.heart_rate_on_date(params[:date])
    when 'activities/steps'; output = client.steps_on_date(params[:date])
    end
    render json: output
  end

  def heart
    client = current_user.fitbit_client
    output = client.heart_rate_on_date('today')
    parsed = output['activities-heart'][0]['value']['restingHeartRate']
    render json: { 'restingHeartRate': parsed }
  end

  def sleep
    client = current_user.fitbit_client
    output = client.sleep_logs_on_date('2016-02-11')
    parsed = output['summary']['totalMinutesAsleep']
    render json: { 'totalMinutesAsleep': parsed }
  end

  def steps
    client = current_user.fitbit_client
    output = client.steps_on_date('today')
    parsed = output['activities-steps'][0]['value']
    render json: { 'steps': parsed }
  end

  def battery
    client = current_user.fitbit_client
    output = client.battery_status
    parsed = output[0]['battery']
    render json: { 'battery': parsed }
  end

  def sedentary
    client = current_user.fitbit_client
    output = client.minutes_sedentary('today')
    parsed = output['summary']['sedentaryMinutes']
    render json: { 'sedentaryMinutes': parsed }
  end

  def lightly_active
    client = current_user.fitbit_client
    output = client.minutes_lightly_active('today')
    parsed = output['summary']['lightlyActiveMinutes']
    render json: { 'lightlyActiveMinutes': parsed }
  end

  def very_active
    client = current_user.fitbit_client
    output = client.minutes_very_active('today')
    parsed = output['summary']['veryActiveMinutes']
    render json: { 'veryActiveMinutes': parsed }
  end
end
