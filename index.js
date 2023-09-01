const inquirer = require('inquirer');
const mysql = require('mysql2');

// Create a database connection
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '1234',
  database: 'employee_db' 
});

// Connect to the database
connection.connect(err => {
  if (err) throw err;
  console.log('Connected to the database');
  startApp();
});

// Function to start the application
function startApp() {
  inquirer.prompt([
    {
      type: 'list',
      name: 'action',
      message: 'What would you like to do?',
      choices: [
        'View All Departments',
        'View All Roles',
        'View All Employees',
        'Add a Department',
        'Add a Role',
        'Add an Employee',
        'Update Employee Role',
        'Exit'
      ]
    }
  ]).then(answer => {
    switch (answer.action) {
      case 'View All Departments':
        // Call a function to view all departments
        viewDepartments();
        break;
      case 'View All Roles':
        // Call a function to view all roles
        viewRoles();
        break;
      case 'View All Employees':
        // Call a function to view all employees
        viewEmployees();
        break;
      case 'Add a Department':
        // Call a function to add a department
        addDepartment();
        break;
      case 'Add a Role':
        // Call a function to add a role
        addRole();
        break;
      case 'Add an Employee':
        // Call a function to add an employee
        addEmployee();
        break;
      case 'Update Employee Role':
        // Call a function to update an employee's role
        updateEmployeeRole();
        break;
      case 'Exit':
        connection.end();
        console.log('Goodbye!');
        break;
    }
  });
}

// Function to view all departments
function viewDepartments() {
  connection.query('SELECT * FROM department', (err, results) => {
    if (err) throw err;
    console.table(results);

    // After displaying the data, prompt the user for the next action
    inquirer.prompt([
      {
        type: 'confirm',
        name: 'continue',
        message: 'Do you want to go back to the main menu?',
        default: true
      }
    ]).then(answer => {
      if (answer.continue) {
        startApp(); // Go back to the main menu
      } else {
        connection.end();
        console.log('Goodbye!');
      }
    });
  });
}

// Function to view all roles
function viewRoles() {
  connection.query('SELECT * FROM role', (err, results) => {
    if (err) throw err;
    console.table(results);
    inquirer.prompt([
      {
        type: 'confirm',
        name: 'continue',
        message: 'Do you want to go back to the main menu?',
        default: true
      }
    ]).then(answer => {
      if (answer.continue) {
        startApp(); // Go back to the main menu
      } else {
        connection.end();
        console.log('Goodbye!');
      }
    });
  });
}

// Function to view all employees
function viewEmployees() {
  connection.query('SELECT * FROM employee', (err, results) => {
    if (err) throw err;
    console.table(results);
    inquirer.prompt([
      {
        type: 'confirm',
        name: 'continue',
        message: 'Do you want to go back to the main menu?',
        default: true
      }
    ]).then(answer => {
      if (answer.continue) {
        startApp(); // Go back to the main menu
      } else {
        connection.end();
        console.log('Goodbye!');
      }
    });
  });
}

// Function to add a department
function addDepartment() {
  inquirer.prompt([
    {
      type: 'input',
      name: 'name',
      message: 'Enter the department name:'
    }
  ]).then(answer => {
    connection.query('INSERT INTO department (name) VALUES (?)', [answer.name], (err, results) => {
      if (err) throw err;
      console.log('Department added successfully!');
      startApp(); // Go back to the main menu
    });
  });
}

// Function to add a role
function addRole() {
  inquirer.prompt([
    {
      type: 'input',
      name: 'title',
      message: 'Enter the role title:'
    },
    {
      type: 'input',
      name: 'salary',
      message: 'Enter the role salary:'
    },
    {
      type: 'input',
      name: 'department_id',
      message: 'Enter the department ID for this role:'
    }
  ]).then(answer => {
    const { title, salary, department_id } = answer;
    connection.query('INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)', [title, salary, department_id], (err, results) => {
      if (err) throw err;
      console.log('Role added successfully!');
      startApp(); // Go back to the main menu
    });
  });
}

// Function to add an employee
function addEmployee() {
  inquirer.prompt([
    {
      type: 'input',
      name: 'first_name',
      message: "Enter the employee's first name:"
    },
    {
      type: 'input',
      name: 'last_name',
      message: "Enter the employee's last name:"
    },
    {
      type: 'input',
      name: 'role_id',
      message: "Enter the role ID for this employee:"
    },
    {
      type: 'input',
      name: 'manager_id',
      message: "Enter the manager ID for this employee (or leave empty if none):"
    }
  ]).then(answer => {
    const { first_name, last_name, role_id, manager_id } = answer;
    connection.query('INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)', [first_name, last_name, role_id, manager_id || null], (err, results) => {
      if (err) throw err;
      console.log('Employee added successfully!');
      startApp(); // Go back to the main menu
    });
  });
}

// Function to update an employee's role
function updateEmployeeRole() {
  // Fetch employee list
  connection.query('SELECT id, first_name, last_name FROM employee', (err, employees) => {
    if (err) throw err;

    inquirer.prompt([
      {
        type: 'list',
        name: 'employee_id',
        message: 'Select an employee to update:',
        choices: employees.map(employee => ({
          value: employee.id,
          name: `${employee.first_name} ${employee.last_name}`
        }))
      },
      {
        type: 'input',
        name: 'new_role_id',
        message: 'Enter the new role ID for this employee:'
      }
    ]).then(answer => {
      const { employee_id, new_role_id } = answer;
      connection.query('UPDATE employee SET role_id = ? WHERE id = ?', [new_role_id, employee_id], (err, results) => {
        if (err) throw err;
        console.log('Employee role updated successfully!');
        startApp(); // Go back to the main menu
      });
    });
  });
}


