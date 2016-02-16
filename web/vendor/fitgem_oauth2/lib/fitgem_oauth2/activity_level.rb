module FitgemOauth2
  class Client
    def activity_level(date)
      minutes_sedentary_url = "1/user/#{user_id}/activities/date/#{format_date(date)}.json"
      puts minutes_sedentary_url
      get_call(minutes_sedentary_url)
    end
  end
end
