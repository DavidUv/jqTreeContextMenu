jqTreeContextMenu
=================

A context menu "plugin" to jqTree.

Demo
----
http://daviduv.github.io/jqTreeContextMenu/

Usage
-----
Create a div that contains the menu. See the demo for an example how to
do it using Bootstrap.

Use jqTree to create the tree. See documentation for jqTree on how to do
this (or look in the demo).

When the tree is created you can do the following to set up the context
menu:
```JavaScript
$tree.jqTreeContextMenu(menuCallback, callbacks);
```
*menu* is the jQuery object of the menu div.
*callbacks* is a hash structure with following format:
```JavaScript
{
	menuItem: action,
	menuItem: action
}
```
*menuItem* is the name of the menu item (this will be matched to what's inside the menu item href anchor attribute).
*action* is a function that will handle the click on that menu item.

*Example*
```JavaScript
$('tree').jqTreeContextMenu((node) => {
    return node.name.startsWith('node') ? $('#myMenu1') : $('#myMenu2');
}, {
    "edit": function (node) { alert('Edit node: ' + node.name); },
    "delete": function (node) { alert('Delete node: ' + node.name); },
    "add": function (node) { alert('Add node: ' + node.name); }
});
```

**API**

There is also a minimal API to enable/disable menu items.
```JavaScript
// Get handle to API when initializing the menu.
var menuAPI = $('tree').jqTreeContextMenu(...);

// Disable all menu items
menuAPI.jqTreeContextMenu.disable()
// Disable all menu items of a certain kind. Here 'add' and 'delete'
// menu items are deleted.
menuAPI.jqTreeContextMenu.disable(['add', 'delete'])
// Disable menu items for a certain node in the tree.
menuAPI.jqTreeContextMenu.disable(nodeName, ['add', 'delete'])

// Enable all menu items
menuAPI.jqTreeContextMenu.enable()
// Enable all menu items of a certain kind. Here 'add' and 'delete'
// menu items are deleted.
menuAPI.jqTreeContextMenu.enable(['add', 'delete'])
// Enable menu items for a certain node in the tree.
menuAPI.jqTreeContextMenu.enable(nodeName, ['add', 'delete'])
```

For a complete example of usage, see the demo at http://daviduv.github.io/jqTreeContextMenu/.

