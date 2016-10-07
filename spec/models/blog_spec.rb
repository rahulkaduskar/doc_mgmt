require 'rails_helper'

RSpec.describe Blog, type: :model do
  subject { described_class.new }
  describe Blog do
    it "is valid with valid attributes" do
      subject.title = "Anything"
      subject.user =  FactoryGirl.create(:user)
      expect(subject).to be_valid
    end

    it "is not valid without a title" do
      expect(subject).to_not be_valid
    end
  end
end
