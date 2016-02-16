module FitgemOauth2
  class Client
    def device_info
      device_info_url = "1/user/#{user_id}/devices.json"
      puts device_info_url
      get_call_array(device_info_url)
    end
  end
end
