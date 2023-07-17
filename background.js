console.log("This is the background script");
function get_rule(i, domain, type) {
    if (type === 'url_filter') {
      return {
        id: i,
        priority: 2,
        action: { "type": "block" },
        condition: {
          urlFilter: domain,
          resourceTypes: ["main_frame", "image","video"],
        }
      };
    } else if (type === 'reg_filter') {
      return {
        id: i,
        priority: 2,
        action: { "type": "block" },
        condition: {
          regexFilter: domain,
          resourceTypes: [ "main_frame", "image","video"],
        }
      };
    }
  }
  
  chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
    if (message.action === 'blockAll') {
      const rule = {
        "id": 1,
        "priority": 3,
        "action": {
          "type": "block"
        },
        "condition": { "resourceTypes": ["main_frame", "image","video"] }
      };
  
      chrome.declarativeNetRequest.getDynamicRules(function(currentRules) {
        let ruleIds = currentRules.map(rule => rule.id);
        let ruleUpdate = {
          removeRuleIds: ruleIds,
          addRules: [rule]
        };
        chrome.declarativeNetRequest.updateDynamicRules(ruleUpdate);
      });
    }
    
});
  
  async function add_updte_rules(active = true) {
    console.log('changing rules');
    let rules = [];
    let c_i = 0;
    for (let key in rules_list){
        let type = key;
        let r = rules_list[key];
        for (var i = 0; i< r.length; i++) {
          rules.push(get_rule(c_i+i+1,r[i],type));
        }
        c_i+=r.length;
      }
      rules.push(
      {
        "id":c_i+1,
        "priority": 3,
        "action": {
          "type": "modifyHeaders",
          "responseHeaders": [
            { "header": "X-Frame-Options", "operation": "remove" },
            { "header": "Frame-Options", "operation": "remove" },
            { "header": "Content-Security-Policy", "operation": "remove" }
          ],
          "requestHeaders":[
            { "header": "sec-fetch-dest", "operation": "set", "value": "document" }
          ]
        },
        "condition": { "resourceTypes": ["main_frame","sub_frame","script"] }
      });
  }
    // rules.push(get_rule(c_i + 1, "*", 'url_filter'));
    rules.push(get_rule(c_i + 2, "*mercury.akamaized.net*", 'url_filter'));
    rules.push(get_rule(c_i + 3, "*doubleclick.net*", 'url_filter'));
  
    chrome.declarativeNetRequest.getDynamicRules(cb);
    function cb(rule) {
      let ids = rule.map(i => i.id);
      let final = { removeRuleIds: ids };
      if (active) final.addRules = rules;
      chrome.declarativeNetRequest.updateDynamicRules(final);
    }
  

  