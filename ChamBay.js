
// ==UserScript==
// @name         Auto Detect Position Frame
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  Tự động kiểm tra và tìm iframe và div position_frame trên mọi trang, bao gồm các trang với địa chỉ IP
// @author       Bạn
// @match        http://10.0.0.189:8080/*
// @match        http://172.16.10.247:8080/*
// @grant        none
// ==/UserScript==
'use strict';
let intervalID; // Khai báo intervalID trước

function tryGetPositionFrame() {
    let iframe = document.getElementsByName('iframe1')[0];

    if (iframe) {
        // Kiểm tra xem iframe đã tải xong hay chưa
        if (iframe.contentDocument || iframe.contentWindow.document) {
            let iframeDocument = iframe.contentDocument || iframe.contentWindow.document;
            let positionFrame = iframeDocument.getElementById('position_frame');
            let leftArea = iframeDocument.getElementById('left-area');
            let pay_diagram = iframeDocument.getElementById('pay_diagram');
            let colMd3 = iframeDocument.querySelector('.col-md-3.p-0');
            if (pay_diagram && leftArea && positionFrame) {
                console.log("leftArea đã được tìm thấy:", leftArea);
                pay_diagram.style.overflowX = 'auto'; // Thêm cuộn ngang
                pay_diagram.style.whiteSpace = 'nowrap'; // Giữ tất cả các phần tử trên một dòng
                //pay_diagram.style.width = '500px';

                //positionFrame.style.overflowX = 'auto'; // Thêm cuộn ngang
                //positionFrame.style.whiteSpace = 'nowrap'; // Giữ tất cả các phần tử trên một dòng
                positionFrame.style.width = pay_diagram.offsetWidth + 'px';

                //positionFrame.style.marginLeft = '25%';
                if(colMd3){
                    leftArea.style.width = colMd3.offsetWidth + 'px';
                }
                //pay_diagram.style.marginLeft = (leftArea.offsetWidth + 20) + 'px';
                //positionFrame.style.maxWidth = '70%';
                //leftArea.style.width = '25%'
                // Thực hiện các thao tác với positionFrame
                // Dừng kiểm tra khi đã tìm thấy
                clearInterval(intervalID);
            } else {
                console.log("Chưa tìm thấy position_frame, đang kiểm tra lại...");
            }
        } else {
            console.log("Iframe chưa tải xong.");
        }
    } else {
        console.log("Iframe không tồn tại.");
    }
}

// Kiểm tra iframe có tải xong chưa và chạy mã sau khi iframe đã tải xong
function runScriptAfterIframeLoaded() {
    let iframe = document.getElementsByName('iframe1')[0];

    if (iframe) {
        // Thêm sự kiện onload vào iframe
        iframe.onload = function() {
            console.log("Iframe đã tải xong.");
            // Sau khi iframe tải xong, bắt đầu quá trình kiểm tra position_frame
            intervalID = setInterval(tryGetPositionFrame, 500);
        };
    } else {
        console.log("Không tìm thấy iframe.");
    }
}

// Gọi hàm để bắt đầu kiểm tra khi iframe đã sẵn sàng
runScriptAfterIframeLoaded();

