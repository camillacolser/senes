require 'rails_helper'
include FitbitApiHelper

describe FitbitApiController, type: :controller do
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

  describe '#bad_ok_good_status' do
    context 'overall status is bad' do
      it "returns 'not great'" do
        expect(bad_ok_good_status(35, 300, 1500)).to eq 'not doing great'
      end
    end

    context 'overall status is ok' do
      it "returns 'ok'" do
        expect(bad_ok_good_status(100, 2500, 6000)).to eq 'doing ok'
      end
    end

    context 'overall status is good' do
      it "returns 'great'" do
        expect(bad_ok_good_status(70, 500, 5000)).to eq 'doing great'
      end
    end
  end
end
