class FitbitApiController < ApplicationController
  include FitbitApiHelper

  def overall
    devise_id = params[:id]
    @user = User.find_by(id: devise_id)
    client = @user.fitbit_client
    heart_parsed = client.heart_rate_on_date('today')['activities-heart'][0]['value']['restingHeartRate']
    sleep_parsed = client.sleep_logs_on_date('today')['summary']['totalMinutesAsleep']
    steps_parsed = client.steps_on_date('today')['activities-steps'][0]['value']
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

  def format_sleep(mins)
    hours = mins / 60
    mins = mins % 60
    return "#{hours}h, #{mins}m"
  end

  def heart_evaluator(heart_rate)
    if heart_rate == nil
      return 1
    elsif heart_rate <= 40 || heart_rate >= 100
      return 0
    elsif heart_rate >= 50 && heart_rate <= 80
      return 2
    else
      return 1
    end
  end

  def sleep_evaluator(sleep_mins)
    if sleep_mins < 300
      return 0
    elsif sleep_mins < 360
      return 1
    else
      return 2
    end
  end

  def steps_evaluator(steps)
    steps = steps.to_i
    if steps < 2000
      return 0
    elsif steps < 3000
      return 1
    else
      return 2
    end
  end

  def bad_ok_good_status(heart_parsed, sleep_parsed, steps_parsed)
    result = heart_evaluator(heart_parsed) + sleep_evaluator(sleep_parsed) + steps_evaluator(steps_parsed)
    if result <= 2
      return 'not great'
    elsif result <= 4
      return 'ok'
    else
      return 'great'
    end
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
