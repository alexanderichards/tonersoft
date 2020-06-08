$(document).ready(function () {
    $('#myTable').DataTable({
        dom: 'Bfrtip',
        columns: [
            { data: 'TonerModel' },
            { data: 'Quantity' },
        ],
        order : [[ 1, "desc" ]],
        buttons: [
            'copy', 'csv', 'excel', 'pdf', 'print'
        ],
    });
}); 