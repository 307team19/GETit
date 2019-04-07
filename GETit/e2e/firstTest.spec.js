describe('Example', () => {
  beforeEach(async () => {
    await device.reloadReactNative();
  });

  it('should have welcome screen', async () => {

    await element(by.id('emailID')).typeText('k@k.com');
    await element(by.id('password')).typeText('12345678');
    await element(by.id('password')).tapReturnKey();
    await element(by.id('loginButton')).tap();




    await expect(element(by.id('ordersPage'))).toBeVisible();
  });


});
