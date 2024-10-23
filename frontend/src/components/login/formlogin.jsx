
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "./formlogin.css";

const FormLogin = () => {
    const [username, usernameupdate] = useState('');
    const [password, passwordupdate] = useState('');

    const usenavigate=useNavigate();

    useEffect(()=>{
    sessionStorage.clear();
    },[]);

    const ProceedLogin = (e) => {
        e.preventDefault();
        if (validate()) {
            fetch("http://localhost:3000/user/" + username).then((res) => {
                return res.json();
            }).then((resp) => {
                if (Object.keys(resp).length === 0) {
                    toast.error('Tên đăng nhập không đúng');
                } else {
                    if (resp.password === password) {
                        toast.success('Đăng nhập thành công');
                        sessionStorage.setItem('username',username);
                        sessionStorage.setItem('userrole',resp.role);
                        usenavigate('/')
                    }else{
                        toast.error('Mật khẩu không đúng');
                    }
                }
            }).catch((err) => {
                toast.error('Đăng nhập thất bại :' + err.message);
            });
        }
    }

    // const ProceedLoginusingAPI = (e) => {
    //     e.preventDefault();
    //     if (validate()) {
    //         ///implentation
    //         // console.log('proceed');
    //         let inputobj={"username": username,
    //         "password": password};
    //         fetch("https://localhost:44308/User/Authenticate",{
    //             method:'POST',
    //             headers:{'content-type':'application/json'},
    //             body:JSON.stringify(inputobj)
    //         }).then((res) => {
    //             return res.json();
    //         }).then((resp) => {
    //             console.log(resp)
    //             if (Object.keys(resp).length === 0) {
    //                 toast.error('Login failed, invalid credentials');
    //             }else{
    //                  toast.success('Success');
    //                  sessionStorage.setItem('username',username);
    //                  sessionStorage.setItem('jwttoken',resp.jwtToken);
    //                usenavigate('/')
    //             }
    //             // if (Object.keys(resp).length === 0) {
    //             //     toast.error('Please Enter valid username');
    //             // } else {
    //             //     if (resp.password === password) {
    //             //         toast.success('Success');
    //             //         sessionStorage.setItem('username',username);
    //             //         usenavigate('/')
    //             //     }else{
    //             //         toast.error('Please Enter valid credentials');
    //             //     }
    //             // }
    //         }).catch((err) => {
    //             toast.error('Login Failed due to :' + err.message);
    //         });
    //     }
    // }
    const validate = () => {
        let result = true;
        if (username === '' || username === null) {
            result = false;
            toast.warning('Hãy nhập tên đăng nhập');
        }
        if (password === '' || password === null) {
            result = false;
            toast.warning('Hãy nhập mật khẩu');
        }
        return result;
    }
    return (
        <form onSubmit={ProceedLogin} className="cover">
            <h1> REGISTRY TOTAL </h1>
            <input type="text" value={username} onChange={e => usernameupdate(e.target.value)} className="input-botton" placeholder="USERNAME"/>
            <input type="password" value={password} onChange={e => passwordupdate(e.target.value)} className="input-botton" placeholder="PASSWORD"/>
            <button type="submit" className="login-btn" >Đăng nhập</button>
        </form> 
    )
}
export default FormLogin