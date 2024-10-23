// ==UserScript==
// @name         Auto Detect Position Frame
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  Tự động kiểm tra và tìm iframe và div position_frame mỗi khi người dùng tải trang
// @author       Phạm Dũng
// @match        *://*/*    // Điều chỉnh URL này theo trang web cụ thể của bạn
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    function tryGetPositionFrame() {
        let iframe = document.querySelector('iframe[name="iframe1"]');
        if (iframe) {
            let iframeDocument = iframe.contentDocument || iframe.contentWindow.document;
            let positionFrame = iframeDocument.getElementById('position_frame');

            if (positionFrame) {
                console.log("position_frame đã được tìm thấy:", positionFrame);
                positionFrame.style.overflowX = 'auto'; // Thêm cuộn ngang
                positionFrame.style.whiteSpace = 'nowrap'; // Giữ tất cả các phần tử trên một dòng
                // Thực hiện các thao tác với positionFrame
                clearInterval(intervalID);  // Dừng kiểm tra khi đã tìm thấy
            } else {
                console.log("Chưa tìm thấy position_frame, đang kiểm tra lại...");
            }
        }
    }

    // Lặp lại việc kiểm tra mỗi 500ms cho đến khi tìm thấy position_frame
    let intervalID = setInterval(tryGetPositionFrame, 500);
})();
