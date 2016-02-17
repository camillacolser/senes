class FitbitApiController < ApplicationController
  include FitbitApiHelper

  def overall
    devise_id = params[:id]
    period = params[:period]
    @user = User.find_by(id: devise_id)
    client = @user.fitbit_client
    heart_parsed = client.heart_rate_on_date(period)['activities-heart'][0]['value']['restingHeartRate']
    sleep_parsed = client.sleep_logs_on_date(period)['sleep-minutesAsleep'][0]['value']
    steps_parsed = client.steps_on_date(period)['activities-steps'][0]['value']
    @json = {
      'battery': client.device_info[0]['battery'],
      'lastSyncTime': client.device_info[0]['lastSyncTime'],
      'restingHeartRate': heart_parsed,
      'totalMinutesAsleep': format_sleep(sleep_parsed),
      'steps': steps_parsed,
      'status': bad_ok_good_status(heart_parsed, sleep_parsed, steps_parsed),
      'name': client.name['user']['fullName'],
      'avatar': client.name['user']['avatar']
    }
    render json: @json
  end

  def set_alarm
    devise_id = params[:id]
    time = params[:time]
    client = User.find_by(id: devise_id).fitbit_client
    tracker_id = client.device_info[0]['id']
    response = client.post_alarm(tracker_id, time)
    render json: { 'response': response }
  end

  def alarms
    devise_id = params[:id]
    client = User.find_by(id: devise_id).fitbit_client
    tracker_id = client.device_info[0]['id']
    response = client.get_alarms(tracker_id)['trackerAlarms']
    render json: { 'trackerAlarms': response }
  end

  def tracker_id
    devise_id = params[:id]
    client = User.find_by(id: devise_id).fitbit_client
    response = client.device_info[0]['id']
    render json: { 'trackerId': response }
  end
end
