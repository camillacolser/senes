module FitgemOauth2
  class Client
    def heart_rate_on_date(date)
      heart_rate_on_date_url = "1/user/#{user_id}/activities/heart/date/#{format_date(date)}/1d.json"
      query = get_call(heart_rate_on_date_url)
    end
  end
end
