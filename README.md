jqTreeContextMenu
=================

A context menu "plugin" to jqTree.

Usage:

Create a div that contains the menu. See the demo for an example how to
do it using Bootstrap.

Use jqTree to create the tree. See documentation for jqTree on how to do
this (or look in the demo).

When the tree is created you can do the following to set up the context
menu:
```JavaScript
$tree.jqTreeContextMenu($('#myMenu'), {
    "edit": function (node) { alert('Edit node: ' + node.name); },
    "delete": function (node) { alert('Delete node: ' + node.name); },
    "add": function (node) { alert('Add node: ' + node.name); }
});
```

First parameter to jqTreeContextMenu is an id to the menu.
Second parameter is an hash containing the actions of each menu item.
The key must match what is inside the href anchor in the menu.

There is also a little API to enable/disable menu items.
```JavaScript
// Disable all menu items
jqTreeContextMenu.disable()
// Disable all menu items of a certain kind. Here 'add' and 'delete'
menu items are deleted.
jqTreeContextMenu.disable(['add', 'delete'])
// Disable menu items for a certain node in the tree.
jqTreeContextMenu.disable(nodeName, ['add', 'delete'])

// Enable all menu items
jqTreeContextMenu.enable()
// Enable all menu items of a certain kind. Here 'add' and 'delete'
menu items are deleted.
jqTreeContextMenu.enable(['add', 'delete'])
// Enable menu items for a certain node in the tree.
jqTreeContextMenu.enable(nodeName, ['add', 'delete'])
```

For a complete example of usage, see the demo at http://daviduv.github.io/jqTreeContextMenu/.

