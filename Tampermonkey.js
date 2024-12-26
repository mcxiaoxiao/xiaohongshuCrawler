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

// # 免责声明：
// # 1. 本脚本仅供学习和研究使用。使用本脚本进行任何商业活动、侵权行为或违反法律法规的行为，均由用户自行承担后果。
// # 2. 本脚本不保证对目标网站的访问不会造成任何损害或影响。用户在使用本脚本时，应遵守目标网站的使用条款和条件。
// # 3. 用户应自行负责确保其使用本脚本的行为不违反相关法律法规及目标网站的爬虫政策。
// # 4. 本脚本的作者不对因使用本脚本而导致的任何直接或间接损失、损害或责任承担任何责任。
// # 5. 建议用户在使用爬虫前，先查看目标网站的 robots.txt 文件，以了解其爬虫政策，并遵守相关规定。
// # 6. 本脚本不对数据的准确性、完整性或及时性提供任何保证。用户应自行验证所收集数据的可靠性。


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
            // 遍历每个包含指定 href 的链接元素
            $('a[href*="/explore/"]').each(function(index, element) {
                // 获取链接元素
                var linkElement = $(element);

                // 获取链接
                var articleLink = linkElement.attr("href");
                console.log("Link:", articleLink);

                // 提取 articleId
                var articleId = articleLink.replace('/explore/', '').split('?')[0];
                console.log("Article ID:", articleId);

                // 获取对应的标题元素
                var titleElement = linkElement.closest('div').find('.title');

                // 获取标题文本
                var articleTitle = titleElement.text();
                console.log("Title:", articleTitle);

                // 输出链接和标题
                console.log("Link:", articleLink, "Title:", articleTitle);

                // 将当前标题和链接的键值对添加到新窗口的内容中
                $(myWindow.document.body).append('<div>' + articleId + ': ' + articleTitle + '</div>');
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
