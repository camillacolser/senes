module FitbitApiHelper
  def format_sleep(mins)
    mins = mins.to_i
    hours = mins / 60
    mins = mins % 60
    return "#{hours}h, #{mins}m"
  end

  def heart_evaluator(heart_rate)
    heart_rate = heart_rate.to_i
    if heart_rate == nil
      return 1
    elsif heart_rate_bad?(heart_rate)
      return 0
    elsif heart_rate_good?(heart_rate)
      return 2
    else
      return 1
    end
  end

  def sleep_evaluator(sleep_mins)
    sleep_mins = sleep_mins.to_i
    if sleep_bad?(sleep_mins)
      return 0
    elsif sleep_ok?(sleep_mins)
      return 1
    else
      return 2
    end
  end

  def steps_evaluator(steps)
    steps = steps.to_i
    if steps_bad?(steps)
      return 0
    elsif steps_ok?(steps)
      return 1
    else
      return 2
    end
  end

  def bad_ok_good_status(heart_parsed, sleep_parsed, steps_parsed)
    result = heart_evaluator(heart_parsed) + sleep_evaluator(sleep_parsed) + steps_evaluator(steps_parsed)
    if result <= 2
      return 'not doing great'
    elsif result <= 4
      return 'doing ok'
    else
      return 'doing great'
    end
  end

  def week_status(result)
    if result == 2
      return 'above average'
    elsif result == 1
      return 'normal'
    else
      return 'below average'
    end
  end

  def find_alarm_id(alarms, time)
    alarm_id = 0
    alarms.each do |alarm|
      if alarm["time"] == (time+"+00:00")
        alarm_id = alarm["alarmId"]
      end
    end
    return alarm_id
  end

  def not_found
    raise ActionController::RoutingError.new('Not Found')
  end

  def no_content
    head :no_content
  end

  private

  def heart_rate_bad?(heart_rate)
    heart_rate <= 40 || heart_rate >= 100
  end

  def heart_rate_good?(heart_rate)
    (50..80).include?(heart_rate)
  end

  def sleep_bad?(mins)
    mins < 300
  end

  def sleep_ok?(mins)
    mins < 360
  end

  def steps_bad?(steps)
    steps < 2000
  end

  def steps_ok?(steps)
    steps < 3000
  end
end
