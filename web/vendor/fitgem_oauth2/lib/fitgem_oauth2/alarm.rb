module FitgemOauth2
  class Client
    def post_alarm(tracker_id, time)
      request_url = "1/user/#{user_id}/devices/tracker/#{tracker_id}/alarms.json?time=#{time}-00:00&enabled=true&recurring=true&weekDays=MONDAY,TUESDAY,WEDNESDAY,THURSDAY,FRIDAY,SATURDAY,SUNDAY"
      puts request_url
      post_call(request_url)
    end

    def get_alarms(tracker_id)
      request_url = "1/user/#{user_id}/devices/tracker/#{tracker_id}/alarms.json"
      puts request_url
      get_call(request_url)
    end
  end
end
