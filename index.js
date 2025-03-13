// API: Retrieve Students Above Threshold
// ---------------------------------------
// Task:
// Implement an API to fetch students whose total marks exceed a given threshold.
//
// Endpoint:
// POST /students/above-threshold
//
// Request Body:
// {
//   "threshold": <number>
// }
//
// Response:
// Success: List of students with their names and total marks who meet the criteria.
// Example:
// {
//   "count": 2,
//   "students": [
//     { "name": "Alice Johnson", "total": 433 },
//     { "name": "Bob Smith", "total": 410 }
//   ]
// }
//
// No Matches:
// {
//   "count": 0,
//   "students": []
// }
//
// Purpose:
// Help teachers retrieve and analyze student performance efficiently.


const express = require('express');
const { resolve } = require('path');
const data = require('./data.json');

const app = express();
const port = 3010;

app.use(express.static('static'));

app.use(express.json());

app.get('/', (req, res) => {
  res.sendFile(resolve(__dirname, 'pages/index.html'));
});
app.post('/students/above-threshold',(req, res) => {
  try{
    const {threshold} = req.body;
    if(!threshold){
      return res.status(500).send({msg:"please provide threshold"})
    }
    const studentData = data.map((ele)=>{
      return {name: ele.name,total:ele.total}
    }).filter((data)=>{
      return data.total > threshold;
    })

    return res.status(200).send({count: studentData.length,students: studentData})


  }catch(err){
    return res.status(500).send({msg:"something went wrong",err})

  }
})




app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});