$(document).ready(function () {
    $('#myTable').DataTable({
        order : [[ 2, "desc" ]],
        createdRow: function (row, data, dataIndex) {
            let datecol = $(row).children('td:nth-child(3)');
            let dateval = datecol.html();
            dateval = dateval.substr(0, 25);
            datecol.html(dateval);
            let children = $(row).children('td:last-child').html();
            if(children == "Ingreso"){
                $(row).addClass('ingresorow');
            }
            if(children == "Retiro"){
                $(row).addClass('retirorow');
            }
        }
    });
}); 