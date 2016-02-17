module FitgemOauth2
  class Client
    def heart_rate_on_date(period)
      heart_rate_on_date_url = "1/user/#{user_id}/activities/heart/date/today/#{period}.json"
      query = get_call(heart_rate_on_date_url)
    end
  end
end
