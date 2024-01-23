"use strict";

const $ = document.getElementById.bind(document);

const submitBtn = $("submit-btn");
const idInput = $("input-id");
const nameInput = $("input-name");
const ageInput = $("input-age");
const typeInput = $("input-type");
const weightInput = $("input-weight");
const lengthInput = $("input-length");
const colorInput = $("input-color-1");
const breedInput = $("input-breed");
const vaccinatedInput = $("input-vaccinated");
const dewormedInput = $("input-dewormed");
const sterilizedInput = $("input-sterilized");

const tableBodyEl = $("tbody");

const showHealthyPet = $("healthy-btn");
const calculateBtn = $("calculate-btn");

const petArr = [];

// click Submit
submitBtn.addEventListener("click", function (e) {
  const data = {
    id: idInput.value,
    name: nameInput.value,
    age: ageInput.value,
    type: typeInput.value,
    weight: weightInput.value,
    lengths: lengthInput.value,
    color: colorInput.value,
    breed: breedInput.value,
    vaccinated: vaccinatedInput.checked,
    dewormed: dewormedInput.checked,
    sterilized: sterilizedInput.checked,
    date: new Date(),
    BMI: "?",
  };

  // Check data input
  let message = "";
  function validateData(data) {
    if (
      data.id == "" ||
      data.name == "" ||
      data.age == "" ||
      data.weight == "" ||
      data.lengths == "" ||
      data.color == ""
    ) {
      message += "You must enter complete information! <br>";
    }
    if (data.id !== "") {
      for (let i = 0; i < petArr.length; i++) {
        let id;
        id = petArr[i].id;
        if (id == data.id) {
          message += "ID must be unique! <br>";
        }
      }
    }
    if (data.age < 1 || data.age > 15) {
      message += "Age must be between 1 and 15! <br>";
    }
    if (data.weight < 1 || data.weight > 15) {
      message += "Weight must be between 1 and 15! <br>";
    }
    if (data.lengths < 1 || data.lengths > 100) {
      message += "Length must be between 1 and 100! <br>";
    }
    if (data.type == "") {
      message += "Please select Type! <br>";
    }
    if (data.breed == "") {
      message += "Please select Breed! <br>";
    }
    if (message == "") {
      return true;
    } else {
      $("message").innerHTML = message;
      return false;
    }
  }

  // Call function
  const validate = validateData(data);
  if (validate) {
    petArr.push(data);
    renderTableData(petArr);
    clearInput();
    $("message").innerHTML = "";
  }
});

//Render table
function renderTableData(outputArr) {
  tableBodyEl.innerHTML = "";

  for (let i = 0; i < outputArr.length; i++) {
    // Check fale, true để chọn class
    let vaccinatedCheck = `bi bi-${
      outputArr[i].vaccinated ? "check" : "x"
    }-circle-fill`;

    let dewormedCheck = `bi bi-${
      outputArr[i].dewormed ? "check" : "x"
    }-circle-fill`;

    let sterilizedCheck = `bi bi-${
      outputArr[i].sterilized ? "check" : "x"
    }-circle-fill`;

    // get day
    let day = outputArr[i].date.getDate();
    let month = outputArr[i].date.getMonth() + 1;
    let year = outputArr[i].date.getFullYear();
    if (day < 10) {
      day = "0 " + day;
    }
    if (month < 10) {
      month = "0" + month;
    }
    let date = `${month}/${day}/${year}`;

    // Render Table
    const row = document.createElement("tr");
    row.innerHTML = `<th scope="row">${outputArr[i].id}</th>
    <td>${outputArr[i].name}</td>
    <td>${outputArr[i].age}</td>
    <td>${outputArr[i].type}</td>
    <td>${outputArr[i].weight} kg</td>
    <td>${outputArr[i].lengths} cm</td>
    <td>${outputArr[i].breed}</td>
    <td>
      <i class="bi bi-square-fill" style="color: ${outputArr[i].color}"></i>
    </td>
    <td><i class="${vaccinatedCheck}"></i></td>
    <td><i class="${dewormedCheck}"></i></td>
    <td><i class="${sterilizedCheck}"></i></td>
    <td>${outputArr[i].BMI}</td>
    <td>${date}</td>
    <td>
      <button type="button" class="btn btn-danger" onclick="deletePet('${outputArr[i].id}')" >Delete</button>
    </td>`;
    tableBodyEl.appendChild(row);
  }
}

// Clear Input
const clearInput = () => {
  idInput.value = "";
  nameInput.value = "";
  ageInput.value = "";
  typeInput.value = "";
  weightInput.value = "";
  lengthInput.value = "";
  breedInput.value = "";
  colorInput.value = "#000000";
  vaccinatedInput.checked = false;
  dewormedInput.checked = false;
  sterilizedInput.checked = false;
};

// Delete Pet
const deletePet = (petId) => {
  if (confirm("Are you sure?")) {
    let index = petArr.findIndex((x) => x.id === petId);
    petArr.splice(index, 1);
    renderTableData(petArr);
  }
};

//Show pet
let healthyCheck = false;
showHealthyPet.addEventListener("click", function (e) {
  if (!healthyCheck) {
    const healthyPetArr = petArr.filter(
      (pet) =>
        (pet.vaccinated == true) & (pet.dewormed == true) &&
        pet.sterilized == true
    );
    renderTableData(healthyPetArr);
    showHealthyPet.textContent = "Show All Pet";
    return (healthyCheck = true);
  } else {
    renderTableData(petArr);
    showHealthyPet.textContent = "Show Healthy Pet";
    return (healthyCheck = false);
  }
});

// calculate
// Khi click function thi sẽ update giá trị của petArr.BMI và thay the vào petArr
calculateBtn.addEventListener("click", function (e) {
  let BMI;
  for (let i = 0; i < petArr.length; i++) {
    BMI =
      (petArr[i].weight * (petArr[i].type === "Dog" ? 703 : 886)) /
      petArr[i].lengths ** 2;
    petArr[i].BMI = BMI.toFixed(2);
  }
  renderTableData(petArr);
});
