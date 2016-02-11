describe 'Api requests' do
  context 'when user logged in' do
    xit 'should return a positive response with an object' do
      visit '/fitbit/heart'
      expect(page).to have_content 'Something'
    end
  end
end
