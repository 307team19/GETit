describe('Test', () => {
  beforeAll(async () => {
    await device.launchApp({ permissions: { location: 'always' } });
    await device.launchApp({ permissions: { notifications: 'YES' } });
  });

  beforeEach(async () => {
    await device.reloadReactNative();
  });

  it('user should be on all orders page now', async () => {

    await element(by.id('emailID')).typeText('hi@hi.com');
    await element(by.id('password')).typeText('12345678');
    await element(by.id('password')).tapReturnKey();
    await element(by.id('loginButton')).tap();

    await element(by.id('myOrdersPage')).swipe('left');
    await element(by.id('allOrdersPage')).swipe('left');
    await element(by.id('addRequestbutton')).tap();

    await element(by.id('addRequestItem')).tap();

    await element(by.id('addRequestPrice')).typeText('5');
    await element(by.id('addRequestItem')).typeText('order test');
    await element(by.id('addRequestItem')).tapReturnKey();

    await element(by.id('addRequestAddButton')).tap();

    await element(by.id('addRequestPage')).swipe('left');
    await element(by.id('myAccountPage')).swipe('up');
    await element(by.id('myAccountPage')).swipe('up');

    await element(by.id('signOutButton')).tap();

    await element(by.id('emailID')).tap();

    await element(by.id('emailID')).typeText('k@k.com');
    await element(by.id('password')).typeText('12345678');
    await element(by.id('password')).tapReturnKey();
    await element(by.id('loginButton')).tap();

    await element(by.id('myOrdersPage')).swipe('left');

    await element(by.id('allOrdersPage')).swipe('up');
    await element(by.id('allOrdersPage')).swipe('up');

    await expect(element(by.text('order test'))).toExist();

    //await expect(element(by.id('allOrdersPage'))).toBeVisible();
  });


});