module FitgemOauth2
  class Client
    def sleep_logs_on_date(date)
      sleep_logs_on_date_url = "1/user/#{user_id}/sleep/date/#{format_date(date)}.json"
      puts sleep_logs_on_date_url
      get_call(sleep_logs_on_date_url)
    end
  end
end
