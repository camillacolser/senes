module FitgemOauth2
  class Client
    def steps_on_date(date)
      steps_on_date_url = "1/user/#{user_id}/activities/steps/date/#{format_date(date)}/1d.json"
      puts steps_on_date_url
      get_call(steps_on_date_url)
    end
  end
end
