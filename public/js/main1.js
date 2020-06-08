$(document).ready(function () {
    var currentTab = 0;

    function disableButton(el, index) {
        var btnNext = document.getElementsByClassName(btnNext);
        var custom = document.getElementsByClassName('custom-input');
        console.log(el.value, index);
        if (custom[0].value != '') {
            console.log('hello');
        }
    }
    function addEvent() {
        var custom = document.getElementsByClassName('custom-input');
        var btnNext = document.getElementsByClassName('btn-next');

        for (let index = 0; index < custom.length; index++) {
            custom[index].addEventListener("change", function (e) {
                eventNext(custom[index]);
            });
        }
    }

    function eventNext(el) {
        if (el) {
            var custom = document.getElementsByClassName('custom-input');

            var btnNext = document.getElementsByClassName('btn-next');
            btnNext[0].removeAttribute('disabled');
            btnNext[0].addEventListener('click', () => {
                nextPrev(1)
            })
        }
        if (el.value == 0) {
            btnNext[0].setAttribute('disabled', true);
        }
        else {
            if (el.value != 0) {
            }
        }
    }
    function showTab(n) {
        if (n === false) {
        }
        else {
            var btnNext = document.getElementsByClassName('btn-next');
            var tab = document.getElementsByClassName('tab');
            // console.log(n);
            if (n != 0) {
                btnNext[0].setAttribute('disabled', true);
            }
            if (n == tab.length - 1) {
                btnNext[0].innerHTML = "Registrar"
            }
            var x = document.getElementsByClassName("tab");
            x[n].style.display = "block";
            // console.log(x, n);
            fixStepIndicator(n)
        }
    }

    function fixStepIndicator(n) {
        var i, x = document.getElementsByClassName("step");
        for (i = 0; i < x.length; i++) {
            x[i].className = x[i].className.replace(" active", "");
        }
        x[n].className += " active";
    }

    function nextPrev(n) {
        var x = document.getElementsByClassName("tab");
        console.log(x.length, currentTab, x[currentTab]);
        if (x[currentTab].style.display != undefined) {
            x[currentTab].style.display = "none";
        } else {
        }
        currentTab = currentTab + n;
        if (currentTab >= x.length) {
            formSubmit();
            showTab(false);
        }
        showTab(currentTab);
    }

    function init() {
        showTab(currentTab); 
        addEvent();
    }

    function formSubmit() {
        var toner = document.getElementById('Toner');
        var quantity = document.getElementById('Quantity');
        var form = document.getElementById('regForm');

        swal({
            title: `¿Estas seguro?`,
            text: `Registrar ${quantity.value} unidades, ${toner.value}`,
            icon: "warning",
            buttons: ["Cancelar", true],
        }).then((value) => {
            if (value) form.submit();
            else location.reload();
        }); 
    }

    function search(nameKey, myArray){
        for (var i=0; i < myArray.length; i++) {
            if (myArray[i].TonerModel === nameKey) {
                return myArray[i];
            }
        }
    }
    init();
});

