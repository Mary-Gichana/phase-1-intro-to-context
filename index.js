// Your code here
function createEmployeeRecord(employeeArray) {
  return {
    firstName: employeeArray[0],
    familyName: employeeArray[1],
    title: employeeArray[2],
    payPerHour: employeeArray[3],
    timeInEvents: [],
    timeOutEvents: [],
  };
}
function createEmployeeRecords(recordsArray) {
  return recordsArray.map(createEmployeeRecord);
}
function createTimeInEvent(employee, dateStamp) {
  let [date, hour] = dateStamp.split(" ");
  employee.timeInEvents.push({
    type: "TimeIn",
    hour: parseInt(hour, 10),
    date: date,
  });
  return employee;
}

function createTimeOutEvent(employee, dateStamp) {
  let [date, hour] = dateStamp.split(" ");
  employee.timeOutEvents.push({
    type: "TimeOut",
    hour: parseInt(hour, 10),
    date: date,
  });
  return employee;
}
function hoursWorkedOnDate(employee, date) {
  let timeIn = employee.timeInEvents.find((e) => e.date === date);
  let timeOut = employee.timeOutEvents.find((e) => e.date === date);

  if (timeIn && timeOut) {
    return (timeOut.hour - timeIn.hour) / 100;
  } else {
    return 0;
  }
}
function wagesEarnedOnDate(employee, date) {
  let hours = hoursWorkedOnDate(employee, date);
  return hours * employee.payPerHour;
}
function allWagesFor(employee) {
  let eligibleDates = employee.timeInEvents.map((e) => e.date);

  return eligibleDates.reduce((total, date) => {
    return total + wagesEarnedOnDate(employee, date);
  }, 0);
}
function calculatePayroll(employees) {
  return employees.reduce((total, employee) => {
    return total + allWagesFor(employee);
  }, 0);
}
