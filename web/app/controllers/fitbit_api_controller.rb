class FitbitApiController < ApplicationController
  include FitbitApiHelper

  def today
    devise_id = params[:id]
    @user = User.find_by(id: devise_id)
    client = @user.fitbit_client
    heart_parsed = client.heart_rate_on_date('1d')['activities-heart'][0]['value']['restingHeartRate']
    sleep_parsed = client.sleep_logs_on_date('1d')['sleep-minutesAsleep'][0]['value']
    steps_parsed = client.steps_on_date('1d')['activities-steps'][0]['value']
    @json = {
      'battery': client.device_info[0]['battery'],
      'lastSyncTime': client.device_info[0]['lastSyncTime'],
      'restingHeartRate': heart_parsed,
      'heartRateStatus': single_today_status(heart_evaluator(heart_parsed)),
      'totalMinutesAsleep': format_sleep(sleep_parsed),
      'sleepStatus': single_today_status(sleep_evaluator(sleep_parsed)),
      'steps': steps_parsed,
      'stepsStatus': single_today_status(steps_evaluator(steps_parsed)),
      'status': overall_today_status(heart_parsed, sleep_parsed, steps_parsed),
      'name': client.name['user']['fullName'],
      'avatar': client.name['user']['avatar']
    }
    render json: @json
  end

  def week
    devise_id = params[:id]
    @user = User.find_by(id: devise_id)
    client = @user.fitbit_client
    heart_parsed = client.heart_rate_on_date('7d')['activities-heart'][0]['value']['restingHeartRate']
    sleep_parsed = client.sleep_logs_on_date('7d')['sleep-minutesAsleep'][0]['value']
    steps_parsed = client.steps_on_date('7d')['activities-steps'][0]['value']
    @json = {
      'restingHeartRate': heart_parsed,
      'totalMinutesAsleep': format_sleep(sleep_parsed),
      'steps': steps_parsed,
      'heartRateStatus': week_status(heart_evaluator(heart_parsed)),
      'sleepStatus': week_status(sleep_evaluator(sleep_parsed)),
      'stepsStatus': week_status(steps_evaluator(steps_parsed)),
      'name': client.name['user']['fullName']
    }
    render json: @json
  end

  def settings
    devise_id = params[:id]
    @user = User.find_by(id: devise_id)
    client = @user.fitbit_client
    @json = {
      'name': client.name['user']['fullName'],
      'avatar': client.name['user']['avatar']
    }
    render json: @json
  end

  def subscription
    if params[:verify] == '6f9263ce28d20cedc40ec6c10cb672a6985933692a95d032ebb9a96e14d00762'
      no_content
    else
      not_found
    end
  end

end
