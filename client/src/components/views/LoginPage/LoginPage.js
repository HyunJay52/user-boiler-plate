import { useDispatch } from "react-redux";
// import axios from "axios";
import React, { useState } from "react";
import { loginUser } from '../../../_actions/user_action'

import { useNavigate } from 'react-router-dom'

function LoginPage(props) {
    // redux dispatch 추가
    const dispatch = useDispatch();

    // state 추가 -> 처음 빈칸
    const [Email, setEmail] = useState("")
    const [Password, setPassword] = useState("")
    // state에 change 반영
    const onEmailHandler = (event) => {
        setEmail(event.currentTarget.value);
    }
    const onPasswordHandler = (event) => {
        setPassword(event.currentTarget.value);
    }

    const history = useNavigate();

    const onSubmithandler = (event) => {
        event.preventDefault();

        console.log("email- > ", Email);
        console.log("password -> ",Password);

        let body = {
            email: Email,
            password: Password
        }

        // redux dispatch를 이용해 action을 취함
        // 아래 request 처리 부분을 redux에서 실행함 -> user_action.js
        // axios.post('/api/users/login', body).then(response => {response.data});
        // loginUser === action name
        dispatch(loginUser(body))
        .then(response => {
            //로그인 성공시 랜딩페이지로 이동
            if(response.payload.loginSuccess){
                // props.first.history.push('/')
                history('/')
            }else{
                alert('Error')
                console.log(response)
            }
        })
        // action > reducer > store > subscribe > react component > dispatch(action) > action 
    }

    return (
        <div style={{
            display: 'flex', justifyContent: 'center', alignItems: 'center',
            width: '100%', height: '100vh'
        }}>
            <form style={{display:'flex', flexDirection: 'column'}}
                onSubmit={onSubmithandler}
            >
                <label>Email</label>
                <input type="email" value={Email} onChange={onEmailHandler}/>
                <label>Password</label>
                <input type="password" value={Password} onChange={onPasswordHandler}/>
                <br/>
                <button type="submit">Login</button>
            </form>    
        </div>
    )
}

export default LoginPage;