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
    output = client.sleep_logs_on_date('today')
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
    output = client.activity_level('today')
    parsed = output['summary']['sedentaryMinutes']
    render json: { 'sedentaryMinutes': parsed }
  end

  def lightly_active
    client = current_user.fitbit_client
    output = client.activity_level('today')
    parsed = output['summary']['lightlyActiveMinutes']
    render json: { 'lightlyActiveMinutes': parsed }
  end

  def fairly_active
    client = current_user.fitbit_client
    output = client.activity_level('today')
    parsed = output['summary']['fairlyActiveMinutes']
    render json: { 'fairlyActiveMinutes': parsed }
  end

  def very_active
    client = current_user.fitbit_client
    output = client.activity_level('today')
    parsed = output['summary']['veryActiveMinutes']
    render json: { 'veryActiveMinutes': parsed }
  end

  def overall
    client = current_user.fitbit_client
    battery_output = client.battery_status
    battery_parsed = battery_output[0]['battery']
    heart_output = client.heart_rate_on_date('today')
    heart_parsed = heart_output['activities-heart'][0]['value']['restingHeartRate']
    sleep_output = client.sleep_logs_on_date('today')
    sleep_parsed = sleep_output['summary']['totalMinutesAsleep']
    steps_output = client.steps_on_date('today')
    steps_parsed = steps_output['activities-steps'][0]['value']
    sedentary_output = client.activity_level('today')
    sedentary_parsed = sedentary_output['summary']['sedentaryMinutes']
    lightly_active_output = client.activity_level('today')
    lightly_active_parsed = lightly_active_output['summary']['lightlyActiveMinutes']
    fairly_active_output = client.activity_level('today')
    fairly_active_parsed = fairly_active_output['summary']['fairlyActiveMinutes']
    very_active_output = client.activity_level('today')
    very_active_parsed = very_active_output['summary']['veryActiveMinutes']
    render json: {
      'battery': battery_parsed,
      'restingHeartRate': heart_parsed,
      'totalMinutesAsleep': sleep_parsed,
      'steps': steps_parsed,
      'sedentaryMinutes': sedentary_parsed,
      'lightlyActiveMinutes': lightly_active_parsed,
      'fairlyActiveMinutes': fairly_active_parsed,
      'veryActiveMinutes': very_active_parsed
    }
  end
end
