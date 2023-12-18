/* globals jQuery, $, waitForKeyElements */
// ==UserScript==
// @name         小红书网页爬取id和标题
// @version      0.1
// @namespace    http://tampermonkey.net/
// @description  xiaohongshuBurst
// @author       OrlosZiming
// @match        http*://www.xiaohongshu.com/explore*
// @icon         data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==
// @grant        none
// @require      http://code.jquery.com/jquery-3.x-git.min.js
// @license MIT
// @downloadURL https://update.greasyfork.org/scripts/458677/%E5%B0%8F%E7%BA%A2%E4%B9%A6%E6%8F%90%E5%8F%96%E6%96%87%E7%AB%A0%E9%85%8D%E5%9B%BE.user.js
// @updateURL https://update.greasyfork.org/scripts/458677/%E5%B0%8F%E7%BA%A2%E4%B9%A6%E6%8F%90%E5%8F%96%E6%96%87%E7%AB%A0%E9%85%8D%E5%9B%BE.meta.js
// ==/UserScript==
(function() {
    'use strict';
    window.onload = function() {
        // 设置通用IP地址前缀
        var articleUrl = "https://www.xiaohongshu.com";

        // 获取作者名及跳转连接
        var authorNameHref = articleUrl + $("a.name:first").attr("href");
        var authorNameText = $("a.name:first").text();

        var intervalId;

        var articleData = {}; // 存储多个标题和链接的对象
// 自动下拉页面
        var scrollHeight = document.body.scrollHeight;
        var currentScroll = 0;
        var scrollStep = 1000; // 每次滚动的步长
        var scrollInterval = 1000; // 每次滚动的时间间隔

        function autoScroll() {
            console.log("down!"+currentScroll)
                window.scrollTo(0, currentScroll);
                currentScroll += scrollStep;
        }

        // 开始自动下拉

        function getArticleInfo() {
            // 获取笔记时间
            var articleDate = $("div.date").text();
            articleDate = articleDate.replace(/-/g,'/');

            // 遍历每个文章元素
            $(".title").each(function(index, element) {
                // 获取笔记标题
                var articleTitle = $(element).text();

                // 获取笔记链接
                var articleLink = $(element).attr("href");

                // 获取文章ID
                var articleId = articleLink.split("/").pop();

                // 将标题和链接存储到对象中
                articleData[articleId] = articleTitle;

                // 输出当前标题和链接的键值对到控制台
                console.log(articleId + ": " + articleTitle);

                // 将当前标题和链接的键值对添加到新窗口的内容中
                $(myWindow.document.body).append('<div>' + articleId + ': ' + articleTitle + '</div>');

                autoScroll();
            });
        }

        // 开始定时获取笔记信息
        intervalId = setInterval(getArticleInfo, 200);

        // 遍历配图
        $("div.note-scroller").before("<div id='img-location'></div>");
        $(".swiper-slide.zoom-in:not(.swiper-slide-duplicate)").each(function(i, item) {
            var style = $(item).attr('style');
            var url1 = style.replace('background-image: url("', '');
            var url = url1.replace('");', '');
            $("div#img-location").append("<a href='"+url+"'><image class='img' style='width: 100px;' src='"+url+"'></a>");
        });

        // 获取视频
        var videoSrc = $(".browser-player").attr("src");

        // 获取当前窗口的url
        let websiteNow = location.href;
        var loc = websiteNow.indexOf("?");
        if (loc != -1) {
            websiteNow = websiteNow.substr(0, loc);
        }

        // 打开新窗口
        var myWindow = window.open("", "MsgWindow");

        // 将作者名、文章时间、配图或视频、文章标题、内容写入新窗口
        $(myWindow.document.body).append(websiteNow);
        $(myWindow.document.body).append(
            '<div><a href="'+authorNameHref+'">'+authorNameText+'</a></div>' +
            '<div>'+articleDate+'</div>'
        );
        if ($(".browser-player").length > 0) {
            $(myWindow.document.body).append(
                '<div><a href="'+videoSrc+'">'+videoSrc+'</a></div>'
            );
        } else {
            $(myWindow.document.body).append(img);
        }
    };
})();
