import axios from 'axios'
import React, { useEffect,useState } from 'react'
import { Button, Form, Table } from 'react-bootstrap'
import './tables.scss'
function Tables() {
  const [inputdata, setinputdata] = useState("")
  const [inputeditdata, setinputeditdata] = useState("")
  const [tododata, settododata]= useState([])
  const [btn,setbtn]=useState(0)
  const [editbtn,seteditbtn]=useState(false)
useEffect(() => {
  axios.get('http://localhost:5000/api/todo/getall').then((data)=>{
    settododata(data.data)
  })
}, [btn])

const handlechange=(e)=>{
  console.log(e.target.value)
  setinputdata(e.target.value)
}
const handlechangeedit=(e)=>{
  console.log(e.target.value)
  setinputeditdata(e.target.value)
}

const Add=()=>{
  console.log(inputdata)
  setinputdata("")
  axios.post('http://localhost:5000/api/todo/add',{Task:inputdata,Complete:false}).then((data)=>{
    console.log(data)
    setbtn(btn+1)
  })
}

const Delete=(e)=>{
  axios.delete(`http://localhost:5000/api/todo/delete${e.target.id}`).then((obj)=>{
    console.log(obj)
    setbtn(btn+1)
  })
}

const Edit=()=>{
  seteditbtn(true)
}

const okbtn=(e)=>{
  seteditbtn(false)
  console.log(e.target.id)
  axios.put(`http://localhost:5000/api/todo/put${e.target.id}`,{Task:inputeditdata,Complete:false}).then((obj)=>{
    console.log(obj)
    setbtn(btn+1)
  })
}

const handlecheck=(e)=>{
  axios.put(`http://localhost:5000/api/todo/put${e.target.id}`,{Complete:e.target.checked}).then((obj)=>{
    console.log(obj)
    setbtn(btn+1)
  })
}

  return (
    <div className='maintodo'>
      <h1>Todo List</h1>
      <div className="forms">
        <input type="text" placeholder='Enter Task' className='inputtext' value={inputdata} onChange={handlechange}/>
        <button onClick={Add}>Add</button>
        </div> 

        <div className="tablesdesign">
        {tododata.length>0 ? <Table bordered hover size="sm">
  <thead>
    <tr>
      <th>status</th>
      <th>Task</th>
      <th>Edit</th>
      <th>Delete</th>
    </tr>
  </thead>
  <tbody>
    {tododata.map((obj,i)=>{
      return (
      <tr key={obj._id}>
      <td>
      <input type="checkbox" name="" checked={obj.Complete} id={obj._id} onChange={handlecheck}/>
      </td>
      <td key={obj._id} className='tasks'>{editbtn ? <span><input type='text' key={obj._id} id={obj._id} defaultValue={obj.Task} onChange={handlechangeedit}/><Button variant='info' id={obj._id} onClick={okbtn}>OK</Button></span> :obj.Task}</td>
      <td><Button variant="outline-info" key={obj._id} onClick={Edit} >Edit</Button></td>
      <td><Button variant="outline-danger" key={obj._id} onClick={Delete} id={obj._id}>Delete</Button></td>
    </tr>
      )
    })}
    
  </tbody>
</Table>:<p>no data..! <br/> please Add Task</p>}
        </div>

    </div>
  )
}

export default Tables