import { useEffect, useState } from "react";

function Boom(){
    const [arr, setArr] = useState([])
    const [str , setstr] = useState('');
    const [edit , setedit] = useState(false);
    const [count , setcount] = useState(null);

    useEffect(()=>{
        async function fetchData(){
            let response = await fetch('https://jsonplaceholder.typicode.com/todos');
            let data = await response.json();
            setArr(data)
        }
        fetchData();
    },[])

    function Add(){
        setArr((arr)=>[{title : str}, ...arr])
        setstr('');
    }
    function Delete(i){
        setArr((arr)=> arr.filter((e,id) => i!=id))
    }
    function Edit(id){
        setedit(true);
        setcount(id);
        setstr(arr[id].title);
    }
    function Update(){
        setArr((prevArr)=>{
            const updatedArr = prevArr.map((element , id)=> (id === count? {...element,title:str} : element));
            return updatedArr;
        })
        setstr('')
        setedit(false);
        setcount(null);
    }

    return(
        <div>
            <h1>TodoApp</h1>
            <div>
                <input placeholder="write to add.." value={str} onChange={(e)=>setstr(e.target.value)}></input>
                <button onClick={edit?Update:Add}>{edit?"Update":"Add"}</button>
            </div>
            
            <ol>
                {arr.map((element,id)=>
                    <li key={id}>
                        <span>{element.title}</span>
                        <button className="delete-button" onClick={()=>Delete(id)}>Remove</button>
                        <button className="edit-button" onClick={()=>Edit(id)}>Edit</button>
                    </li>
                )}
            </ol>

        </div>
    )
}
export default Boom;
