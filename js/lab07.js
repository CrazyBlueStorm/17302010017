let button = document.getElementsByTagName("button")[0];

let columnNumber = document.getElementById("columnsNumbers");

let select1 = document.getElementById("select1");

let select2 = document.getElementById("select2");

let aboutColumn = document.querySelector(".aboutColumn");

let tableCreate = document.querySelector(".tableCreate");

let layTable = document.querySelector(".lay-table");

let information = document.querySelector(".information");

let aboutTable = document.querySelector(".aboutTable");

let columnsInput = [];

let tables = [];

let classes = ["","pink"];

function showTable(table){
    if(layTable.firstChild)
        layTable.removeChild(layTable.firstChild);
    if(select2.value === "select")
        return;
    layTable.appendChild(table);
}

function showInput(number,ths = []){
    while(aboutColumn.hasChildNodes()){
        aboutColumn.removeChild(aboutColumn.firstChild);
    }
    for(let i = 0; i < number; i++){
        columnsInput[i] = document.createElement("input");
        columnsInput[i].type = "text";
        columnsInput[i].placeholder = this[i] ? ths[i].innerHTML : "Attribute";
        columnsInput[i].style.width = 140 + "px";
        columnsInput[i].style.height = "30px";
        aboutColumn.appendChild(columnsInput[i]);
    }
}

function addRow(){
    let numbers = 0;
    if(select2.value !== "select")
        numbers = tables[select2.value].getElementsByTagName("th").length;
    else{
        return;
    }
    showInput(numbers, numbers = tables[select2.value].getElementsByTagName("th"));
}

function addOption(optionValue){
    let option = document.createElement("option");
    select2.appendChild(option);
    option.innerHTML = optionValue;
    option.value = handleTableName(optionValue);
    option.selected = true;
}

function deleteOption(){
    let options = select2.getElementsByTagName("option");
    if(select2.value === "select")
        return;
    for(let option of options){
        if(option.selected){
            select2.removeChild(option);
            tables[option.value] = "";
            if(layTable.firstChild)
                layTable.removeChild(layTable.firstChild);
            if(select2.getElementsByTagName(option)[1]){
                select2.getElementsByTagName("option")[1].selected = true;
                showTable(tables[select2.getElementsByTagName("option")[1].value]);
            }
            return;
        }
    }
}

function handleTableName(tableName){
    let count = -0;
    for(let i in tables){
        if (i.replace(/\d+/,'') === tableName.replace(/\d+/,''))
            count++;
    }
    return tableName + count;
}

select1.onchange = function(){
    switch(this.value){
        case "selectOne":
            button.style.display = "none";
            tableCreate.style.display = "none";
            information.innerHTML = "";
            break;

        case "createTable":
            aboutTable.getElementsByTagName("input")[0].value = "";
            aboutTable.getElementsByTagName("input")[1].value = "";
            tableCreate.style.display = "block";
            aboutTable.style.display = "block";
            aboutColumn.style.display = "none";
            information.innerHTML = "";
            break;

        case "addRow":
            aboutTable.style.display = "none";
            aboutColumn.style.diaplay = "block";
            addRow();
            information.innerHTML = "";
            break;

        case "deleteRow":
            aboutTable.style.diaplay = "none";
            aboutColumn.style.diaplay = "block";
            if(select2.value !== "select")
                showInput(tables[select2.value].getElementsByTagName("th").length, tables[select2.value].getElementsByTagName("th"));
            information.innerHTNL = "";
            break;

        case "deleteTable":
            tableCreate.style.display = "none";
            information.innerHTML = "Attention: This is an irreversible action";
            if (select2.value === "select")
                information.innerHTML = "";
            break;
    }
};

select2.onchange = function(){
    showTable(tables[select2.value]);
    if (select2.value === "select")
        return;
    if (select1.value ==="addRow" || select1.value ==="deleteRow"){
        showInput(tables[select2.value].getElementsByTagName("th").length, numbers = tables[select2.value].getElementsByTagName("th"));
    }
};

columnNumber.onchange = function(){
    let number = parseInt(columnNumber.value);
    if (number <= 0)
        return false;
    else {
        button.style.display = "inline";
        aboutColumn.style.display = "block";
        showInput(number);
    }
};

button.onclick = function() {
    if (select1.value === "createTable") {
        let tableName = document.getElementById("tableName").value || "tableName";
        addOption(tableName);
        tableName = handleTableName(tableName);
        tables[tableName] = document.createElement("table");
        let thead = document.createElement("tr");
        for (let i = 0; i < parseInt(columnNumber.value); i++) {
            let th = document.createElement("th");
            th.innerHTML = columnsInput[i].value || "Attribute";
            thead.appendChild(th);
        }
        tables[tableName].appendChild(thead);
        showTable(tables[tableName]);
        aboutTable.getElementsByTagName("input")[0].value = "";
        aboutTable.getElementsByTagName("input")[1].value = "";
        showInput(0);
    } else if (select1.value === "addRow") {
        let flag = false;
        let tr = document.createElement("tr");
        for (let i = 0; i < tables[select2.value].getElementsByTagName("th").length; i++) {
            let td = document.createElement("td");
            td.innerHTML = columnsInput[i].value;
            td.className = classes[tables[select2.value].getElementsByTagName("tr").length % 2];
            tr.appendChild(td);
            if (td.innerHTML !== "")
                flag = true;
        }
        if (!flag)
            return false;
        tables[select2.value].appendChild(tr);
        showInput(tables[select2.value].getElementsByTagName("th").length, tables[select2.value].getElementsByTagName("th"));
    } else if (select1.value === "deleteTable") {
        deleteOption();
        if (select2.value === "select")
            information.innerHTML = "";
    } else if (select1.value === "deleteRow") {
        if (select2.value === "select")
            return false;
        let flag2 = true;
        for (let i = 0; i < trs.length; i++) {
            let flag = true;
            let tds = trs[i].getElementsByTagName("td");
            for (let j = 0; j < tds; j++) {
                if (!flag2)
                    tds[j].className = classes[1 - classes.indexOf(tds[j].className)];
                if (tds[j].innerHTML !== aboutColumn.getElementsByTagName("input")[j].value && aboutColumn.getElementsByTagName("input")[j].value && flag2) {
                    flag = false;
                    break;
                }
            }
            if (flag && flag2) {
                tables[select2.value].removeChild(trs[i]);
                showInput(tables[select2.value].getElementsByTagName("th").length, tables[select2.value].getElementsByTagName("th"));
                flag2 = false;
                i--;
            }
        }
        showInput(tables[select2.value].getElementsByTagName("th").length, tables[select2.value].getElementsByTagName("th"));
    }
    return false;
};