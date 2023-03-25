// Получение всех клиентов
async function GetBank() {
    // отправляет запрос и получаем ответ
    const response = await fetch("/api/banks", {
        method: "GET",
        headers: { "Accept": "application/json" }
    });
    // если запрос прошел нормально

    if (response.ok === true) {
        // получаем данные
        const banks = await response.json();
        let rows = document.querySelector("tbody");
        banks.forEach(bank => {
            // добавляем полученные элементы в таблицу
            rows.append(row(bank));

        });

    }
}
// Получение одного проживающего
async function GetBankById(id) {
    const response = await fetch("/api/banks/" + id, {
        method: "GET",
        headers: { "Accept": "application/json" }
    });
    if (response.ok === true) {
        const bank = await response.json();
        const form = document.forms["banksForm"];
        form.elements["id"].value = bank.id;
        form.elements["fullname"].value = bank.fullName;
        form.elements["account"].value = bank.account;
        form.elements["money"].value = bank.money;


    }
}

async function CreateBank(bankId, bankFullName, bankAccount,
    bankMoney) {
    const response = await fetch("/api/banks", {
        method: "POST",
        headers: {
            "Accept": "application/json", "Content-Type":
                "application/json"
        },
        body: JSON.stringify({
            id: parseInt(bankId, 10),
            fullname: bankFullName,
            account: parseInt(bankAccount, 10),
            money: bankMoney

        })
    });
    if (response.ok === true) {
        const bank = await response.json();
     
       reset();
        document.querySelector("tbody").append(row(bank));

    }

}

async function EditBank(bankId, bankFullName, bankAccount,
    bankMoney) {
    const response = await fetch("/api/banks/" + bankId, {
        method: "PUT",

        headers: {
            "Accept": "application/json", "Content-Type":
                "application/json"
        },
        body: JSON.stringify({
            id: parseInt(bankId, 10),
            fullname: bankFullName,
            account: parseInt(bankAccount, 10),
            money: bankMoney

        })
    });
    if (response.ok === true) {
        const bank = await response.json();

        reset();

        document.querySelector("tr[data-rowid='" + bank.id +
            "']").replaceWith(row(bank));

    }
}
// Удаление пользователя
async function DeleteBank(id) {
    const response = await fetch("/api/banks/" + id, {
        method: "DELETE",
        headers: { "Accept": "application/json" }
    });
    if (response.ok === true) {
        const bank = await response.json();

        document.querySelector("tr[data-rowid='" + bank.id +
            "']").remove();

    }
}
// сброс формы
function reset() {
    const form = document.forms["bankForm"];
    form.reset();
    form.elements["id"].value = 0;


}
// создание строки для таблицы
function row(bank) {
    const tr = document.createElement("tr");
    tr.setAttribute("data-rowid", bank.id);
    const idTd = document.createElement("td");
    idTd.append(bank.id);
    tr.append(idTd);
    const fullnameTd = document.createElement("td");
    fullnameTd.append(bank.fullName);
    tr.append(fullnameTd);
    const accountTd = document.createElement("td");
    accountTd.append(bank.account);
    tr.append(accountTd);
    const moneyTd = document.createElement("td");
    moneyTd.append(bank.money);
    tr.append(moneyTd);
    const linksTd = document.createElement("td");
    const editLink = document.createElement("a");
    editLink.setAttribute("data-id", bank.id);
    editLink.setAttribute("style", "cursor:pointer;padding:15px;");
    editLink.append("edit");
    editLink.addEventListener("click", e => {
        e.preventDefault();
        GetBankById(bank.id);

    });
    linksTd.append(editLink);
    const removeLink = document.createElement("a");
    removeLink.setAttribute("data-id", bank.id);
    removeLink.setAttribute("style", "cursor:pointer;padding:15px;");
    removeLink.append("delete");
    removeLink.addEventListener("click", e => {
        e.preventDefault();
        DeleteBank(bank.id);

    });
    linksTd.append(removeLink);
    tr.appendChild(linksTd);
    return tr;

}

function InitialFunction() {

    // сброс значений формы
    console.log(document.getElementById("reset"));

    document.getElementById("formReset").click(
        function (e) {
            e.preventDefault();
            reset();


        })
    // отправка формы
    document.forms["banksForm"].addEventListener("submit", e => {
        e.preventDefault();
        const form = document.forms["banksForm"];
        const id = form.elements["id"].value;
        const fullname = form.elements["fullname"].value;
        const account = form.elements["account"].value;
        const money = form.elements["money"].value;
        if (id == 0)
            CreateBank(id, fullname, account, money);
        
        else
            EditBank(id, fullname, account, money);

    });
    GetBank();
}