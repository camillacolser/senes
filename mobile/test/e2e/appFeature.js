describe('Senior Ionic', function() {
  var today = element(by.css('h1'));
  var week = element(by.linkText('Week'));

  it('displays the \'today \' tab by default', function() {
    browser.get('http://localhost:8100');
    expect(browser.getTitle()).toEqual('Today');
  });

  it('displays the \'week\' tab when clicked on', function() {
    browser.get('http://localhost:8100');
    week.click();
    expect(browser.getTitle()).toEqual('Week');
  });
});
