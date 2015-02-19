var BankAccount = {
  name: "",
  balance: 0,
  withdraw: function(amount) {
    if (!isNaN(parseFloat(amount)) && isFinite(amount) && amount > 0)
    this.balance = this.balance - amount;
  },
  deposit: function(amount) {
    if (!isNaN(parseFloat(amount)) && isFinite(amount) && amount > 0)
    this.balance = this.balance + amount;
  },
}

$(document).ready(function() {
  $("form#new-account").submit(function(event) {
    event.preventDefault();

    var inputtedName = $("input#account-name").val();
    var inputtedFirstDeposit = parseFloat($("input#initial-deposit").val().replace(/,/g, ''));

    if (inputtedName === "") {
      $(".error").show();
      $(".error").text("Please Enter Account Name!");
      return false;
    } else {
      $(".error").hide();
    }

    if (isNaN(inputtedFirstDeposit) || inputtedFirstDeposit < 0 ) {
      inputtedFirstDeposit = 0
      $(".error").show();
      $(".error").text("Enter a Valid Initial Deposit!");
      return false;
    } else {
      $(".error").hide();
    }

    var newClient = Object.create(BankAccount);
    newClient.name = inputtedName;
    newClient.balance = inputtedFirstDeposit;

    $(".list-group").append("<a class='list-group-item client'>" + newClient.name + "</a>");

    $("input#account-name").val("");
    $("input#initial-deposit").val("");

    $(".list-group-item.client").last().click(function() {
      $("h3#client-balance").text("$" + (newClient.balance.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")));
    });

    $("form#manage-account").submit(function(event) {
      event.preventDefault();

      var inputtedDeposit = parseFloat($("input#deposit-amount").val().replace(/,/g, ''));
      var inputtedWithdraw = parseFloat($("input#withdraw-amount").val().replace(/,/g, ''));

      newClient.deposit(inputtedDeposit);
      newClient.withdraw(inputtedWithdraw);

      $("input#deposit-amount").val("");
      $("input#withdraw-amount").val("");

      $("h3#client-balance").text("$" + (newClient.balance.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")));
    });
  });
});
