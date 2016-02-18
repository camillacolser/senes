class AlarmController < ApplicationController
  include AlarmHelper

  def create
    devise_id = params[:user_id]
    time = params[:time]
    client = User.find_by(id: devise_id).fitbit_client
    tracker_id = client.device_info[0]['id']
    response = client.post_alarm(tracker_id, time)
    render json: { 'response': response }
  end

  def index
    devise_id = params[:user_id]
    client = User.find_by(id: devise_id).fitbit_client
    tracker_id = client.device_info[0]['id']
    response = client.get_alarms(tracker_id)['trackerAlarms']
    render json: { 'trackerAlarms': response }
  end

  def update
    devise_id = params[:user_id]
    client = User.find_by(id: devise_id).fitbit_client
    tracker_id = client.device_info[0]['id']
    response = client.update_alarm_call(tracker_id, params[:id], params[:time])
    render json: { 'response': response }
  end

  def destroy
    devise_id = params[:user_id]
    client = User.find_by(id: devise_id).fitbit_client
    tracker_id = client.device_info[0]['id']
    client.delete_alarm_call(tracker_id, params[:id])
    render json: { 'result': 'Alarm deleted!' }
  end

end
