/*

Copyright (c) 2009 Juriy Zaytsev (kangax@gmail.com)

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

*/

// v. 0.1

var callbacks = (function() {
  
  function makeNamesXPath(items) {
    return '@name="' + items.join('" or @name="') + '"';
  };
  function makeIdsXPath(items) {
    return '@id="' + items.join('" or @id="') + '"';
  };
  function makeAttributesXPath(items) {
    return '@' + items.join(' or @');
  };
  
  var OBJECT_PROTOTYPE_PROPERTIES = [
    "toString",
    "toLocaleString",
    "valueOf",
    "hasOwnProperty",
    "isPrototypeOf",
    "propertyIsEnumerable",
    "constructor"
  ];
  
  var NODE_PROPERTIES = [
    "ELEMENT_NODE",
    "ATTRIBUTE_NODE",
    "TEXT_NODE",
    "CDATA_SECTION_NODE",
    "ENTITY_REFERENCE_NODE",
    "ENTITY_NODE",
    "PROCESSING_INSTRUCTION_NODE",
    "COMMENT_NODE",
    "DOCUMENT_NODE",
    "DOCUMENT_TYPE_NODE",
    "DOCUMENT_FRAGMENT_NODE",
    "NOTATION_NODE",
    "nodeName",
    "nodeValue",
    "nodeType",
    "parentNode",
    "childNodes",
    "firstChild",
    "lastChild",
    "previousSibling",
    "nextSibling",
    "attributes",
    "ownerDocument",
    "insertBefore",
    "replaceChild",
    "removeChild",
    "appendChild",
    "hasChildNodes",
    "cloneNode",
    "normalize",
    "isSupported",
    "namespaceURI",
    "prefix",
    "localName",
    "hasAttributes"
  ];
  
  var ELEMENT_PROPERTIES = [
    "tagName",
    "getAttribute",
    "setAttribute",
    "removeAttribute",
    "getAttributeNode",
    "setAttributeNode",
    "removeAttributeNode",
    "getElementsByTagName",
    "getAttributeNS",
    "setAttributeNS",
    "removeAttributeNS",
    "getAttributeNodeNS",
    "setAttributeNodeNS",
    "hasAttribute",
    "hasAttributeNS"
  ];
  
  var HTMLELEMENT_PROPERTIES = [
    "id",
    "title",
    "lang",
    "dir",
    "className"
  ];
  
  var HTMLFORMELEMENT_PROPERTIES = [
    "elements",
    "length",
    "name",
    "acceptCharset",
    "action",
    "enctype",
    "method",
    "target",
    "submit",
    "reset"
  ];
  
  var EVENTTARGET_PROPERTIES = [
    "addEventListener",
    "removeEventListener",
    "dispatchEvent"
  ];
  
  var DOML2EVENTS = [
    "onclick",
    "ondblclick",
    "onmousedown",
    "onmouseup",
    "onmouseover",
    "onmousemove",
    "onmouseout",
    "onkeypress",
    "onkeydown",
    "onkeyup",
    "onload",
    "onunload",
    "onabort",
    "onerror",
    "onresize",
    "onscroll",
    "onselect",
    "onchange",
    "onsubmit",
    "onreset",
    "onfocus",
    "onblur",
    "ondomfocusin",
    "ondomfocusout",
    "ondomactivate",
    "onsubtreemodified",
    "onnodeinserted",
    "onnoderemoved",
    "ondomnoderemovedfromdocument",
    "ondomnodeinsertedintodocument",
    "onattrmodified",
    "oncharacterdatamodified"
  ];
  
  // TODO: need to check mapping of these proprietary events to elements
  var MSHTML_EVENTS = [
    "onafterprint", "onafterupdate", "onbeforecopy", "onbeforecut", "onbeforeeditfocus", 
    "onbeforepaste", "onbeforeprint", "onbeforeunload", "onbeforeupdate", "onbounce", 
    "oncellchange", "oncontextmenu", "oncopy", "oncut", "ondataavailable", 
    "ondatasetchanged", "ondatasetcomplete", "ondrag", "ondragend", "ondragenter", 
    "ondragleave", "ondragover", "ondragstart", "ondrop", "onerrorupdate", 
    "onfilterchange", "onfinish", "onhelp", "onlosecapture", "onpaste", "onpropertychange", 
    "onreadystatechange", "onrowenter", "onrowexit", "onrowinserted", 
    "onrowsdelete", "onselectstart", "onstart", "onstop"
  ];
  
  var ELEMENTCSSINLINESTYLE_PROPERTIES = [
    "style"
  ];
  
  var DOCUMENT_PROPERTIES = [
    "doctype",
    "implementation",
    "documentElement",
    "createElement",
    "createDocumentFragment",
    "createTextNode",
    "createComment",
    "createCDATASection",
    "createProcessingInstruction",
    "createAttribute",
    "createEntityReference",
    "getElementsByTagName",
    "importNode",
    "createElementNS",
    "createAttributeNS",
    "getElementsByTagNameNS",
    "getElementById"
  ];
  
  var HTMLDOCUMENT_PROPERTIES = [
    "title",
    "referrer",
    "domain",
    "URL",
    "body",
    "images",
    "applets",
    "links",
    "forms",
    "anchors",
    "cookie",
    "open",
    "close",
    "write",
    "writeln",
    "getElementsByName"
  ];
  
  var DOCUMENTNONSTANDARD_PROPERTIES = [
    "location",
    "readyState"
  ];
  
  var ABSTRACTVIEW_PROPERTIES = [
    "document",
    "getComputedStyle"
  ];
  
  var GLOBAL_PROPERTIES = [
    "window",
    "self",
    "name",
    "location",
    "history",
    "getSelection",
    "close",
    "focus",
    "blur",
    "frames",
    "length",
    "top",
    "opener",
    "parent",
    "frameElement",
    "open",
    "navigator",
    "alert",
    "confirm",
    "prompt",
    "print",
    "setTimeout",
    "setInterval",
    
    // Built in global objects
    "Array",
    "Boolean",
    "Date",
    "Error",
    "EvalError",
    "Function",
    "Math",
    "Number",
    "Object",
    "RangeError",
    "ReferenceError",
    "RegExp",
    "String",
    "SyntaxError",
    "TypeError",
    "URIError",
    
    // Global properties (ECMA-262, ed.3, 15.1.1)
    "Infinity",
    "NaN",
    "undefined",
    
    "decodeURI",
    "decodeURIComponent",
    "encodeURI",
    "encodeURIComponent",
    "eval",
    "isFinite",
    "isNaN",
    "parseFloat",
    "parseInt"
    
  ];
  
  var IE_GLOBAL_PROPERTIES = [
    "clientInformation", "clipboardData", "closed", "console",
    "defaultStatus", "document", "event", "external", "frameElement",
    "frames", "history", "length", "localStorage", "location", 
    "maxConnectionsPerServer", "name", "navigator", "offscreenBuffering",
    "onafterprint", "onbeforeprint", "onbeforeunload", "onblur", "onerror",
    "onfocus", "onhashchange", "onhelp", "onload", "onmessage", "onresize",
    "onscroll", "onunload", "opener", "parent", "screen", "screenLeft",
    "screenTop", "self", "sessionStorage", "status", "top", "window"
  ];
  
  // http://www.w3.org/TR/wai-aria/
  
  var XPATH_ARIA_STATES = [
    'aria-busy',
    'aria-checked',
    'aria-disabled',
    'aria-dropeffect',
    'aria-expanded',
    'aria-grab',
    'aria-hidden',
    'aria-invalid',
    'aria-pressed',
    'aria-selected'
  ];

  var XPATH_ARIA_PROPERTIES = [
    'aria-activedescendant',
    'aria-atomic',
    'aria-autocomplete',
    'aria-channel',
    'aria-controls',
    'aria-describedby',
    'aria-flowto',
    'aria-haspopup',
    'aria-labelledby',
    'aria-level',
    'aria-live',
    'aria-multiline',
    'aria-multiselectable',
    'aria-owns',
    'aria-posinset',
    'aria-readonly',
    'aria-relevant',
    'aria-required',
    'aria-setsize',
    'aria-sort',
    'aria-valuemax',
    'aria-valuemin',
    'aria-valuenow',
    'aria-valuetext'
  ];
  
  var PROTOTYPEJS_PROPERTIES = [
    "absolutize",
    "addClassName",
    "adjacent",
    "ancestors",
    "childElements",
    "childOf",
    "classNames",
    "cleanWhitespace",
    "clonePosition",
    "cumulativeOffset",
    "cumulativeScrollOffset",
    "descendantOf",
    "descendants",
    "down",
    "empty",
    "fire",
    "firstDescendant",
    "getDimensions",
    "getElementsBySelector",
    "getHeight",
    "getOffsetParent",
    "getOpacity",
    "getStorage",
    "getStyle",
    "getWidth",
    "hasClassName",
    "hide",
    "identify",
    "immediateDescendants",
    "insert",
    "inspect",
    "makeClipping",
    "makePositioned",
    "match",
    "next",
    "nextSiblings",
    "observe",
    "positionedOffset",
    "previous",
    "previousSiblings",
    "readAttribute",
    "recursivelyCollect",
    "relativize",
    "remove",
    "removeClassName",
    "replace",
    "retrieve",
    "scrollTo",
    "select",
    "setOpacity",
    "setStyle",
    "show",
    "siblings",
    "stopObserving",
    "store",
    "toggle",
    "toggleClassName",
    "undoClipping",
    "undoPositioned",
    "up",
    "update",
    "viewportOffset",
    "visible",
    "wrap",
    "writeAttribute"
  ];
  
  var PROTOTYPEJS_FORM_PROPERTIES = [
    "serialize",
    "getElements",
    "getInputs",
    "disable",
    "enable",
    "findFirstElement",
    "focusFirstElement",
    "request"
  ];
  
  var formControlsXPath = ' \
    //*[ \
      local-name()="input" or \
      local-name()="button" or \
      local-name()="select" or \
      local-name()="textarea" \
    ][' +
    makeNamesXPath(OBJECT_PROTOTYPE_PROPERTIES) + ' or ' +
    makeNamesXPath(NODE_PROPERTIES) + ' or ' +
    makeNamesXPath(ELEMENT_PROPERTIES) + ' or ' +
    makeNamesXPath(HTMLELEMENT_PROPERTIES) + ' or ' +
    makeNamesXPath(HTMLFORMELEMENT_PROPERTIES) + ' or ' +
    makeNamesXPath(EVENTTARGET_PROPERTIES) + ' or ' +
    makeNamesXPath(DOML2EVENTS) + ' or ' +
    makeNamesXPath(MSHTML_EVENTS) + ' or ' +
    makeNamesXPath(ELEMENTCSSINLINESTYLE_PROPERTIES) +
  ']';
    
  var formsXPath = ' //form['
    +
    makeNamesXPath(OBJECT_PROTOTYPE_PROPERTIES) + ' or ' +
    makeNamesXPath(NODE_PROPERTIES) + ' or ' +
    makeNamesXPath(DOCUMENT_PROPERTIES) + ' or ' +
    makeNamesXPath(HTMLDOCUMENT_PROPERTIES) + ' or ' +
    makeNamesXPath(DOCUMENTNONSTANDARD_PROPERTIES) + ' or ' +
    makeNamesXPath(EVENTTARGET_PROPERTIES) + ' or ' +
    makeNamesXPath(DOML2EVENTS) + ' or ' + 
    makeNamesXPath(MSHTML_EVENTS) + 
  ']';
  
  var globalNamesXPath = ' \
    //*[local-name()!="input" and \
        local-name()!="button" and \
        local-name()!="select" and \
        local-name()!="textarea"][' 
    +
    makeNamesXPath(ABSTRACTVIEW_PROPERTIES) + ' or ' +
    makeIdsXPath(ABSTRACTVIEW_PROPERTIES) + 
    ' or ' +
    makeNamesXPath(EVENTTARGET_PROPERTIES) + ' or ' +
    makeIdsXPath(EVENTTARGET_PROPERTIES) + 
    ' or ' + 
    makeNamesXPath(GLOBAL_PROPERTIES) + ' or ' +
    makeIdsXPath(GLOBAL_PROPERTIES) + 
  ']';
    
  var prototypeJSXPath = 
    '//*[' + makeAttributesXPath(PROTOTYPEJS_PROPERTIES) + '] |' + 
    '//form[' + makeAttributesXPath(PROTOTYPEJS_FORM_PROPERTIES) + '] |' +
    '//*[local-name()="input" or local-name()="textarea" or local-name()="select"][ \
      @serialize or \
      @getValue or \
      @setValue or \
      @clear or \
      @present or \
      @activate or \
      @disable or \
      @enable \
    ] \
    | \
    //form[ \
      \
      {-- 2 methods that document is extended with --} \
      \
      @name="observe" or \
      @name="stopObserving" or \
      \
      {-- Various properties which when present on a document might brake library\'s core functionality --} \
      \
      @name="querySelector" or \
      @name="evaluate" or \
      @name="loaded" or \
      @name="addEventListener" or \
      @name="getElementsByClassName" \
    ] \
    | \
    //*[local-name()!="input" and \
        local-name()!="button" and \
        local-name()!="select" and \
        local-name()!="textarea"][' +
      makeNamesXPath(PROTOTYPEJS_PROPERTIES) +
      ' or ' +
      // since it's a form, there might be a conflict with `Form.Methods` methods
      makeNamesXPath(PROTOTYPEJS_FORM_PROPERTIES) +
      ' ] | ' +
      '//*[@name="HTMLElement" or @name="addEventListener" or @id="HTMLElement" or @id="addEventListener"]';
      
  var nodeListXPath = ' \
    //*[ \
      {-- NodeList --} \
      @id="length" or \
      @id="item" or \
      \
      {-- HTMLCollection --} \
      @id="namedItem" or '
      +
      makeIdsXPath(OBJECT_PROTOTYPE_PROPERTIES) +
    ']';  
    
  var intrinsicEventHandlersXPath = ' \
    //*[local-name()!="input" and \
        local-name()!="button" and \
        local-name()!="select" and \
        local-name()!="textarea"][' +
        makeNamesXPath(GLOBAL_PROPERTIES)
      + ']';
  
  function normalizeXPath(xpath) {
    return xpath
      .replace(/\{--.*?--\}/g, '') // strip comments
      .replace(/\s+/g, ' ') // strip whitespace
      .replace(/\s*(\[|\])\s*/g, '$1') // strip whitespace around "[" or "]"
  }
  
  function sendRequest(url, xpath, callbackName) {
    var s = document.createElement('script');
    s.type = 'text/javascript';
    var src = 'http://query.yahooapis.com/v1/public/yql?q=' +
              'select * from html where url="' + 
              url +
              '" and xpath=\'' + 
              normalizeXPath(xpath) +
              '\'&format=json&' +
              'callback=callbacks.' + callbackName;
    
    s.src = src;
    
    var container = (
      document.getElementsByTagName('head')[0] || 
      document.body || 
      document.documentElement);
    
    container.appendChild(s);
  }
  
  var trigger = document.forms[0].elements[1];
  
  trigger.onclick = function(e) {
    e = e || window.event;
    if (typeof e.preventDefault == 'function') e.preventDefault();
    else if ('returnValue' in e) e.returnValue = false;
    var url = document.forms[0].elements[0].value;
    if (url) {
      // clear log
      log.clear();
      
      trigger.value = 'Checking...'
      trigger.disabled = true;;
      
      // send requests
      sendRequest(url, formControlsXPath, 'formControls');
      sendRequest(url, formsXPath, 'forms');
      sendRequest(url, globalNamesXPath, 'globalNames');
      sendRequest(url, nodeListXPath, 'nodeList');
      sendRequest(url, intrinsicEventHandlersXPath, 'intrinsicEventHandlers');
      sendRequest(url, prototypeJSXPath, 'prototypeJS');
    }
  }
  
  var log = (function(){
    var ID = 'log';
    return {
      write: function(label, data) {
        
        var log = document.getElementById(ID);
        
        if (!data || (data && !data.query)) {
          log.appendChild(document.createTextNode('Something went wrong...'));
          log.appendChild(document.createElement('br'));
          return;
        };
        
        var count = parseInt(data.query.count, 10);
        
        var conflictingElements = [ ];
        if (count > 0) {
          for (var prop in data.query.results) {
            if (!(data.query.results[prop] instanceof Array)) {
              // could be an array or not, so we make an array explicitly
              data.query.results[prop] = [data.query.results[prop]];
            }
            for (var i=0, len=data.query.results[prop].length; i<len; i++) {
              conflictingElements.push(prop, data.query.results[prop][i])
            }
          }
          var serializedElements = [ ];
          // loop through pairs
          for (var i=0, len=conflictingElements.length; i<len; i+=2) {
            serializedElements.push(
              '&lt;' + 
              conflictingElements[i] + 
              ' ' + 
              flattenAttributes(conflictingElements[i+1]) + 
              '&gt;');
          }
          var serializedElementsHTML = serializedElements.join('<br>');
        }
        
        var result = (count == 0) ? "PASS" : "FAIL";
        
        if (log) {
          var labelEl = document.createElement('span');
          labelEl.className = 'label';
          //labelEl.appendChild(document.createTextNode(label + ': '));
          labelEl.innerHTML = label;
          var resultEl = document.createElement('span');
          resultEl.className = 'result ' + result.toLowerCase();
          resultEl.appendChild(document.createTextNode(result));
          var wrapperEl = document.createElement('p');
          wrapperEl.appendChild(labelEl);
          wrapperEl.appendChild(resultEl);
          
          if (conflictingElements.length > 0) {
            var conflictsLogEl = document.createElement('pre');
            conflictsLogEl.className = 'conflicts';
            conflictsLogEl.innerHTML = serializedElementsHTML;
            wrapperEl.appendChild(conflictsLogEl);
          }
          
          log.appendChild(wrapperEl);
        }
      },
      clear: function() {
        var log = document.getElementById(ID);
        if (log) {
          log.innerHTML = '';
        }
      }
    }
  })();
  
  function flattenAttributes(o) {
    var result = '';
    for (var prop in o) {
      // element descendants are presented as properties as well, 
      // but only attributes are strings so we filter those out
      if (typeof o[prop] == 'string') {
        result += (prop + '="' + o[prop] + '" ');
      }
    }
    // trim trailing space
    return result.replace(/\s+$/, '');
  }
  
  function init(el) {
    function toggle(el) {
      el.style.display = el.style.display == 'none' ? '' : 'none';
    }
    el.style.display = '';
    el.onclick = function(e) {
      e = e || window.event;
      if (typeof e.preventDefault == 'function') {
        e.preventDefault();
      }
      else if ('returnValue' in e) {
        e.returnValue = false;
      }
      var codeSection = el.nextSibling;
      if (codeSection.nodeName && codeSection.nodeName.toUpperCase() == 'PRE') {
        toggle(codeSection);
      }
      else {
        codeSection = codeSection.nextSibling;
      }
      if (codeSection) {
        toggle(codeSection);
      }
    }
  }
  var els = document.getElementsByTagName('pre');
  for (var i=0, len=els.length; i<len; i++) {
    els[i].style.display = 'none';
    var link = els[i].previousSibling;
    if (link.nodeName && link.nodeName.toUpperCase() == 'A') {
      init(link);
    } else {
      link = link.previousSibling;
    }
    if (link) { 
      init(link);
    }
  }
  
  document.getElementById('javascript-notice').style.display = 'none';
  document.forms[0].style.display = '';
  
  return {
    formControls: function(data) {
      log.write('<strong>Form controls\' conflicts</strong><br><span class="small">Testing &lt;INPUT&gt;, &lt;TEXTAREA&gt;, &lt;SELECT&gt; and &lt;BUTTON&gt; elements against 146 <code>name</code> values</span>', data);
    },
    forms: function(data) {
      log.write('<strong>Forms\' conflicts</strong><br><span class="small">Testing &lt;FORM&gt; elements against 150 <code>name</code> values</span>', data);
    },
    globalNames: function(data) {
      log.write('<strong>Named elements\' conflicts (MSHTML DOM)</strong><br><span class="small">Testing all elements except &lt;INPUT&gt;, &lt;TEXTAREA&gt;, &lt;SELECT&gt; and &lt;BUTTON&gt; elements against 56 <code>name</code>/<code>id</code> values</span>', data);
    },
    nodeList: function(data) {
      log.write('<strong>NodeList conflicts (MSHTML DOM)</strong><br><span class="small">Testing all elements against 9 <code>id</code> values</span>', data);
    },
    intrinsicEventHandlers: function(data) {
      log.write('<strong>Intrinsic event handlers\' conflicts</strong><br><span class="small">Testing &lt;INPUT&gt;, &lt;TEXTAREA&gt;, &lt;SELECT&gt; and &lt;BUTTON&gt; elements against 23 <code>name</code> values</span>', data);
    },
    prototypeJS: function(data) {
      log.write('<strong>Prototype.js extensions\' conflicts</strong>', data);
      
      // enabling trigger, since this is a last callback
      trigger.value = 'Check';
      trigger.disabled = false;
    }
  }
})();