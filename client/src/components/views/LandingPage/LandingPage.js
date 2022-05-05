import React, { useEffect } from 'react'
import axios from "axios";

import { useNavigate } from 'react-router-dom';

function LandingPage( ) {

    useEffect(()=> {
        //send info to Sever
        axios.get('/api/hello')
        .then(response => console.log(response));

    }, [])

    const history = useNavigate();

    const onClickHandler = () => {
        axios.get('/api/users/logout')
        .then(response => {
            console.log("log out...", response.data)

            if(response.data.success) {
                history('/login');
            }else {
                alert("로그아웃을 실패했습니다.");
            }
        });
    }

    return (
        <div style={{
            display: 'flex', justifyContent: 'center', alignItems: 'center',
            width: '100%', height: '100vh'
        }}>
            <h1>시작 페이지</h1>
            <br/>
            <button onClick={onClickHandler}>
                Log out
            </button>
        </div>
    )
}

export default LandingPage;