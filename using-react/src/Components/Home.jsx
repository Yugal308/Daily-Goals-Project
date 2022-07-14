import React,{useState,useEffect} from 'react'
import Task from './Task';

const Home = () => {
    
    const initalItem = localStorage.getItem("tasks")
    ? JSON.parse(localStorage.getItem("tasks"))
    : [];

    const [tasks,setTasks] = useState(initalItem);
    const [title,setTitle] = useState("");
    const [description, setDescription] = useState("");

    const submitHandler =(e)=>{
        e.preventDefault();

        setTasks([...tasks,{
            title: title,
            description: description,
        }]);
        setTitle("");
        setDescription("");
    };

    const deleteTask = (index)=>{
        const filterArr = tasks.filter((val,i)=>{
            return i !== index;
        });
        setTasks(filterArr);
    };

    useEffect(() => {
      localStorage.setItem("tasks", JSON.stringify(tasks));
    }, [tasks])
    

  return (
    <div className="container">
        <div className="heading">
            Daily Goals
        </div>
        <form onSubmit={submitHandler}>
            <input id="title" 
            placeholder = "Enter the title" 
            required 
            value = {title}
            onChange={ (e) => setTitle(e.target.value)} 
            />
            <textarea id="desc" 
            placeholder = "Enter the description" 
            required 
            value = {description}
            onChange ={(e) => setDescription(e.target.value)}> 
            </textarea>
            <button type="submit">
                Add
            </button>
        </form>
        {tasks.map((value,index)=>(
            <Task key = {index} 
            title = {value.title} 
            description = {value.description}
            deleteTask = {deleteTask}
            index = {index} />
        ))}
    </div>
  );
}

export default Home