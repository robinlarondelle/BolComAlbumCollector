// ==UserScript==
// @name         Bol.com Album Collector
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Adds Album data to database
// @author       You
// @match        https://www.bol.com/*
// @icon         https://www.google.com/s2/favicons?domain=bol.com
// @grant        none
// ==/UserScript==

(function () {
    'use strict';
    var meta = document.createElement('meta');
    meta.httpEquiv = "Content-Security-Policy" ;
    meta.content = `default-src * 'unsafe-inline' 'unsafe-eval'; script-src * 'unsafe-inline' 'unsafe-eval'; connect-src * 'unsafe-inline'; img-src * data: blob: 'unsafe-inline'; frame-src *; style-src * 'unsafe-inline';`
    document.getElementsByTagName('head')[0].appendChild(meta);

    addButtons()

    document.body.addEventListener('click', () => {
        setTimeout(() => {
            addButtons()
        }, 500);
    })



})();

function addButtons() {
    let productItemRows = document.querySelectorAll(".product-item--row")
    productItemRows.forEach(product => {
        let productSpecs = product.querySelector(".product-small-specs")
        let productText = productSpecs.firstElementChild.firstElementChild.innerHTML.toLowerCase()

        if (productText.startsWith("lp") || productText.includes("lp") || productText.includes("vinyl")) {
            let buyBlock = product.querySelector(".product-item__options")

            if (!buyBlock.lastElementChild.classList.contains("wishlist-button")) {
                let button = document.createElement("button")
                button.textContent = "+ wenslijst"
                button.style.background = "green"
                button.style.paddingTop = '5px'
                button.style.paddingBottom = '5px'
                button.style.paddingRight = '15px'
                button.style.paddingLeft = '15px'
                button.style.borderRadius = '15px'
                button.style.fontSize = '16px'
                button.style.color = 'white'
                button.style.marginTop = '15px'
                button.classList.add("wishlist-button")
                button.onclick = addAlbumToExcel

                buyBlock.appendChild(button)
            }
        }
    })
}

function addAlbumToExcel() {
    console.log('+ wenslijst clicked')

    const url = "http://127.0.0.1:5000"
    const data = {
        artist: "bruno mars",
        album: "grenade",
        link: "dummy link"
    }

    fetch(url, {
        method: "POST",
        mode: "same-origin",
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': 'Same-Origin'
        },
        body: JSON.stringify(data)
    })
        .then(response => {
            if (response.status == 200) console.log("album added")
        })


}