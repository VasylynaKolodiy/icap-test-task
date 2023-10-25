'use client'
import './page.scss'
import {IconButton} from "@mui/material";
import {useEffect, useState} from "react";
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Button from "@mui/material/Button";
import {useAppStore} from "../lib/store/store";
import {useRouter} from "next/navigation";
import {TextValidator, ValidatorForm} from "react-material-ui-form-validator";

export default function Home() {
    const [isVisiblePassword, setIsVisiblePassword] = useState(false);
    const {loginResult, fetchLogin, removeUserData} = useAppStore();
    const router = useRouter();

    let [loginData, setLoginData] = useState({
        username: '',
        password: '',
    })

    const handleSetIsVisiblePassword = () => {
        setIsVisiblePassword(!isVisiblePassword);
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const login = async (event) => {
        event.preventDefault();
        fetchLogin(loginData)
    }

    useEffect(() => {
        if (loginResult?.message) {
            router.replace('/table');
        }
    }, [loginResult]);

    return (
        <main className='login'>
            <ValidatorForm className='login__form' onSubmit={(event) => login(event)}>
                <TextValidator
                    className='login__input login__input-username'
                    value={loginData.username}
                    name='username'
                    type='text'
                    label='Username'
                    variant="standard"
                    onChange={(event) => setLoginData({...loginData, username: event.target.value})}
                    validators={['required', 'maxStringLength:150']}
                    errorMessages={['Required field.', 'Max length is 150 characters.']}
                />

                <div className='login__password'>
                    <TextValidator
                        className='login__input login__input-password'
                        value={loginData.password}
                        name='password'
                        type={isVisiblePassword ? 'text' : 'password'}
                        label='Password'
                        variant="standard"
                        onChange={(event) => setLoginData({...loginData, password: event.target.value})}
                        validators={['required', 'maxStringLength:128']}
                        errorMessages={['Required field.', 'Max length is 128 characters.']}
                    />
                    <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleSetIsVisiblePassword}
                        onMouseDown={handleMouseDownPassword}
                    >
                        {isVisiblePassword ? <VisibilityOff/> : <Visibility/>}
                    </IconButton>
                    {loginResult.error && <p className='login__error'>{loginResult.error}</p>}
                </div>


                <Button
                    type='submit'
                    variant="outlined"
                    onClick={() => removeUserData()}
                >Login
                </Button>
            </ValidatorForm>

        </main>
    )
}
