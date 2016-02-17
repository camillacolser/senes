module FitgemOauth2
  class Client
    def sleep_logs_on_date(period)
      sleep_logs_on_date_url = "1/user/#{user_id}/sleep/minutesAsleep/date/today/#{period}.json"
      puts sleep_logs_on_date_url
      get_call(sleep_logs_on_date_url)
    end
  end
end
