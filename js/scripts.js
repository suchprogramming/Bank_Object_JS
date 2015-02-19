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
    var inputtedFirstDeposit = parseFloat($("input#initial-deposit").val());

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
      $(".error").text("No Negative or String Values as Initial Deposits!");
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
      $("h3#client-balance").text("$" + (newClient.balance.toFixed(2)));
    });

    $("form#manage-account").submit(function(event) {
      event.preventDefault();

      var inputtedDeposit = parseFloat($("input#deposit-amount").val());
      var inputtedWithdraw = parseFloat($("input#withdraw-amount").val());

      newClient.deposit(inputtedDeposit);
      newClient.withdraw(inputtedWithdraw);

      $("input#deposit-amount").val("");
      $("input#withdraw-amount").val("");

      $("h3#client-balance").text("$" + (newClient.balance.toFixed(2)));
    });
  });
});
