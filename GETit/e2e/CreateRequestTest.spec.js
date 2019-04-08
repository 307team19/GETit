describe('Request', () => {
    beforeAll(async () => {
        // await device.reloadReactNative();
        await device.launchApp({ permissions: { location: 'always' } })
    });



    it('login', async () => {

        await element(by.id('emailID')).typeText('k@k.com');
        await element(by.id('password')).typeText('12345678');
        await element(by.id('password')).tapReturnKey();
        await element(by.id('loginButton')).tap();

        await expect(element(by.id('ordersPage'))).toBeVisible();

    });

    it('user should be create request', async () => {

        await element(by.id('ordersPage')).swipe('left');
        await element(by.id('addRequestButton')).tap();
        await expect(element(by.id('addRequestPage'))).toBeVisible();

    });



});
