// Navitage user to a different landing page based on their role

$('.login-btn').on('click', () => {
  const radioValue = $("#email").val();
  if (radioValue === 'cashier') {
    // Cashier landing page
    $('.login-section form').attr('action', './pages/cashier.tellers.html');

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
  $('.popup_close').css('float', 'right');
});

$('.debit, .credit').on('click', () => {
  $('.popup-transaction').css('visibility', 'visible');
  $('.popup_close').css('float', 'right');
});

$('.fill_teller').on('click', () => {
  $('.teller_popup').css('visibility', 'visible');
  $('.popup_close').css('float', 'right');
});


$('.new-acct').on('click', () => {
  $('.new-acct-popup').css('visibility', 'visible');
  $('.popup_close').css('float', 'right');
});

$('.new-staff').on('click', () => {
  $('.pop-create-staff').css('visibility', 'visible');
  $('.popup_close').css('float', 'right');
});





