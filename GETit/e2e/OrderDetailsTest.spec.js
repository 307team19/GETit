describe('Test', () => {
    beforeAll(async () => {
        await device.launchApp({ permissions: { location: 'always' } });
        await device.launchApp({ permissions: { notifications: 'YES' } });
    });



    it('user should be logged in now', async () => {

        await element(by.id('emailID')).typeText('k@k.com');
        await element(by.id('password')).typeText('12345678');
        await element(by.id('password')).tapReturnKey();
        await element(by.id('loginButton')).tap();
        await element(by.id('myOrdersPage')).swipe('left');

        await expect(element(by.id('allOrdersPage'))).toBeVisible();

        await element(by.id('0detailsButton')).tap();
        await expect(element(by.id('orderDetailsPage'))).toBeVisible();
        await element(by.traits(['button'])).atIndex(0).tap();
        await expect(element(by.id('allOrdersPage'))).toBeVisible();

    });



});
