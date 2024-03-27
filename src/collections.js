
///////////////////////////////////////////////////////////////////////////////
// Import and export information used by the Javascript linter ESLint:
/* globals DS */
///////////////////////////////////////////////////////////////////////////////

DS.getStartX = () => DS.$Info.x + DS.getObjectSize() / 2;
DS.getStartY = () => DS.$Info.y * 4;
DS.getRootX = () => DS.$SvgWidth / 2;
DS.getRootY = () => 2 * DS.$Info.y + DS.getObjectSize() / 2;
DS.getSpacingX = () => DS.getObjectSize();
DS.getSpacingY = () => DS.getObjectSize();


///////////////////////////////////////////////////////////////////////////////
// Inititalisation

DS.initToolbar = function() {
    const tools = DS.$Toolbar;
    tools.algorithmControls = document.getElementById("algorithmControls");
    tools.insertSelect = document.getElementById("insertSelect");
    tools.insertField = document.getElementById("insertField");
    tools.insertSubmit = document.getElementById("insertSubmit");
    tools.findField = document.getElementById("findField");
    tools.findSubmit = document.getElementById("findSubmit");
    tools.deleteField = document.getElementById("deleteField");
    tools.deleteSubmit = document.getElementById("deleteSubmit");
    tools.printSubmit = document.getElementById("printSubmit");
    tools.clearSubmit = document.getElementById("clearSubmit");
    tools.showNullNodes = document.getElementById("showNullNodes");

    tools.insertSelect.addEventListener("change", () => {
        tools.insertField.value = tools.insertSelect.value;
        tools.insertSelect.value = "";
    });
    DS.addReturnSubmit(tools.insertField, "ALPHANUM+", () => DS.submit("insert", tools.insertField));
    tools.insertSubmit.addEventListener("click", () => DS.submit("insert", tools.insertField));
    DS.addReturnSubmit(tools.findField, "ALPHANUM", () => DS.submit("find", tools.findField));
    tools.findSubmit.addEventListener("click", () => DS.submit("find", tools.findField));
    DS.addReturnSubmit(tools.deleteField, "ALPHANUM", () => DS.submit("delete", tools.deleteField));
    tools.deleteSubmit.addEventListener("click", () => DS.submit("delete", tools.deleteField));
    tools.printSubmit.addEventListener("click", () => DS.submit("print"));
    tools.clearSubmit.addEventListener("click", () => DS.confirmResetAll());

    DS.setRunning(true);
    DS.$Current?.initToolbar?.();
};


DS.setIdleTitle = function() {
    DS.$Info.title.text("Select an action from the menu above");
    DS.$Info.body.text("");
};

