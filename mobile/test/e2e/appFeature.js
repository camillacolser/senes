describe('Senior Ionic', function() {
  it('has a title', function() {
    browser.get('http://localhost:8100');
    expect(browser.getTitle()).toEqual('Senior Ionic');
  });
});
