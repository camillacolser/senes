module FitgemOauth2
  class Client
    def steps_on_date(date)
      request_url = "1/user/#{user_id}/activities/steps/date/#{format_date(date)}/1d.json"
      puts request_url
      get_call(request_url)
    end
  end
end
