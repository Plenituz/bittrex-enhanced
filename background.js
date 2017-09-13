// Copyright (c) 2011 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

const INITED = '✓';
const NOTINITED = '×';
const TRADING_VIEW_DEFAULT_OPTIONS = {
    width: '100%',
    height: 550,
    interval: 30,
    timezone: 'America/New_York',
    theme: 'Light',
    style: 1,
    locale: 'en',
    enable_publishing: false,
    withdateranges: true,
    studies: [],
    hide_side_toolbar: false,
    show_popup_button: true,
    popup_width: 1000,
    popup_height: 650,
    allow_symbol_change: true,
    hideideas: true
};

browser.browserAction.setBadgeBackgroundColor({'color':'#0072ed'});
browser.browserAction.setBadgeText({text: NOTINITED});

browser.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        if (request.processing){
            browser.browserAction.setBadgeText({text:INITED});
            const settings = {};
            browser.storage.local.get([
                'bittrex-enhanced-tvChart', 
                'bittrex-enhanced-usdVal', 
                'bittrex-enhanced-tvChartOpts'
            ], function(data) {
                settings.tvChart = data['bittrex-enhanced-tvChart'];
                settings.usdVal = data['bittrex-enhanced-usdVal'];
                settings.tradingViewOpts = data['bittrex-enhanced-tvChartOpts'] || {};
                sendResponse(settings);
            });
        }
        return true;
    }
);

// Settings
browser.storage.local.get([
    'bittrex-enhanced-usdVal',
    'bittrex-enhanced-tvChart',
    'bittrex-enhanced-tvChartOpts'
], function(data) {
    if(!data['bittrex-enhanced-usdVal']){
        browser.storage.local.set({'bittrex-enhanced-usdVal': true});
    }
    if(!data['bittrex-enhanced-tvChart']){
        browser.storage.local.set({'bittrex-enhanced-tvChart': true});
    }
    if(!data['bittrex-enhanced-tvChartOpts']){
        browser.storage.local.set({'bittrex-enhanced-tvChartOpts': TRADING_VIEW_DEFAULT_OPTIONS})
    }
});
