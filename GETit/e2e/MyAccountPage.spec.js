describe('My Account', () => {

    it('login', async () => {

        await element(by.id('emailID')).typeText('k@k.com');
        await element(by.id('password')).typeText('12345678');
        await element(by.id('password')).tapReturnKey();
        await element(by.id('loginButton')).tap();

        await expect(element(by.id('ordersPage'))).toBeVisible();

    });

    it('user should be able to view My Account page', async () => {
        
        await element(by.id('ordersPage')).swipe('left');
        await element(by.id('requestsPage')).swipe('left');
        await expect(element(by.id('myAccountPage'))).toBeVisible();

    });


});
