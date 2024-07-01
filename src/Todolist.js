import { useState , useEffect } from "react";

function Todolist(){
    const [arr , setArray] = useState([]); 
    const [newtask , setnewtask] = useState(""); 
    const [isEditing , setIsEditing] = useState(false);
    const [currentIndex , setCurrentIndex] = useState(null);

    useEffect(()=>{
        async function fetchData(){
            let response = await fetch('https://jsonplaceholder.typicode.com/todos');
            let data = await response.json();
            setArray(data)
        }
        fetchData();
    },[]);
    
    function Adding(){
        setArray([{title: newtask},...arr]);
        setnewtask('');
    }
    function Deleting(i){
        const updatedArr = arr.filter((element,id)=> i!==id)
        setArray(updatedArr);
    }
    function Edit(i){
        setIsEditing(true);
        setCurrentIndex(i);
        setnewtask(arr[i].title);
    }
    function Update(){
        setArray(prevArr => {
            const updatedArr = prevArr.map((item, index) => 
              index === currentIndex ? { ...item, title: newtask } : item
            );
            return updatedArr;
        });
        setnewtask('');
        setIsEditing(false);
        setCurrentIndex(null);
    }
    function Removeall(){
        setArray([]);
    }
    return(
        <div className="to-do-list">

            <h1>To-do-list</h1>
            <div>
                <input type="text" placeholder="write to add" value={newtask} onChange={(e) => setnewtask(e.target.value)}/>
                <button className="add-button" onClick={isEditing ? Update : Adding }>
                {isEditing ? 'Update': "Add"}</button>
            </div>
            
            <ol className="list">
                {arr.map((item,i)=>(
                    <li key={i}>
                        <span className="text">{item.title}</span>
                        <button className="delete-button" onClick={()=>Deleting(i)}>Remove</button>
                        <button className="edit-button" onClick={()=>Edit(i)}>Edit</button>
                    </li>
                ))}
                {arr.length>=1 && <button className="delete-button" onClick={()=>Removeall()}>RemoveAll</button>}
            </ol>
        </div>

    )

}

export default Todolist;
