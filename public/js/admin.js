$(document).ready(function () {
    let form = document.getElementsByClassName('delform');
    let formadd = document.getElementById('formadd');
    let btnsend = document.getElementById('btnSend');
    let inputToner = document.getElementById('inputToner');
    let resp = document.getElementById('resp');

    inputToner.addEventListener('input', checkData);

    for (let index = 0; index < form.length; index++) {
        const element = form[index];
        element.addEventListener('click', (e) => {
            e.preventDefault();
            swal({
                title: `¿Estas seguro de eliminar toner?`,
                text: `Esta accion eliminara todos los registros relacionados a este toner`,
                icon: "warning",
                buttons: ["Cancelar", true],
            }).then((value) => {
                if (value) element.submit();
            });
        })
    }

    $('#myTable').DataTable({
        scrollY: "400px",
        // scrollX: true,
        scrollCollapse: true,
        paging: false,
        fixedColumns:   {
            heightMatch: 'none'
        }
    });

    btnsend.addEventListener('click', (e) => {
        e.preventDefault()
        console.log('hello');
        if (inputToner.value != '') {
            swal({
                title: `¿Estas seguro de agregar toner?`,
                icon: "warning",
                buttons: ["Cancelar", true],
            }).then((value) => {
                if (value) formadd.submit();
            });
        } else {
            swal({
                title: `El campo debe ser llenado`,
                icon: 'error',
                button: 'Ok',
            });
        }
    })

    function checkData() {
        btnsend.removeAttribute('disabled');
        $.ajax({
            url: "/tonersdata",
            data: { name: inputToner.value },
        }).done(function (result) {
            if (result == '') {
                resp.style.color = 'green'
                resp.innerHTML = 'No existe ningun modelo de toner con este nombre';
            }
            else {
                resp.style.color = 'red'
                resp.innerHTML = 'Este modelo ya esta registrado';
                btnsend.setAttribute('disabled', true);
            }
        });
    }
}); 