describe 'Api requests' do
  it 'allows a user to Sign up' do
    visit '/'
    expect(page).to have_link 'Signup'
  end
  context 'when user logged in' do
    
  end
end
