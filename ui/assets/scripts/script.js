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
