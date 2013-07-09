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
The key must match what is inside the href in the menu.
