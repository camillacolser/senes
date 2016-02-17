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
      'totalMinutesAsleep': format_sleep(sleep_parsed),
      'steps': steps_parsed,
      'status': bad_ok_good_status(heart_parsed, sleep_parsed, steps_parsed),
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

  def update_alarm
    devise_id = params[:id]
    client = User.find_by(id: devise_id).fitbit_client
    tracker_id = client.device_info[0]['id']
    alarms = client.get_alarms(tracker_id)['trackerAlarms']
    alarm_id = find_alarm_id(alarms, params[:old_time])
    response = client.update_alarm_call(tracker_id, alarm_id, params[:new_time])
    render json: { 'response': response }
  end

  def delete_alarm
    devise_id = params[:id]
    client = User.find_by(id: devise_id).fitbit_client
    tracker_id = client.device_info[0]['id']
    alarms = client.get_alarms(tracker_id)['trackerAlarms']
    alarm_id = find_alarm_id(alarms, params[:time])
    client.delete_alarm_call(tracker_id, alarm_id)
    render json: { 'result': 'Alarm deleted!' }
  end

  def subscription
    if params[:verify] == '6f9263ce28d20cedc40ec6c10cb672a6985933692a95d032ebb9a96e14d00762'
      no_content
    else
      not_found
    end
  end

end
