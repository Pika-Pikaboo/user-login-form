const table = document.querySelector('table');
let dataArray = [];
let text = "";

(async () => {
  try {
    const data = await fetch('http://localhost:5000/users/:id/data');
    const result = await data.json();
    dataArray = [...dataArray, ...result];
    for (let x = 0; x < dataArray.length; x++) {
      text += `
      <tbody>
        <tr>
          <td>Name</td>
          <td>${dataArray[x].name}</td>
        </tr>
        <tr>
          <td>Email</td>
          <td>${dataArray[x].email}</td>
        </tr>
        <tr>
          <td>Salt</td>
          <td>${dataArray[x]._salt}</td>
        </tr>
        <tr>
          <td>Hash Password</td>
          <td>${dataArray[x].password}</td>
        </tr>
      </tbody>
      `;
    }
    table.innerHTML += `
      <thead>
        <tr>
          <th></th>
          <th>Details</th>
        </tr>
      </thead>
      ${text}
    `;
  } catch (err) {
    console.error(err.stack);
  } finally {
    console.log('Finished fetching all users\' data');
  }
})();
