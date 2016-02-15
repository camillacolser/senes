module FitgemOauth2
  class Client
    def battery_status
      battery_status_url = "1/user/#{user_id}/devices.json"
      puts battery_status_url
      get_call_array(battery_status_url)
    end
  end
end
