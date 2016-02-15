module FitgemOauth2
  class Client
    def minutes_lightly_active(date)
      request_url = "1/user/#{user_id}/activities/date/#{format_date(date)}.json"
      puts request_url
      get_call(request_url)
    end
  end
end
