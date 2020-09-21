// Creiamo un calendario dinamico con le festività.
// Il calendario partirà da gennaio 2018 e si concluderà
// a dicembre 2018 (unici dati disponibili sull’API).
// Milestone 1
// Creiamo il mese di Gennaio, e con la chiamata all'API inseriamo le festività.


$(document).ready(function() {

  var dataInizio = moment("2018-12-01");
  var giorniMese = moment(dataInizio).daysInMonth();
  var month = dataInizio.format("M") - 1;

  $.ajax(
    {
      "url": "https://flynn.boolean.careers/exercises/api/holidays",
      "data": {
        "year": 2018,
        "month": month
      },
      "method": "GET",
      "success": function (data, stato) {
        printCalendar(dataInizio, giorniMese);
        printHoliday(data.response);
      },
      "error": function (richiesta, stato, errori) {
        console.log(errori);
      }
    }
  );
});

// FUNCTION

function printHoliday(holiday) {
  for (var i = 0; i < holiday.length; i++) {
    var festivitaData = holiday[i].date;
    var festivitaNome = holiday[i].name;
    $(".day[data-data=" + festivitaData + "]").addClass("holiday");
    $(".day[data-data=" + festivitaData + "] .holidayStyle").text(" - " + festivitaNome);
  }
}

function printCalendar(dataInizio, giorniMese) {
  $("h1").text(dataInizio.format("MMMM YYYY"));
  var source = $("#entry-template").html();
  var template = Handlebars.compile(source);
  for (var i = 1; i <= giorniMese; i++) {
    var giorno = i;
    if (giorno <= 9) {
      giorno = "0" + giorno;
    }
    var data = moment(dataInizio).format("YYYY") + "-" + moment(dataInizio).format("MM") + "-" + giorno;
    var context = {
      "giorno" : giorno,
      "mese" : moment(dataInizio).format("MMMM"),
      "data" : data
    };
    var html = template(context);
    $("#calendario").append(html);
  }
}
