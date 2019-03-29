// Navitage user to a different landing page based on their role

$('.login-btn').on('click', () => {
	const radioValue = $("input[name='user']:checked").val();
	if (radioValue === 'cashier') {
		// Cashier landing page
		$('.login-section form').attr('action', './pages/cashier.transactions.html');

	} else if (radioValue === 'client') {
		// Client landing page
		$('.login-section form').attr('action', './pages/client.dashboard.html');

	} else if (radioValue === 'admin') {
		// Admin landing page
		$('.login-section form').attr('action', './pages/admin.accounts.html');
	}
});


// Popup account details when admin/staff selects an account
$('.acc-list td a').on('click', () => {
	$('.popup-acc-details').css('visibility', 'visible');
});

$('.btn-process').on('click', () => {
	$('.popup-transaction').css('visibility', 'visible');
});

$('.deposit, .withdraw').on('click', () => {
	$('.client-request-modal').css('visibility', 'visible');
});


$('.new-acct').on('click', () => {
	$('.new-acct-popup').css('visibility', 'visible');
});



