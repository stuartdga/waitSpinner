"use strict";

var hideWaitSpinner = function () {
    var div = getSpinner();

    if (div) {
        div.style.display = "none";
        div.style.zIndex = -1;
        div = getSpinnerOverlay();
        if (div) {
            div.style.display = "none";
        }
    }

    else {
        counter--;
        console.log("Unable to find Spinner. Trying again");
        setTimeout(function () {
            hideWaitSpinner();
        }, 2000)
    }

}

var showWaitSpinner = function () {
    updateWaitSpinner();
    var div = getSpinner();
    if (div) {
        div.style.display = "block";
        div.style.zIndex = 999;
        div = getSpinnerOverlay();
        if (div) {
            div.style.display = "block";
        }
    }
    else {
        console.log("Cannot show wait indicator");
    }
};

var updateWaitSpinner = function () {
    var spinner = getSpinner();
    if (spinner) {
        var contentDev = document.getElementById('wait-spinner');
        if (contentDev) {
            spinner.style.top = calculateSpinnerPosition(contentDev) + 'px';
        }
    }
};

var getSpinner = function () {
    var spinners = document.querySelectorAll('.wait-spinner');
    if (spinners.length === 0) {
        console.log("No spinner found");
    } else {
        return spinners[0];
    }
    return undefined;
};

var getSpinnerOverlay = function () {
    var spinnerOverlays = [];
    spinnerOverlays = document.querySelectorAll('.wait-spinner-overlay');

    if (spinnerOverlays.length === 0) {
        console.log("No spinner overlay found");
    } else {
        return spinnerOverlays[0];
    }
    return undefined;
};

var calculateSpinnerPosition = function (containerDiv) {
    var spinnerTargetPosition = 0.3; // 30% from the top
    var divTop = getElementPosition(containerDiv).y;
    var pageTop = window.pageYOffset;
    var windowHeight = window.innerHeight;
    var divHeight = containerDiv.offsetHeight;
    var divBottom = divTop + divHeight;
    var pageBottom = pageTop + windowHeight;
    var waitSpinnerTop;

    waitSpinnerTop = (Math.min(divBottom, pageBottom) - Math.max(divTop, pageTop)) * spinnerTargetPosition + Math.max(0, pageTop - divTop);

    if (waitSpinnerTop < 0)
        waitSpinnerTop = 0;
    else if (waitSpinnerTop > divHeight) // it should really be (waitSpinnerTop > divHeight - spinnerHeight) but spinnerHeight is not known until the spinner is shown on the screen
        waitSpinnerTop = divHeight; // should be waitSpinnerTop = divHeight - spinnerHeight

    return waitSpinnerTop;
};

var getElementPosition = function (el) {
    // yay readability
    for (var lx = 0, ly = 0;
        el != null;
        lx += el.offsetLeft, ly += el.offsetTop, el = el.offsetParent);
    return { x: lx, y: ly };
};