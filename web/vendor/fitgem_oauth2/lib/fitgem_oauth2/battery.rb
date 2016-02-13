module FitgemOauth2
  class Client
    def battery_status
      request_url = "1/user/#{user_id}/devices.json"
      puts request_url
      get_call_array(request_url)
    end
  end
end
