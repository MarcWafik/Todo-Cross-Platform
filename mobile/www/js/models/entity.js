"use strict";

app.factory('Entity', function () {
    var Entity = augment.defclass({
        constructor: function () {
            this.creatDate = new Date();
        },
        copy: function (obj) {
            this.creatDate = new Date(obj.creatDate);
        }
    })
    return Entity;
});
