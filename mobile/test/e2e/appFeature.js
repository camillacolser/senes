describe('Senior Ionic', function() {
  var today = element(by.css('a.active'));
  it('has a title', function() {
    browser.get('http://localhost:8100');
    expect(browser.getTitle()).toEqual('Senior Ionic');
  });

  it('displays the \'today \' tab by default', function() {
    browser.get('http://localhost:8100');
    expect(today.getText()).toEqual('Today');
  });

});
