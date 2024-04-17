const addBtn = document.querySelector(".addBtn");
const tbody = document.querySelector("tbody");
let allow = true;

//************************************** */
const orderRow = (e) => {
  const rows = [...document.querySelectorAll("tbody tr")];
  rows.map((row, index) => {
    row.querySelector("td").textContent = index + 1;
  });
};

const saveData = (e) => {
  console.log("savedata");
  const inputs = [...document.querySelectorAll("input")];
  inputs.map((input) => {
    input.parentElement.textContent = input.value;
  });

  e.target.textContent = "Duzelis et";
  e.target.nextElementSibling.textContent = "Sil";
  e.target.nextElementSibling.className = "removeBtn";
  e.target.nextElementSibling.removeEventListener("click", cancelData);
  e.target.nextElementSibling.addEventListener("click", removeData);

  e.target.classList.remove("saveBtn");
  e.target.classList.add("editBtn");
  e.target.removeEventListener("click", saveData);
  e.target.addEventListener("click", editData);

  orderRow();
  allow = true;
};

function editDataValues(e) {
  //* new version
  old_data.length = 0;
  const data = [...e.target.closest("tr").querySelectorAll("td")].slice(1, 4);
  data.map((td, index) => {
    const input = document.createElement("input");
    input.value = td.textContent;
    old_data.push(td.textContent);
    td.textContent = "";
    td.append(input);
  });

  //* old version
  // const data = [...e.target.closest("tr").querySelectorAll(".data")];
  // let old_value;
  // data.map((element, index) => {
  //   old_value = element.textContent;
  //   element.innerHTML = `<input  type="text" value='${old_value}'>`;
  // });
}
let old_data = [];

const editData = (e) => {
  editDataValues(e);

  console.log("editdata");

  e.target.textContent = "Yadda Saxla";
  e.target.classList.remove("editBtn");
  e.target.classList.add("saveBtn");
  e.target.removeEventListener("click", editData);
  e.target.addEventListener("click", saveData);

  e.target.nextElementSibling.removeEventListener("click", removeData);
  e.target.nextElementSibling.addEventListener("click", cancelData);
  e.target.nextElementSibling.textContent = "Legv et";
  e.target.nextElementSibling.className = "cancelBtn";

  allow = true;
};

const cancelData = (e) => {
  console.log("canceldata");
  const inputs = [...document.querySelectorAll("input")];
  inputs.map((input, index) => {
    input.parentElement.textContent = old_data[index];
  });

  e.target.textContent = "Sil";
  e.target.classList.remove("cancelBtn");
  e.target.classList.add("removeBtn");
  e.target.removeEventListener("click", cancelData);
  e.target.addEventListener("click", removeData);
  e.target.previousElementSibling.classList.remove("saveBtn");
  e.target.previousElementSibling.classList.add("editBtn");
  e.target.previousElementSibling.textContent = "Duzelis et";
  e.target.previousElementSibling.removeEventListener("click", saveData);
  e.target.previousElementSibling.addEventListener("click", editData);
};

const removeData = (e) => {
  e.target.closest("tr").remove();
  e.target.textContent = "Sil";
  e.target.className = "removeBtn";
  e.target.removeEventListener("click", cancelData);
  e.target.addEventListener("click", removeData);

  allow = true;
  orderRow();
};

//************************************************* */

addBtn.addEventListener("click", () => {
  if (!allow) {
    alert("Öncəki xananı doldurun pls...");
    return;
  }

  allow = false;
  const row = document.createElement("tr");
  const noTd = document.createElement("td");

  const nameTd = document.createElement("td");
  nameTd.classList.add("data");
  const nameInput = document.createElement("input");
  nameInput.setAttribute("type", "text");
  nameInput.setAttribute("placeholder", "Ad");
  nameTd.append(nameInput);

  const surnameTd = document.createElement("td");
  surnameTd.classList.add("data");
  const surnameInput = document.createElement("input");
  surnameInput.setAttribute("type", "text");
  surnameInput.setAttribute("placeholder", "Soyad");
  surnameTd.append(surnameInput);

  const ageTd = document.createElement("td");
  ageTd.classList.add("data");
  const ageInput = document.createElement("input");
  ageInput.setAttribute("type", "number");
  ageInput.setAttribute("placeholder", "Yaş");
  ageTd.append(ageInput);

  const optionsTd = document.createElement("td");
  const saveBtn = document.createElement("button");
  saveBtn.textContent = "Yadda saxla";
  saveBtn.classList.add("saveBtn");
  saveBtn.addEventListener("click", saveData);

  const removeBtn = document.createElement("button");
  removeBtn.textContent = "Sil";
  removeBtn.classList.add("removeBtn");
  removeBtn.addEventListener("click", removeData);

  optionsTd.append(saveBtn, removeBtn);

  row.append(noTd, nameTd, surnameTd, ageTd, optionsTd);

  tbody.append(row);
  orderRow();
});
