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
        expect(heart_evaluator(80)).to eq 0
      end
    end

    context 'heart rate is in the normal range' do
      it 'returns a code of 2' do
        expect(heart_evaluator(65)).to eq 2
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
  end

  xdescribe '#sleep_evaluator' do

  end

  xdescribe '#steps_evaluator' do

  end

  xdescribe '#bad_ok_good_status' do

  end
end
