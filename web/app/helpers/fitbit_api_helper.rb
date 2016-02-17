module FitbitApiHelper
  def format_sleep(mins)
    hours = mins / 60
    mins = mins % 60
    return "#{hours}h, #{mins}m"
  end

  def heart_evaluator(heart_rate)
    heart_rate = heart_rate.to_i
    if heart_rate == nil
      return 1
    elsif heart_rate <= 40 || heart_rate >= 100
      return 0
    elsif heart_rate >= 50 && heart_rate <= 80
      return 2
    else
      return 1
    end
  end

  def sleep_evaluator(sleep_mins)
    if sleep_mins < 300
      return 0
    elsif sleep_mins < 360
      return 1
    else
      return 2
    end
  end

  def steps_evaluator(steps)
    steps = steps.to_i
    if steps < 2000
      return 0
    elsif steps < 3000
      return 1
    else
      return 2
    end
  end

  def bad_ok_good_status(heart_parsed, sleep_parsed, steps_parsed)
    result = heart_evaluator(heart_parsed) + sleep_evaluator(sleep_parsed) + steps_evaluator(steps_parsed)
    if result <= 2
      return 'not great'
    elsif result <= 4
      return 'ok'
    else
      return 'great'
    end
  end
end
