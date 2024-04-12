const addBtn = document.querySelector(".addBtn");
const tbody = document.querySelector("tbody");
let allow = true;
let allow_edit = true;
let info = [];

addBtn.addEventListener("click", (e) => {
  if (!allow) {
    alert("Onceki xanani doldurun pls...");
    return;
  }
  allow = false;
  const row = document.createElement("tr");
  const noTd = document.createElement("td");
  // noTd.textContent="a"

  const nameTd = document.createElement("td");
  nameTd.classList.add("data");
  const nameInput = document.createElement("input");
  nameInput.setAttribute("placeholder", "Ad");
  nameInput.setAttribute("type", "text");
  // nameInput.setAttribute("required");
  nameTd.append(nameInput);

  const surnameTd = document.createElement("td");
  surnameTd.classList.add("data");
  const surnameInput = document.createElement("input");
  surnameInput.setAttribute("placeholder", "Soyad");
  surnameInput.setAttribute("type", "text");
  // surnameInput.setAttribute("required");
  surnameTd.append(surnameInput);

  const ageTd = document.createElement("td");
  ageTd.classList.add("data");
  const ageInput = document.createElement("input");
  ageInput.setAttribute("placeholder", "Yas");
  ageInput.setAttribute("type", "number");
  ageInput.setAttribute("min", "0");
  // ageInput.setAttribute("required");
  ageTd.append(ageInput);

  const optionsTd = document.createElement("td");

  const saveBtn = document.createElement("button");
  saveBtn.textContent = "Yadda Saxla";
  saveBtn.classList.add("saveBtn");
  saveBtn.addEventListener("click", saveData);

  const cancelBtn = document.createElement("button");
  cancelBtn.textContent = "Sil";
  cancelBtn.classList.add("removeBtn");
  cancelBtn.addEventListener("click", removeData);

  optionsTd.append(saveBtn, cancelBtn);
  row.append(noTd, nameTd, surnameTd, ageTd, optionsTd);
  tbody.append(row);

  orderRow();
  // e.preventDefault();
});

const saveData = (e) => {
  if (allow_edit) {
    console.log("yadda saxla menusu");

    const inputs = [...document.querySelectorAll("input")];
    inputs.map((input) => {
      input.parentElement.textContent = input.value;
    });
    console.log(inputs);
    e.target.textContent = "Duzelis Et";
    e.target.className = "editBtn";
    e.target.nextElementSibling.textContent = "Sil";
    e.target.nextElementSibling.className = "removeBtn";
    allow_edit = false;
  } else {
    console.log("duzelis et menusu");
    console.log(e.target.parentElement.parentElement);
    const datas = [
      ...e.target.parentElement.parentElement.querySelectorAll(".data"),
    ];
    datas.map((data, index) => {
      data.innerHTML = `<input value="${data.textContent}">`;
    });
    e.target.textContent = "Yadda Saxla";
    e.target.className = "saveBtn";
    e.target.nextElementSibling.textContent = "Legv et";
    e.target.nextElementSibling.className = "cancelBtn";

    allow_edit = true;
  }
  allow = true;
  // e.preventDefault();
};

const orderRow = (e) => {
  const rows = [...document.querySelectorAll("tbody  tr")];
  rows.map((row, index) => {
    row.querySelector("td").textContent = index + 1;
  });
};

const editData = (e) => {};
const removeData = (e) => {
  if (e.target.classList.contains("removeBtn")) {
    e.target.parentElement.parentElement.remove();
  } else {
    const inputs = [...document.querySelectorAll("input")];
    inputs.map((input) => {
      input.parentElement.textContent = input.value;
    });
    e.target.textContent = "Sil";
    e.target.className = "removeBtn";
    e.target.previousElementSibling.textContent = "Yadda Saxla";
    e.target.previousElementSibling.className = "saveBtn";
  }

  orderRow();
  allow = true;
};
