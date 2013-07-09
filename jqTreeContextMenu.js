(function ($) {
	if (!$.fn.tree) {
		throw "Error jqTree is not loaded.";
	}
	
	// The jQuery object of the menu div.
	$menuEl = null;
	
	// This hash holds all menu items that should be disabled for a specific node.
	nodeToDisabledMenuItems = {};
	
	$.fn.jqTreeContextMenu = function (menuElement, callbacks) {
		//
		// TODO:
		// * Make sure the useContextMenu option is set in jqTree, either complain or set it automatically
		// * Make menu fade in/out
		//
		var self = this;
		var $el = this;

		$menuEl = menuElement;
		
		// Hide the menu div.
		$menuEl.hide();

		// Disable system context menu from beeing displayed.
		$el.bind("contextmenu", function (e) { 
			e.preventDefault();
			return false; 
		});

		// Handle the contextmenu event sent from jqTree when user clicks right mouse button.
		$el.bind('tree.contextmenu', function (event) {
			var x = event.click_event.clientX;
			var y = event.click_event.clientY;

			// Handle disabling and enabling of menu items on specific nodes.
			if (Object.keys(nodeToDisabledMenuItems).length > 0) {
				if (event.node.name in nodeToDisabledMenuItems) {
					var nodeName = event.node.name;
					var items = nodeToDisabledMenuItems[nodeName];
					if (items.length === 0) {
						$menuEl.find('li').addClass('disabled');
					} else {
						for (var i = 0; i < items.length; i++) {
							$menuEl.find('li.' + items[i]).addClass('disabled');	
							$menuEl.find('li.' + items[i] + ' a').unbind('click');
						}	
					}
				} else {
					$menuEl.find('li.disabled').removeClass('disabled');
				}
			}

			// Must call show before we set the offset (offset can not be set on display: none elements).
			$menuEl.show();

			$menuEl.offset({ left: x, top: y });

			// Make it possible to dismiss context menu by clicking somewhere in the document.
			$(document).bind('click', function () {
				$(document).unbind('click');
				$menuEl.hide();
			});

			// Dismiss context menu if another node in the tree is clicked.
			$el.bind('tree.click', function (e) {
				$menuEl.hide();
			});

			// Make selection follow the node that was right clicked on.
			var selectedNode = $el.tree('getSelectedNode');
			if (selectedNode !== event.node) {
				$el.tree('selectNode', event.node);
			}

			// Handle click on menu items, if it's not disabled.
			var menuItems = $menuEl.find('li:not(.disabled) a');
			if (menuItems.length !== 0) {
				menuItems.unbind('click');
				menuItems.click(function (e) {
					e.stopImmediatePropagation();
					$menuEl.hide();
					var hrefAnchor = e.target.attributes.href.nodeValue;
					var funcKey = hrefAnchor.slice(hrefAnchor.indexOf("#") + 1, hrefAnchor.length)
					var callbackFn = callbacks[funcKey];
					if (callbackFn) {
						callbackFn(event.node);
					}
					return false;
				});
			}
		});
	};
	
	$.fn.jqTreeContextMenu.disable = function () {
		if (arguments.length === 0) {
			// Called as: jqTreeContextMenu.disable()
			$menuEl.find('li:not(.disabled)').addClass('disabled');
			$menuEl.find('li a').unbind('click');
			nodeToDisabledMenuItems = {};
		} else if (arguments.length === 1) {
			// Called as: jqTreeContextMenu.disable(['edit','remove'])
			var items = arguments[0];
			if (typeof items !== 'object') {
				return;
			}
			for (var i = 0; i < items.length; i++) {
				$menuEl.find('li.' + items[i]).addClass('disabled');
				$menuEl.find('li.' + items[i] + ' a').unbind('click');
			}
			nodeToDisabledMenuItems = {};
		} else if (arguments.length === 2) {
			// Called as: jqTreeContextMenu.disable(nodeName, ['edit','remove'])
			var nodeName = arguments[0];
			var items = arguments[1];
			nodeToDisabledMenuItems[nodeName] = items;
		}
	};

	$.fn.jqTreeContextMenu.enable = function () {
		if (arguments.length === 0) {
			// Called as: jqTreeContextMenu.enable()
			$menuEl.find('li.disabled').removeClass('disabled');
			nodeToDisabledMenuItems = {};
		} else if (arguments.length === 1) {
			// Called as: jqTreeContextMenu.enable(['edit','remove'])
			var items = arguments[0];
			if (typeof items !== 'object') {
				return;
			}
			for (var i = 0; i < items.length; i++) {
				$menuEl.find('li.' + items[i]).removeClass('disabled');
			}
			nodeToDisabledMenuItems = {};
		} else if (arguments.length === 2) {
			// Called as: jqTreeContextMenu.enable(nodeName, ['edit','remove'])
			var nodeName = arguments[0];
			var items = arguments[1];
			delete nodeToDisabledMenuItems[nodeName];
			if (Object.keys(nodeToDisabledMenuItems).length === 0) {
				$menuEl.find('li.disabled').removeClass('disabled');
			}
		}
	};
} (jQuery));
