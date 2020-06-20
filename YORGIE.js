// ==UserScript==
// @name         YORGIE!
// @version      1.0
// @description  The best cheating client for yorg.io!
// @author       VCoding
// @match        https://yorg.io/*
// @grant        none
// ==/UserScript==

const version = "1.0";
var selectNumber = null;

(function() {
    /* INJECTION */
    var sweetalert = document.createElement('script');
    sweetalert.setAttribute("type","text/javascript");
    sweetalert.setAttribute("src", "https://cdn.jsdelivr.net/npm/sweetalert2@9/dist/sweetalert2.min.js");
    document.getElementsByTagName("head")[0].appendChild(sweetalert);
    var sweettheme = document.createElement('link');
    sweettheme.setAttribute("rel","stylesheet");
    sweettheme.setAttribute("href", "https://cdn.jsdelivr.net/npm/@sweetalert2/theme-dark@3/dark.css");
    document.getElementsByTagName("head")[0].appendChild(sweettheme);

    /* FUNCTION */
    function showSuccess(text) {
        const Toast = Swal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            onOpen: (toast) => {
                toast.addEventListener('mouseenter', Swal.stopTimer)
                toast.addEventListener('mouseleave', Swal.resumeTimer)
            }
        })
        Toast.fire({
            icon: 'success',
            titleText: text
        })
    }

    function showError(text) {
        const Toast = Swal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            onOpen: (toast) => {
                toast.addEventListener('mouseenter', Swal.stopTimer)
                toast.addEventListener('mouseleave', Swal.resumeTimer)
            }
        })
        Toast.fire({
            icon: 'error',
            titleText: text
        })
    }

    function openMenu() {
        swal.fire({
            titleText: "YORGIE!",
            html: `Which cheat code would you like to access?<br><br>1 - Change the number of gems<br>2 - Change the number of skill points<br>3 - Change the time for the level`,
            input: 'number',
            icon: "question",
            showCloseButton: true,
            showCancelButton: true,
            showConfirmButton: true,
            cancelButtonText: 'Cancel',
            confirmButtonText: 'Access',
            inputPlaceholder: 'Enter a number...'
        }).then((value) => {
            if(value.isDismissed == true) { return; }
            if(value.value == "" || value.value == null) { return }
            if(value.value == "1") {
                showDialog1();
                return;
            }
            if(value.value == "2") {
                showDialog2();
                return;
            }
            if(value.value == "3") {
                showDialog3();
                return;
            }
            showError("The value you entered is incorrect!");
        });

        function showDialog1() {
            swal.fire({
                titleText: "YORGIE!",
                html: `How many gems do you want to add?`,
                input: 'number',
                icon: "question",
                showCloseButton: true,
                showCancelButton: true,
                showConfirmButton: true,
                cancelButtonText: 'Cancel',
                confirmButtonText: 'Add',
            }).then((value) => {
                if(value.isDismissed == true) { return; }
                try {
                    window.mouseTracker.onMouseMove._bindings[0].context.root.gameSystems.root.stats.gems += value.value;
                    showSuccess("You have successfully received the gems!");
                } catch(e) {
                    showSuccess("A mistake has been made!");
                    console.log(e)
                }
            });
        }

        function showDialog2() {
            swal.fire({
                titleText: "YORGIE!",
                html: `How many skill points do you want to have?`,
                input: 'range',
                inputAttributes: {
                    min: 1,
                    max: 500,
                    step: 1
                },
                inputValue: 250,
                icon: "question",
                showCloseButton: true,
                showCancelButton: true,
                showConfirmButton: true,
                cancelButtonText: 'Cancel',
                confirmButtonText: 'Add',
            }).then((value) => {
                if(value.isDismissed == true) { return; }
                try {
                    window.mouseTracker.onMouseMove._bindings[0].context.root.gameSystems.root.stats.points += value.value;
                    showSuccess("You have successfully received the gems!");
                } catch(e) {
                    showSuccess("A mistake has been made!");
                    console.log(e)
                }
            });
        }

        function showDialog3() {
            swal.fire({
                titleText: "YORGIE!",
                html: `Sorry but this option is not yet available!`,
                icon: "info",
                showCloseButton: true,
                showCancelButton: false,
                showConfirmButton: true,
                confirmButtonText: 'Add',
            });
        }
    };

    /* SCRIPT */
    document.getElementById("external_ad").remove();
    document.getElementById("welcome_ad").remove();
    document.getElementById("welcome_ad_right").remove();
    document.getElementById("footer").innerHTML += `<h2>YORGIE! - ${version} | Created by VCoding</h2>`;
    document.getElementById("report_bug_button").removeAttribute("data-translate");
    document.getElementById("report_bug_button").removeAttribute("onclick");
    document.getElementById("report_bug_button").innerHTML = "Open the menu of YORGIE!";
    document.getElementById("report_bug_button").onclick = openMenu;
    document.querySelector("#devlog_inner div").removeAttribute("onclick");
    document.querySelector("#devlog_inner div h2").removeAttribute("data-translate");
    document.querySelector("#devlog_inner div h2").innerHTML = "YORGIE! - " + version;
    document.querySelector("#devlog_inner img").remove();
    document.querySelector(".desc").remove();
    document.querySelector("#devlog_inner div").innerHTML += `
<span class="desc">
    <span>
        Thank you for choosing YORGIE!<br>
        If you like the software you can make me a donation :)
    </span>
    <br>
    <a href="#" target="_BLANK">
        <span>Buy Me A Coffee<span>
    </a>
</span>
`;
})();
