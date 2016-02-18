require 'rails_helper'
include FitbitApiHelper

describe FitbitApiController, type: :controller do

  let(:alarms) { [{"alarmId"=>666, "deleted"=>false, "enabled"=>true,
                    "time"=>"14:12+00:00", "weekDays"=>["MONDAY", "FRIDAY", "SATURDAY", "SUNDAY"]}] }
  let(:time) { "14:12" }

  describe '#format_sleep' do
    it 'changes minutes into hours and minutes' do
      expect(format_sleep(348)).to eq("5h, 48m")
    end
  end

  describe '#heart_evaluator' do
    context 'heart rate is far too low or high' do
      it 'returns a code of 0 when far too low' do
        expect(heart_evaluator(30)).to eq 0
      end

      it 'returns a code of 0 when far too high' do
        expect(heart_evaluator(100)).to eq 0
      end
    end

    context 'heart rate is slightly too low or high' do
      it 'returns a code of 1 when slightly too low' do
        expect(heart_evaluator(45)).to eq 1
      end

      it 'returns a code of 1 when slightly too high' do
        expect(heart_evaluator(90)).to eq 1
      end
    end

    context 'heart rate is in the normal range' do
      it 'returns a code of 2' do
        expect(heart_evaluator(65)).to eq 2
      end
    end

    context 'there is no heart rate data' do
      it 'returns a code of 1' do
        expect(heart_evaluator(nil)).to eq 1
      end
    end
  end

  describe '#sleep_evaluator' do
    context 'sleep amount is far too low' do
      it 'returns a code of 0' do
        expect(sleep_evaluator(289)).to eq 0
      end
    end

    context 'sleep amount is slightly too low' do
      it 'returns a code of 1' do
        expect(sleep_evaluator(350)).to eq 1
      end
    end

    context 'sleep amount is good' do
      it 'returns a code of 2' do
        expect(sleep_evaluator(501)).to eq 2
      end
    end
  end

  describe '#steps_evaluator' do
    context 'number of steps is far too low' do
      it 'returns a code of 0' do
        expect(steps_evaluator(1500)).to eq 0
      end
    end

    context 'number of steps is slightly too low' do
      it 'returns a code of 1' do
        expect(steps_evaluator(2500)).to eq 1
      end
    end

    context 'number of steps is good' do
      it 'returns a code of 2' do
        expect(steps_evaluator(7834)).to eq 2
      end
    end
  end

  describe '#single_today_status' do
    context 'the status for one type of daily data is bad' do
      it "returns 'bad'" do
        expect(single_today_status(0)).to eq 'bad'
      end
    end

    context 'the status for one type of daily data is ok' do
      it "returns 'ok'" do
        expect(single_today_status(1)).to eq 'ok'
      end
    end

    context 'the status for one type of daily data is good' do
      it "returns 'great'" do
        expect(single_today_status(2)).to eq 'great'
      end
    end
  end

  describe '#overall_today_status' do
    context 'overall today status is bad' do
      it "returns 'not doing great'" do
        expect(overall_today_status(35, 300, 1500)).to eq 'not doing great'
      end
    end

    context 'overall today status is ok' do
      it "returns 'doing ok'" do
        expect(overall_today_status(100, 2500, 6000)).to eq 'doing ok'
      end
    end

    context 'overall today status is good' do
      it "returns 'doing great'" do
        expect(overall_today_status(70, 500, 5000)).to eq 'doing great'
      end
    end
  end

  describe '#week_status' do
    context 'week status is bad' do
      it "returns 'below average'" do
        expect(week_status(0)).to eq 'below average'
      end
    end

    context 'week status is ok' do
      it "returns 'normal'" do
        expect(week_status(1)).to eq 'normal'
      end
    end

    context 'week status is good' do
      it "returns 'above average'" do
        expect(week_status(2)).to eq 'above average'
      end
    end
  end

  describe '#find_alarm_id' do
    it 'returns the alarmd id' do
      expect(find_alarm_id(alarms, time)).to eq 666
    end
  end

  describe 'API tests' do
    require 'fakeweb'
    require 'httparty'
    # before do
    #   OmniAuth.config.test_mode = true
    #   OmniAuth.config.mock_auth[:fitbit] = OmniAuth::AuthHash.new({
    #     :provider => 'fitbit',
    #     :uid => '123545'
    #     # etc.
    #   })
    # end

    before do
      FakeWeb.register_uri(:get, "http://localhost:3000/fitbit/today?id=1", :body => "Hello World!")
    end

    it 'returns "Hello World!"' do
      response = HTTParty.get("http://localhost:3000/fitbit/today?id=1")
      expect(response.body).to eq "Hello World!"
    end

  end
end
