// ==UserScript==
// @name         YORGIE!
// @updateURL    https://raw.githubusercontent.com/vincent-coding/YORGIE/master/YORGIE.user.js
// @downloadURL  https://raw.githubusercontent.com/vincent-coding/YORGIE/master/YORGIE.user.js
// @version      1.0
// @description  The best cheating client for yorg.io!
// @author       VCoding
// @match        https://yorg.io/*
// @grant        none
// ==/UserScript==

const version = "1.0";
var selectNumber = null;
const skills = ["base", "cannonDamage_0", "cannonDamage_1", "cannonDamage_2", "cannonDamage_3", "cannonDamage_4", "cannonDamage_5", "cannonDamage_6", "cannonDamage_7", "cannonDamage_8", "cannon_feature_double_dmg", "damage_0", "damage_1", "damage_2", "damage_3", "damage_4", "damage_circle_l", "damage_circle_tl", "damage_circle_bl", "damage_circle_tr", "damage_circle_br", "damage_circle_r", "damage_circle_center", "crit_0", "crit_1", "crit_2", "crit_3_t", "crit_3_b", "crit_3_r", "crit_n_damage", "crit_4", "crit_5", "crit_n_damage_1", "double_crit_feature", "crit_initial", "factorySpeed_0", "factorySpeed_1", "factorySpeed_2", "factorySpeed_3_u", "factorySpeed_3_b", "factorySpeed_3_rl", "factorySpeed_3_ru", "factorySpeed_3_t", "factorySpeed_4", "factoryFeatureSpeed", "minersSpeed_0", "transporterFeatureInvisible", "transporterSpeed_0", "transporterSpeed_1", "transporterSpeed_2", "transporterSpeed_3_l", "transporterSpeed_3_lm", "transporterSpeed_3_r", "transporterSpeed_3_rm", "transporterSpeed_3_t", "transporterSpeed_3_c", "transporterFeatureGlobal", "minersSpeed_1", "minersSpeed_2", "minersSpeed_3", "minersSpeed_4_br", "minersSpeed_4_tr", "minersSpeed_4_bl", "minersSpeed_4_tl", "minersSpeed_4_top", "minersSpeed_4_inner", "minersSpeed_5", "minersSpeed_6", "minersRadius_feature1", "minersSpeed_7", "minersSpeed_8", "minersRadius_feature2", "buildingStorage_0", "buildingStorage_1", "buildingStorage_2", "buildingStorage_3", "buildingStorage_4", "buildingStorageDouble", "arrowDamage_0", "arrowDamage_1", "arrowFireRate_0", "arrowFireRate_1", "arrowRadius_0", "arrowDamage_2", "arrowRadius_1", "arrowDamage_3", "arrowRadius_2", "arrowRadius_3", "arrowFeatureDoubleDamage", "lightningDamage_0", "lightningRadius_0", "lightningDamage_1", "lightningRadius_1", "lightningDamage_2", "lightningDamageRadius_0", "lightningDamage_3", "lightningRadius_2", "lightningRadius_3", "lightningFeatureCrit", "health_0", "health_1", "health_2", "health_3", "health_4", "health_circle_br", "health_circle_bl", "health_circle_tr", "health_circle_tl", "health_circle_l", "health_circle_center", "health_5", "health_6", "health_regen_feature", "wallHealth_0", "wallHealth_1", "wallHealth_2", "wallHealth_3", "wallHealth_4", "wallHealth_5", "wallHealth_6", "wallHealthSub_1", "wallHealthSub_2", "wallHealth_7", "wallHealthFeatureMiss"];

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
            html: `Which cheat code would you like to access?<br><br>1 - Change the number of gems<br>2 - Change the number of skill points<br>3 - Change the time for the level<br>4 - Unlock all skills`,
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
            if(value.value == "4") {
                showDialog4();
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

        function showDialog4() {
            swal.fire({
                titleText: "YORGIE!",
                html: `Are you sure you want to unlock all the skill?<br>(This action is irreversible!)`,
                icon: "question",
                showCloseButton: true,
                showCancelButton: true,
                showConfirmButton: true,
                cancelButtonText: 'No',
                confirmButtonText: 'Yes',
            }).then((value) => {
                if(value.isDismissed == true) { return; }
                try {
                    skills.forEach(element => window.mouseTracker.onMouseMove._bindings[0].context.root.gameSystems.root.stats.unlockSkill(element))
                    showSuccess("All the skills have been unlocked!");
                } catch(e) {
                    showSuccess("A mistake has been made!");
                    console.log(e)
                }
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
