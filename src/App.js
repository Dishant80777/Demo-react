import React, { useState } from 'react'
import "./App.css"
import 'react-toastify/dist/ReactToastify.css';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {BsArrowDownSquareFill} from 'react-icons/bs';
import Navbar from './Navbar';
import PopUp from './PopUp';

const initialTableData = [
  {
    documentName: "Document 1",
    lastReview: "Review 1",
    receivedOn: "10-17-2023",
    importedOn: "10-17-2023",
    requestStatus: "Pending",
  },
  {
    documentName: "Document 2",
    lastReview: "Review 2",
    receivedOn: "10-17-2023",
    importedOn: "1-27-2023",
    requestStatus: "Completed",
  },
  {
    documentName: "Document 3",
    lastReview: "Review 3",
    receivedOn: "10-17-2023",
    importedOn: "6-17-2023",
    requestStatus: "Completed",
  },
  {
    documentName: "Document 4",
    lastReview: "Review 4",
    receivedOn: "7-01-2023",
    importedOn: "1-05-2023",
    requestStatus: "Pending",
  },
  {
    documentName: "Document 5",
    lastReview: "Review 5",
    receivedOn: "1-1-2023",
    importedOn: "1-24-2023",
    requestStatus: "Pending",
  },
  {
    documentName: "Document 6",
    lastReview: "Review 6",
    receivedOn: "1-17-2022",
    importedOn: "8-7-2023",
    requestStatus: "Completed",
  },
  {
    documentName: "Document 7",
    lastReview: "Review 7",
    receivedOn: "7-7-2023",
    importedOn: "10-7-2022",
    requestStatus: "Pending",
  },
  {
    documentName: "Document 8",
    lastReview: "Review 8",
    receivedOn: "1-17-2023",
    importedOn: "1-1-2023",
    requestStatus: "Pending",
  },
  {
    documentName: "Document 9",
    lastReview: "Review 9",
    receivedOn: "10-7-2023",
    importedOn: "10-1-2023",
    requestStatus: "Completed",
  },
  {
    documentName: "Document 10",
    lastReview: "Review 10",
    receivedOn: "10-17-2023",
    importedOn: "1-7-2022",
    requestStatus: "Pending",
  },
  // Add more data rows as needed
];

function App() {
  const [status, setStatus] = useState("all");
  const [name, setName] = useState("all");
  const [priority, setPriority] = useState("all");
  const [tableData, setTableData] = useState(initialTableData);
  const [selectedDate, setSelectedDate] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [openPopUp, setOpenPopUp] = useState(0);

  const handleSearch = (e) => {
    e.preventDefault();
    const filteredData = initialTableData.filter((item) => {
      const itemDate = new Date(item.importedOn);
    const selectedDateObj = selectedDate === null ? null : new Date(selectedDate);
      return (
        (status === "all" || item.requestStatus === status) &&
        (name === "all" || item.documentName === name) &&
        (priority === "all" || item.priority === parseInt(priority, 10)) &&
        (selectedDate === null || itemDate < selectedDateObj)
      );
    });
    setTableData(filteredData);
  };

  const handleReset = () => {
    setStatus("all");
    setName("all");
    setPriority("all");
    setTableData(initialTableData);
    setSelectedDate(null);
  };

  const handleOpenRequest = (item) => {
    // Placeholder function, you can implement your logic here
    console.log("Opening request for item:", item);
  };

  const handleRequestDetails = (item) => {
    // Placeholder function, you can implement your logic here
    console.log("Viewing details for item:", item);
  };

  return (
<div className="App relative">
  <Navbar/>
  <div className="left-navigation">
    <h2>DASHBOARD</h2>
    <ul>
      <li>
        <button onClick={() => setIsOpen(!isOpen)}><a className='flex flex-row items-center' href="#">FAX ADMINISTRATION{!isOpen && <BsArrowDownSquareFill/>}</a></button>
      {isOpen && (
        <div>
          <p>Option A</p>
          <p>Option B</p>
          <p>Option C</p>
        </div>
      )}
      </li>
    </ul>
  </div>
  <div className="main-content">
    <h2>Request Search</h2>
    <div className="search-bar">
  <form>
    <div className="search-options">
      <label htmlFor="status-options">Status</label>
      <select id="status-options" onChange={(e) => setStatus(e.target.value)}>
        <option value="all">All</option>
        <option value="Pending">Pending</option>
        <option value="Completed">Completed</option>
      </select>
    </div>
    <div className="search-options">
      <label htmlFor="name-options">Name</label>
      <select id="name-options" onChange={(e) => setName(e.target.value)}>
        <option value="all">All</option>
        <option value="Document 1">Document 1</option>
        <option value="Document 2">Document 2</option>
        <option value="Document 3">Document 3</option>
        <option value="Document 4">Document 4</option>
        <option value="Document 5">Document 5</option>
        <option value="Document 6">Document 6</option>
        <option value="Document 7">Document 7</option>
        <option value="Document 8">Document 8</option>
        <option value="Document 9">Document 9</option>
        <option value="Document 10">Document 10</option>
      </select>
    </div>
    <div className="search-options">
      <label htmlFor="priority-options">Priority</label>
      <select id="priority-options" onChange={(e) => setPriority(e.target.value)}>
        <option value="all">All</option>
        <option value="10">10</option>
        <option value="20">20</option>
      </select>
    </div>
    <div className="search-options">
  <label htmlFor="priority-options">Oldest Request Date</label>
  <DatePicker
    selected={selectedDate}
    onChange={(date) => setSelectedDate(date)}
    dateFormat="MM-dd-yyyy"
  />
</div>
    <div className="search-button">
      <button type="reset" onClick={handleReset}>Reset</button>
      <button type="submit" onClick={handleSearch}>Search</button>
    </div>
  </form>
</div>

    
    <h2>All Results ({tableData.length})</h2>
    <table className="data-table">
      <thead>
        <tr>
          <th>DOCUMENT NAME</th>
          <th>LAST REVIEW</th>
          <th>RECEIVED ON</th>
          <th>IMPORTED ON</th>
          <th>REQUEST STATUS</th>
          <th>OPEN REQUEST</th>
          <th>REQUEST DETAILS</th>
        </tr>
      </thead>
      <tbody>
        {tableData.map((item, index) => (
          <tr key={index}>
            <td>{item.documentName}</td>
            <td>{item.lastReview}</td>
            <td>{item.receivedOn}</td>
            <td>{item.importedOn}</td>
            <td>{item.requestStatus}</td>
            <td>
              <button onClick={() => handleOpenRequest(item)}>Open</button>
            </td>
            <td>
              <button onClick={() => handleRequestDetails(item)}>Details</button>
            </td>
          </tr>
        ))}
      </tbody>

    </table>
  </div>
  <div>
          <div className='text-right'>
            <button onClick={() => setOpenPopUp(true)}>? Fax Administartion Help</button>
          </div>
          <PopUp trigger={openPopUp} setTrigger={setOpenPopUp}>
            <h3>My PopUp</h3>
            <p>This is an example of PopUp window</p>
          </PopUp>
        </div>
</div>


  )
}

export default App