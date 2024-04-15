let backdrop = document.getElementById("backdrop");
let currentSelector = null;

function showPreview(selectorEl) {
    if (!!currentSelector) {
        hidePreview(currentSelector);
    }
    currentSelector = selectorEl;
    let viewportRect = selectorEl.parentElement.getBoundingClientRect();
    let width = 1000;
    let height = 600;
    let translateX = document.documentElement.clientWidth / 2 - (viewportRect.left + viewportRect.width / 2);
    let translateY = document.documentElement.clientHeight / 2 - (viewportRect.top + viewportRect.height / 2);
    let scaleX = width / viewportRect.width;
    let scaleY = height / viewportRect.height;
    selectorEl.style.setProperty("--modal-translate-x", `${translateX}px`);
    selectorEl.style.setProperty("--modal-translate-y", `${translateY}px`);
    selectorEl.style.setProperty("--modal-scale-x", `${scaleX}`);
    selectorEl.style.setProperty("--modal-scale-y", `${scaleY}`);
    selectorEl.style.zIndex = "10";
    selectorEl.classList.add("active");
    backdrop.classList.add("active");
}

function hidePreview(selectorEl) {
    selectorEl.style.translate = null;
    selectorEl.style.scale = null;
    selectorEl.classList.remove("active");
    backdrop.classList.remove("active");

    selectorEl.ontransitionend = () => {
        if (!selectorEl.classList.contains("active"))
            selectorEl.style.zIndex = "0";
        selectorEl.style.transitionend = null;
    }
}

let selectors = document.getElementsByClassName("selector");
for (let selector of selectors) {
    selector.onclick = () => {
        if (selector.classList.contains("active"))
            hidePreview(selector);
        else
            showPreview(selector);
    }
}

backdrop.onclick = () => {
    if (!!currentSelector) {
        hidePreview(currentSelector);
    }
}