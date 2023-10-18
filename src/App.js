import React, { useState } from 'react'
import "./App.css"
import 'react-toastify/dist/ReactToastify.css';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {BsArrowDownSquareFill} from 'react-icons/bs';
import Navbar from './Components/Navbar';
import PopUp from './PopUp';
import initialTableData from './Records.json'
import {createContext} from 'react';
import ReactSwitch from "react-switch";

export const ThemeContext= createContext(null);

function App() {

  const [status, setStatus] = useState("all");
  const [name, setName] = useState("all");
  const [priority, setPriority] = useState("all");
  const [tableData, setTableData] = useState(initialTableData);
  const [selectedDate, setSelectedDate] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [openPopUp, setOpenPopUp] = useState(0);
  const [theme,setTheme]= useState("dark");

  const toggleTheme=()=>{
    setTheme((curr)=>(curr==="light" ? "dark" : "light"));
  }
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
    <ThemeContext.Provider value={{theme,toggleTheme}}>
<div className="App" id={theme}>
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
    <div className='flex justify-end gap-2 items-center'>
    <label>Theme Change</label>
    <ReactSwitch onChange={toggleTheme} checked={theme==="dark"}/>
  </div>
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
</ThemeContext.Provider>

  )
}

export default App