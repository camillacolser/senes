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
    devise_id = params[:id]
    user = User.find_by(id: devise_id)
    client = user.fitbit_client
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
    output = client.device_info
    parsed = output[0]['battery']
    render json: { 'battery': parsed }
  end

  def last_sync_time
    client = current_user.fitbit_client
    output = client.device_info
    parsed = output[0]['lastSyncTime']
    render json: { 'lastSyncTime': parsed }
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
    device_info_output = client.device_info
    battery_parsed = device_info_output[0]['battery']
    last_sync_time_parsed = device_info_output[0]['lastSyncTime']
    heart_output = client.heart_rate_on_date('today')
    heart_parsed = heart_output['activities-heart'][0]['value']['restingHeartRate']
    sleep_output = client.sleep_logs_on_date('today')
    sleep_parsed = sleep_output['summary']['totalMinutesAsleep']
    steps_output = client.steps_on_date('today')
    steps_parsed = steps_output['activities-steps'][0]['value']
    activity_output = client.activity_level('today')
    sedentary_parsed = activity_output['summary']['sedentaryMinutes']
    lightly_active_parsed = activity_output['summary']['lightlyActiveMinutes']
    fairly_active_parsed = activity_output['summary']['fairlyActiveMinutes']
    very_active_parsed = activity_output['summary']['veryActiveMinutes']
    @json = {
      'battery': battery_parsed,
      'lastSyncTime': last_sync_time_parsed,
      'restingHeartRate': heart_parsed,
      'totalMinutesAsleep': sleep_parsed,
      'steps': steps_parsed,
      'sedentaryMinutes': sedentary_parsed,
      'lightlyActiveMinutes': lightly_active_parsed,
      'fairlyActiveMinutes': fairly_active_parsed,
      'veryActiveMinutes': very_active_parsed
    }
    render json: @json
  end

  def heart_evaluator
    self.overall
    heart_rate = @json[:restingHeartRate]
    if heart_rate <= 40 || heart_rate >= 100
      return 0
    elsif heart_rate >= 50 && heart_rate <= 80
      return 2
    else
      return 1
    end
  end

  def sleep_evaluator
    self.overall
    sleep_mins = @json[:totalMinutesAsleep]
    if sleep_mins < 300
      return 0
    elsif sleep_mins < 360
      return 1
    else
      return 2
    end
  end

  def steps_evaluator
    self.overall
    steps = @json[:steps]
    if steps < 2000
      return 0
    elsif steps < 3000
      return 1
    else
      return 2
    end
  end

  def bad_ok_good_status
    self.overall
    result = heart_evaluator + sleep_evaluator + steps_evaluator
    if result <= 2
      return 0
    elsif result <= 4
      return 1
    else
      return 2
    end
  end
end
