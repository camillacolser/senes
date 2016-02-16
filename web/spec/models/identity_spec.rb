require 'rails_helper'

describe Identity, type: :model do
  it { is_expected.to belong_to :user }
 end
