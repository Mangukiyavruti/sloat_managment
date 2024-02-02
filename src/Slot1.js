// // import logo from './logo.svg';
// import './App.css';
// import { useState } from "react";

// function Slot1() {

//   let [time1, setTime1] = useState("");
//   let [time2, setTime2] = useState("");
//   let [slots, setSlots] = useState([]);

//   const generateSlots = () => {
//     if (time1 && time2) {
//       const [startHour, startMinute] = time1.split(":").map(Number);
//       const [endHour, endMinute] = time2.split(":").map(Number);
  
//       const startTime = new Date(2024, 0, 1, startHour, startMinute);
//       let endTime = new Date(2024, 0, 1, endHour, endMinute);
  
//       // If end time is before start time, assume it's on the next day
//       if (endTime < startTime) {
//         endTime.setDate(endTime.getDate() + 1);
//       }
  
//       const slotArray = [];
//       let currentTime = startTime;
  
//       while (currentTime <= endTime) {
//         const hours = currentTime.getHours();
//         const minutes = currentTime.getMinutes();
  
//         const period = hours >= 12 ? 'PM' : 'AM';
//         const formattedHours = (hours % 12 === 0 ? 12 : hours % 12).toString().padStart(2, '0');
//         const formattedMinutes = minutes.toString().padStart(2, '0');
  
//         const timeString = `${formattedHours}:${formattedMinutes} ${period}`;	
//         slotArray.push(timeString);
  
//         currentTime.setMinutes(currentTime.getMinutes() + 10);
//       }
  
//       setSlots(slotArray);
//     }
//   };
  

//   return (
//     <div className="App">
//       <center>
//         <div className='slot'>
//           Enter Starting Time :<br /><input type='time' onChange={(e) => { setTime1(e.target.value) }}></input><br />
//           Enter Ending Time :<br /><input type='time' onChange={(e) => { setTime2(e.target.value) }}></input>
//         </div>
//         <div className='slot_button'>
//           <button onClick={generateSlots}>Click</button>
//         </div>
//         {
//             slots.length > 0 && (
//             <div>
//                 <h3>Time Slots:</h3>
//                 {slots.map((slot, index) => (
//                     <table border={1}>
//                         <tr>
//                             <td key={index}>{slot}</td>
//                         </tr>
//                     </table>     
//                 ))}
//             </div>
//             )
//         }
//       </center>
//     </div>
//   );
// }

// export default Slot1;




import React, { useState } from "react";
import './App.css';

function Sloat1() {
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [timeSlots, setTimeSlots] = useState([]);

  const handleButtonClick = () => {
    console.log("Start Time:", startTime);
    console.log("End Time:", endTime);

    generateTimeSlots(startTime, endTime);
  };

  const generateTimeSlots = (start, end) => {
    // Convert start and end times to minutes
    const startTimeInMinutes = convertTimeToMinutes(start);
    const endTimeInMinutes = convertTimeToMinutes(end);
  

    console.log(start)
    console.log(end)

    console.log(startTimeInMinutes)
    console.log(endTimeInMinutes)

    // Define the duration for each time slot (10 minutes)
    const slotDuration = 10;
  
    // Array to store the generated time slots
    const slots = [];
  
    // Generate time slots at 10-minute intervals
    for (let currentTime = startTimeInMinutes; currentTime <= endTimeInMinutes; currentTime += slotDuration) {
      // Convert currentTime back to hh:mm format
      const formattedTime = convertMinutesToTime(currentTime);
      console.log("currentTime"+currentTime)
      console.log("formattesTime"+formattedTime)

      slots.push(formattedTime);
    }


    if (slots.length > 0 && slots[slots.length - 1] !== end) {
      // If not, add the exact end time as the last slot
      slots.push(end);
    }
  
  
    setTimeSlots(slots);
  };
  
  const convertTimeToMinutes = (time) => {
    const [hours, minutes] = time.split(":");
    return parseInt(hours, 10) * 60 + parseInt(minutes, 10);
  };
  
  const convertMinutesToTime = (minutes) => {
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    return `${String(hours).padStart(2, "0")}:${String(remainingMinutes).padStart(2, "0")}`;
  };
  
  

  return (
    <div className="App">
      <input 
        type='time' 
        value={startTime} 
        onChange={(e) => setStartTime(e.target.value)}
      />
      <input 
        type='time' 
        value={endTime} 
        onChange={(e) => setEndTime(e.target.value)}
      />

      <input 
        type='button' 
        value={"click"} 
        onClick={handleButtonClick}
      />

      {startTime && <p>Start Time: {startTime}</p>}
      {endTime && <p>End Time: {endTime}</p>}

      {timeSlots.length > 0 && (
        <div>
          <h3>Time Slots:</h3>
          {timeSlots.map((slot, index) => (
            <p key={index}>{slot}</p>
          ))}
          <p>Total Slots: {timeSlots.length}</p>
        </div>
      )}
    </div>
  );
}

export default Sloat1;
