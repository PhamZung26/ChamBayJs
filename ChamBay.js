
// ==UserScript==
// @name         Auto Detect Position Frame
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  Tự động kiểm tra và tìm iframe và div position_frame trên mọi trang, bao gồm các trang với địa chỉ IP
// @author       PhamDung - 035.358.3260
// @match        http://10.0.0.189:8080/*
// @match        http://172.16.10.247:8080/*
// @grant        none
// ==/UserScript==
'use strict';
let intervalID; // Khai báo intervalID trước
let isUseStick = true;
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

                pay_diagram.style.width = '840px';

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

function setDivWidth() {

    let iframe = document.getElementsByName('iframe1')[0];

    if (iframe) {
        // Kiểm tra xem iframe đã tải xong hay chưa
        if (iframe.contentDocument || iframe.contentWindow.document) {
            let iframeDocument = iframe.contentDocument || iframe.contentWindow.document;
            // Tìm tất cả hàng (row) trong div #position_frame
            const rows = iframeDocument.querySelectorAll("#position_frame .row");


            // Kiểm tra có ít nhất một hàng để xử lý
            if (rows.length === 0) return;

            // Cập nhật chiều rộng cho từng cell-item là 65px
            rows.forEach(row => {
                const cells = row.querySelectorAll(".cell-item");
                cells.forEach(cell => {
                    // Đặt chiều rộng cố định cho mỗi ô
                    cell.style.width = "60px";
                    // Gỡ bỏ flex-basis
                    cell.style.flexBasis = "0";
                    cell.style.border = "2px solid #8be6fd";
                });
                    row.style.display = "flex";
                    row.style.flexWrap = "nowrap"; // Không cho phép xuống dòng
                    const totalWidth = (cells.length + 1) * 60 + 5; // 65px cho mỗi ô
                    row.style.width = `${totalWidth}px`;
                // Nếu hàng là .top_column, gán flex-wrap: nowrap
                if (row.classList.contains("top_column")) {
                    //row.style.position = "sticky";
                    //row.style.top = "0";
                    //row.style.zIndex = "11";
                    // Kiểm tra xem checkbox đã tồn tại chưa
                    if (!row.querySelector("#stickyCheckbox")) {
                        // Tạo checkbox cho chế độ sticky
                        const checkboxDiv = document.createElement("div");
                        const checkbox = document.createElement("input");
                        checkbox.type = "checkbox";
                        checkbox.id = "stickyCheckbox";
                        checkbox.checked = isUseStick; // Mặc định là checked
                        const label = document.createElement("label");
                        label.htmlFor = "stickyCheckbox";
                        label.innerText = "Chế độ sticky";

                        checkboxDiv.appendChild(checkbox);
                        checkboxDiv.appendChild(label);
                        checkboxDiv.style.width = "60px";
                        row.appendChild(checkboxDiv); // Thêm vào hàng
                        // Sự kiện cho checkbox
                        checkbox.addEventListener("change", () => {
                            isUseStick = checkbox.checked;
                        });
                    }
                } else {
                    const totalWidth = (cells.length + 1) * 60; // 65px cho mỗi ô
                    row.style.width = `${totalWidth}px`;
                }
                // Cố định div có class 'col-md-2 col-03 indexrow number-grid'
                const stickyDiv = row.querySelector('.col-md-2.col-03.indexrow.number-grid');
                if (stickyDiv) {
                    console.log(isUseStick);
                    if(isUseStick){
                        stickyDiv.style.width = "60px";
                        stickyDiv.style.flexBasis = "0";
                        stickyDiv.style.position = "sticky";
                        stickyDiv.style.right = "0";
                        stickyDiv.style.zIndex = "10";
                        stickyDiv.style.backgroundColor = "white"; // Có thể điều chỉnh màu nền

                    }else{
                        stickyDiv.style.width = "60px";
                        stickyDiv.style.flexBasis = "0";
                        stickyDiv.style.position = "";
                    }

                }
            });


        }
    }
}

// Kiểm tra và set chiều rộng liên tục sau mỗi nửa giây (500ms)
let intervalID2 = setInterval(setDivWidth, 500);


