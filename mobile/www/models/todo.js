"use strict";
var ToDo = augment(Parent, function (parent) {

    this.constructor = function () {
        this.dueDate = null;
        this.text = "";
        this.notes = "";
        this.isChecked = false;
    };
    /**
	 * used like a copy constructor to copy the json object
	 * @param toDo {ToDo} the user to be copied to the current one
	 */
    this.copy = function (toDO) {
        this.setDueDate(toDO.dueDate);
        this.creatDate = new Date(toDO.creatDate);
        this.text = toDO.text;
        this.notes = toDO.notes;
        this.isChecked = toDO.isChecked;
    };
    /**
     * sets the duedate with propervalue
     * @return {mixed} the string with localtime or null or 0
     */
    this.setDueDate = function (imput) {
        if (imput != null && imput != 'undefined' && imput != "" && imput != 0) {
            if (typeof imput != 'object') {
                this.dueDate = new Date(imput);
            } else {
                this.dueDate = imput;
            }
        }
    };
    /**
      * sets the timeout if there is time remaing or call it at once if expired
      * @return {function} the action to be done if the todo is expired or calledback take a pramater ToDo
      */
    this.alertTimeRemainig = function (customFunc) {
        var x = this;
        if (this.dueDate != null && this.dueDate != 'undefined' && this.dueDate != "" && this.dueDate != 0) {
            if (typeof this.dueDate != 'object') {
                this.dueDate = new Date(this.dueDate);
            }
            var result = this.dueDate.getTime() - new Date().getTime();
            if (result < 2147483647) {
                setTimeout(function () {customFunc(x);} , result);
            }
        }
    };
});