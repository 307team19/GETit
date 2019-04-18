describe('Test', () => {
    beforeAll(async () => {
        await device.launchApp({ permissions: { location: 'always' } });
        await device.launchApp({ permissions: { notifications: 'YES' } });
    });


    it('user should be able to see order details', async () => {

        await element(by.id('emailID')).typeText('hi@hi.com');
        await element(by.id('password')).typeText('12345678');
        await element(by.id('password')).tapReturnKey();
        await element(by.id('loginButton')).tap();

        await element(by.id('myOrdersPage')).swipe('left');
        await element(by.id('allOrdersPage')).swipe('left');
        await element(by.id('addRequestbutton')).tap();

        await element(by.id('addRequestItem')).tap();

        await element(by.id('addRequestPrice')).typeText('5');
        await element(by.id('addRequestItem')).typeText('AcceptTest');
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

        await expect(element(by.id('allOrdersPage'))).toBeVisible();

        await element(by.id('0detailsButton')).tap();
        await expect(element(by.id('orderDetailsPage'))).toBeVisible();
        await element(by.id('orderDetailsPage')).swipe('up');
        await element(by.id('acceptButton')).tap();
        await element(by.label('Yes').and(by.type('_UIAlertControllerActionView'))).tap();
        await expect(element(by.id('allOrdersPage'))).toBeVisible();
        await element(by.id('allOrdersPage')).swipe('right');
        await expect(element(by.text('AcceptTest'))).toExist();



    });



});
