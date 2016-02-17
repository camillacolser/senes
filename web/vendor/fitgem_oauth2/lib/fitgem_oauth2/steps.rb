module FitgemOauth2
  class Client
    def steps_on_date(period)
      steps_on_date_url = "1/user/#{user_id}/activities/steps/date/today/#{period}.json"
      puts steps_on_date_url
      get_call(steps_on_date_url)
    end
  end
end
