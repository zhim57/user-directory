import React, { Component } from "react";
import "./App.css";
import axios from "axios";
import { Table } from "react-bootstrap";

class App extends Component {
  // Setting the component's initial state
  state = {
    Name: "",
    Employee: [],
    Original: [],
  };

// this function loads 200 face user profiles once the component mounts
  componentDidMount() {
    axios
      .get("https://randomuser.me/api/?results=200&nat=us")
      .then((results) => {
        this.setState({
          Employee: results.data.results,
          // saving the original list so we can revert to it after a filter
          Original: results.data.results,
        });
        // console.log(results);
      });
  }


  // the sorting function by emplyee ID
  handleIdSort = (event) => {
    event.preventDefault();
    console.log(event.target);
    let sortedListId = [...this.state.Employee];
    sortedListId = sortedListId.sort((employeeA, employeeB) => {
      if (employeeA.id.value > employeeB.id.value) {
        return 1;
      }
      return -1;
    });
    this.setState({
      Employee: sortedListId,
    });
  };
// sorting function by first name
  handleFirstNameSort = (event) => {
    event.preventDefault();
    console.log(event.target);
    let sortedList = [...this.state.Employee];
    sortedList = sortedList.sort((employeeA, employeeB) => {
      if (employeeA.name.first > employeeB.name.first) {
        return 1;
      }
      return -1;
    });
    this.setState({
      Employee: sortedList,
    });
  };
// sorting by last name
  handleLastNameSort = (event) => {
    event.preventDefault();
    console.log(event.target);
    let sortedListLast = [...this.state.Employee];
    sortedListLast = sortedListLast.sort((employeeA, employeeB) => {
      if (employeeA.name.last > employeeB.name.last) {
        return 1;
      }
      return -1;
    });
    this.setState({
      Employee: sortedListLast,
    });
  };

  // sorting by email
  handleEmailSort = (event) => {
    event.preventDefault();
    console.log(event.target);
    let sortedListEmail = [...this.state.Employee];
    sortedListEmail = sortedListEmail.sort((employeeA, employeeB) => {
      if (employeeA.email > employeeB.email) {
        return 1;
      }
      return -1;
    });
    this.setState({
      Employee: sortedListEmail,
    });
  };

  // filter by the user input

  handleInputChange = (event) => {
    // Getting the value and name of the input which triggered the change   name,
    const { value } = event.target;

    console.log(event.target);
    let filteredList = [...this.state.Original];
    filteredList = filteredList.filter((employee) => {
      return (
        employee.name.first.toLowerCase().indexOf(value.toLowerCase()) >= 0
      );
    });

    // Updating the input's state
    this.setState({
      Name: value,
      Employee: filteredList,
    });
  };

  render() {

    // Notice how each input has a `value`, `name`, and `onChange` prop
    console.log(this.state.Employee);
    
    return (
      <div class="container">
      <h1> For internal use of ABC Co., please keep this data Strictly confidential!</h1>
      <div>
        <p>Find Employee By Name</p>
        <form className="form">
          <input
            value={this.state.Name}
            name="Name"
            onChange={this.handleInputChange}
            type="text"
            placeholder="Name"
          />
        </form>

        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Picture</th>
              <th>
                <a href="#3" onClick={(event) => this.handleIdSort(event)}>
                  Cell
                </a>
              </th>
              <th>
                <a
                  href="#4"
                  onClick={(event) => this.handleFirstNameSort(event)}
                >
                  First Name
                </a>
              </th>
              <th>
                {" "}
                <a
                  href="#1"
                  onClick={(event) => this.handleLastNameSort(event)}
                >
                  Last Name
                </a>
              </th>
              <th>
                <a href="#2" onClick={(event) => this.handleEmailSort(event)}>
                  Email
                </a>
              </th>
            </tr>
          </thead>
          <tbody>
            {this.state.Employee.map((emp, index) => (
              <tr key={index}>
                <td>
                  <img src={emp.picture.thumbnail} alt={emp.picture.thumbnail}></img>
                </td>
                <td>{emp.cell}</td>
                <td>{emp.name.first}</td>
                <td>{emp.name.last}</td>
                <td>{emp.email}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
      </div>
    );
  }
}

export default App;
