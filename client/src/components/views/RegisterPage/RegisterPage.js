import { useDispatch } from "react-redux";
import React, { useState } from "react";
import { registerUser } from '../../../_actions/user_action'

import { useNavigate } from 'react-router-dom';

function RegisterPage(props) {
    // redux dispatch 추가
    const dispatch = useDispatch();

    // state 추가 -> 처음 빈칸
    const [Email, setEmail] = useState("")
    const [Name, setName] = useState("")
    const [Password, setPassword] = useState("")
    const [ConfirmPassword, setConfirmPassword] = useState("")

    // state에 change 반영
    const onEmailHandler = (event) => {
        setEmail(event.currentTarget.value);
    }
    const onNameHandler = (event) => {
        setName(event.currentTarget.value);
    }
    const onPasswordHandler = (event) => {
        setPassword(event.currentTarget.value);
    }
    const onConfirmEmailHandler = (event) => {
        setConfirmPassword(event.currentTarget.value);
    }

    let history = useNavigate();
    
    const onSubmithandler = (event) => {
        event.preventDefault();

        console.log("email- > ", Email);
        console.log("password -> ",Password);

        if(Password !== ConfirmPassword) {
            return alert("비밀번호가 동일하지 않습니다.");
        }

        let body = {
            email: Email,
            name: Name,
            password: Password
        }

        // redux dispatch를 이용해 action을 취함
        dispatch(registerUser(body))
        .then(response => {
            if(response.payload.success){
                //props.history.push('/login');
                history('/');
            }else{
                alert('Error')
                console.log(response)
            }
        })
    }


    return (
        <div style={{
            display: 'flex', justifyContent: 'center', alignItems: 'center',
            width: '100%', height: '100vh'
        }}>
            <form style={{display:'flex', flexDirection: 'column'}}
                onSubmit={onSubmithandler}>
                <label>Email</label>
                <input type="email" value={Email} onChange={onEmailHandler}/>
                <label>Name</label>
                <input type="text" value={Name} onChange={onNameHandler}/>
                <label>Password</label>
                <input type="password" value={Password} onChange={onPasswordHandler}/>
                <label>Confirm Password</label>
                <input type="password" value={ConfirmPassword} onChange={onConfirmEmailHandler}/>
                <br/>
                <button type="submit">Sign up</button>
            </form>    
        </div>
    )
}

export default RegisterPage;