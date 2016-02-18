require 'rails_helper'

RSpec.describe AlarmController, type: :controller do
  describe '#find_alarm_id' do
    it 'returns the alarmd id' do
      expect(find_alarm_id(alarms, time)).to eq 666
    end
  end
end
