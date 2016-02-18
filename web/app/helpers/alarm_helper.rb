module AlarmHelper
  def find_alarm_id(alarms, time)
    alarm_id = 0
    alarms.each do |alarm|
      if alarm["time"] == (time+"+00:00")
        alarm_id = alarm["alarmId"]
      end
    end
    return alarm_id
  end
end
