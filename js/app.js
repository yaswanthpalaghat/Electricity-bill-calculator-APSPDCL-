function bill_cal() {
    var tariff = {
        0: [1, 50, 50, 1.45],
        1: [51, 75, 75, 2.60],
        2: [76, 100, 100, 2.60],
        3: [101, 200, 200, 3.60],
        4: [201, 400, 400, 6.90],
        5: [401, 600, 600, 6.90],
        6: [601, 10000000000000000, 10000000000000000, 6.90]
    };
    var result = [];
    var unit = parseFloat($("#unit").val());
    if (unit > 0) {
        $("#display-table").show();
    } else {
        $("#display-table").hide();
    }
    var i = (unit > 50) ? 1 : 0;
    var loop = true;
    var diff = 0;
    var total = 0;
    $("#display-range").html("");
    $("#display-total").html("");

    while (tariff[i][2] < unit) {
        diff = tariff[i][1] - tariff[i][0] + 1;
        unit = unit - diff;
        result[i] = [diff, tariff[i][3], (diff * tariff[i][3]).toFixed(2)];
        to = (tariff[i][1] == 10000000000000000) ? '&infin;' : tariff[i][1];
        $("#display-range").append("<tr><td>" + tariff[i][0] + "-" + to + "</td><td>" + result[i][1] + "</td><td>" + result[i][0] + "</td><td>" + result[i][2] + "</td></tr>");
        total = parseFloat(total) + parseFloat(result[i][2]);
        i++;
    }
    if (unit > 0) {
        diff = tariff[i][1] - tariff[i][0] + 1;
        diff = (unit >= tariff[i][1]) ? unit - diff : unit;
        result[i] = [diff, tariff[i][3], (diff * tariff[i][3]).toFixed(2)];
        to = (tariff[i][1] == 10000000000000000) ? '&infin;' : tariff[i][1];
        $("#display-range").append("<tr><td>" + tariff[i][0] + "-" + to + "</td><td>" + result[i][1] + "</td><td>" + result[i][0] + "</td><td>" + result[i][2] + "</td></tr>");
        total = parseFloat(total) + parseFloat(result[i][2]);
    }
    
    gtotal = parseFloat(total);
    gtotal = gtotal.toFixed(2);
    $("#display-total").append("<tr><td></td><td></td><td>Bill</td><td>" + total + "</td></tr>");
    $("#display-total").append("<tr><td></td><td></td><td>VAT</td><td>" + vat + "</td></tr>");
    $("#display-total").append("<tr><td></td><td></td><td>G. Total</td><td>" + gtotal + "</td></tr>");
}
$("#unit").on('keyup keydown change', bill_cal);