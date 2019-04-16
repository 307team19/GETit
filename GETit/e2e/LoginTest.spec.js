describe('Test', () => {
  beforeAll(async () => {
    await device.launchApp({ permissions: { location: 'always' } });
    await device.launchApp({ permissions: { notifications: 'YES' } });
  });

  beforeEach(async () => {
    await device.reloadReactNative();
  });

  it('user should be logged in now', async () => {

    await element(by.id('emailID')).typeText('k@k.com');
    await element(by.id('password')).typeText('12345678');
    await element(by.id('password')).tapReturnKey();
    await element(by.id('loginButton')).tap();

    await expect(element(by.id('myOrdersPage'))).toBeVisible();
  });


});
