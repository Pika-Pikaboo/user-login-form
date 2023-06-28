const table = document.querySelector('table');
let dataArray = [];
let text = "";

(async () => {
  try {
    const data = await fetch('http://localhost:5000/users');
    const result = await data.json();
    dataArray = [...dataArray, ...result];
    for (let x = 0; x < dataArray.length; x++) {
      text +=
        `<tr> 
        <td>${x+1}</td>
        <td>${dataArray[x].name}</td> 
        <td>${dataArray[x].email}</td>
        <td><a href="/users/${dataArray[x]._id}/edit">Edit</a></td>
        <td><a href="/users/${dataArray[x]._id}/view">View</a></td>
        <td><a href="/users/${dataArray[x]._id}/delete?_method=DELETE" onclick="return confirm('Are you sure you want to delete this record?')">Delete</a></td>
      </tr>`;
    }

    table.innerHTML +=
      `<thead>
      <tr>
        <th>ID</th>
        <th>Name</th>
        <th>Email</th>
        <th>Edit</th>
        <th>View</th>
        <th>Delete</th>
      </tr>
      </thead>
      <tbody>${text}</tbody>
      <tfoot>
          <tr>
              <td colspan="3">Total Users:</td>
              <td colspan="3">${dataArray.length}</td>
          </tr>
      </tfoot>
    `;
  } catch (err) {
    console.error(err.stack);
  }
})();
