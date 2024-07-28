document.addEventListener("DOMContentLoaded", () => {
  const customerForm = document.getElementById("customerForm");
  const customerTable = document
    .getElementById("customerTable")
    .getElementsByTagName("tbody")[0];

  customerForm.addEventListener("submit", (event) => {
    event.preventDefault();

    function uuidv4() {
        return "10000000-1000-4000-8000-100000000000".replace(/[018]/g, c =>
          (+c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> +c / 4).toString(16)
        );
      }

    function date() {
        const currentDate = new Date();
        const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
        return currentDate.toLocaleDateString('en-US', options);
  
    }
      
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const phone = document.getElementById("phone").value;

    const newRow = customerTable.insertRow();
    newRow.innerHTML = `
                <td>${uuidv4()}</td>
                <td>${name}</td>
                <td>${email}</td>
                <td>${phone}</td>
                <td>${date()}</td>
                <td>
                <button class="edit">Edit</button>
                <button class="delete">Delete</button>
                </td>
                `;

    customerForm.reset();
  });

  customerTable.addEventListener("click", (event) => {
    if (event.target.classList.contains("delete")) {
      event.target.parentElement.parentElement.remove();
    } else if (event.target.classList.contains("edit")) {
      const row = event.target.parentElement.parentElement;
      const name = row.cells[0].innerText;
      const email = row.cells[1].innerText;
      const phone = row.cells[2].innerText;
      const date = row.cells[3].innerText;

      document.getElementById("name").value = name;
      document.getElementById("email").value = email;
      document.getElementById("phone").value = phone;
      document.getElementById("date").value = date;

      row.remove();
    }
  });
});