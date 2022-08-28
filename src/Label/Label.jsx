import React, { useEffect, useState } from "react";
import stylab from "./Label.module.css"
import List from "./List/List"
import axios from "axios";


const instance = axios.create({
  withCredentials: true,
  baseURL: 'http://127.0.0.1:5000',
})

const Label = (props) => {

    // instance.post('/create-db-w', () => {
        
    // })

    // instance.post('/create-db-b', () => {
        
    // })

    let [title, setTitle] = useState('');
    const [whiteList, setWhiteList] = useState([]);

    let onAddName = () => {
        instance.post('/wNum', {
            carNumber: title,
        }).then((res) => {
            setWhiteList([...whiteList, {car_number: title}])
            title = ''
            console.log(res);
        })
        
    }

    useEffect(() => {
        instance.get('/wNum').then((res) => {
            setWhiteList(res.data.wNum);
        })
    }, []);


// delFunction
    let [titleForDel, setTitleForDel] = useState('');
    const [whiteListForDel, setWhiteListForDel] = useState([]);

    let onDelName = () => {
        instance.delete('/wNum/:titleForDel', {
            carNumber: titleForDel,
        }).then((res) => {
            setWhiteListForDel([...whiteListForDel, {car_number: titleForDel}])
            console.log(res);
        })
        
    }

    useEffect(() => {
        instance.get('/wNum').then((res) => {
            setWhiteListForDel(res.data.wNum);
        })
    }, []);
// delFunction

// bList-------------------------------------------------------------------------
    let [title2, setTitle2] = useState('');
    const [blackList, setBlackList] = useState([]);

    let onAddName2 = () => {
        instance.post('/bNum', {
            carNumber: title2,
        }).then((res) => {
            setBlackList([...blackList, {car_number: title2}])
            title2 = ''
            console.log(res)
        })
        
    }

    useEffect(() => {
        instance.get('/bNum').then((res) => {
            setBlackList(res.data.bNum);
        })
    }, []);
// -----------------------------------------------------------------------------


    return (
        <div className={stylab.lab} >
            <div className="white">
                <span>whiteList</span>
                <div>
                <input 
                    type="text" 
                    value={title}  onChange={(e) => setTitle(e.currentTarget.value)}
                    placeholder="Номер машины" 
                    />
                    <button onClick={onAddName}>Добавить</button>
                </div>
                <br>
                </br>
                <div>
                <input 
                    type="text" 
                    value={titleForDel}  onChange={(e) => setTitleForDel(e.currentTarget.value)}
                    placeholder="Удалить машину" 
                    />
                    <button onClick={onDelName}>Удалить</button>
                </div>
                
                <div className={stylab.names}>
                    {whiteList.map((w) => {
                        return <List name={w.car_number}/>
                    })}
                </div>
            </div>









            <div className="black">
                <span>Blacklist</span>
                <div>
                    <input 
                    type = "text"
                    value = {title2} onChange = {(e) => setTitle2(e.currentTarget.value)}
                    placeholder = "Номер машины"
                    />
                    <button onClick={onAddName2}>Добавить</button>
                </div>
                <div className = {stylab.names}>
                    {blackList.map((b) => {
                        return <List name={b.car_number}/>
                    })}
                </div>
            </div>
        </div>
    )
}


export default Label