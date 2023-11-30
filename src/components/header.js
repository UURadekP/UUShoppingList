import { useContext, useState } from 'react'
import { Button, Form, Modal, Nav, Alert, FormControl, FormGroup } from 'react-bootstrap'
import userContext from "../userContext";
import login from './login';
import listContext from '../listContext';
import interfaceContext from '../interfaceContext';
import "../sidebar.css";

const Header = () => {

    const { userState, setUserState } = useContext(userContext);
    const { darkMode, setDarkMode, language, setLanguage } = useContext(interfaceContext);
    const { isOwner, setIsOwner, isMember, setIsMember } = useContext(listContext)
    const [loginFail, setLoginFail] = useState(false);
    const [showLogin, setShowLogin] = useState(false);
    // const [showRegister, setShowRegister] = useState(false); plánuji využít až s připojením backendu

    console.log(darkMode);

    const defaultLoginData = {
        username: 'guest',
        password: ''
    };

    const [loginFormData, setLoginFormData] = useState(defaultLoginData);

    const loginHandler = e => {
        e.preventDefault();

        let result = login(loginFormData.username, loginFormData.password);
        if (result.success) {
            delete result.success;
            setUserState(result);


            //schování login tlačítka
            hideLogin();
        } else {
            setLoginFail(true);
        }
    };
    //schování login tlačítka
    const hideLogin = () => {
        setShowLogin(false);
        setLoginFail(false);
        setLoginFormData(defaultLoginData);
    }
    //odhlášení
    const logoutHandler = e => {
        setUserState("");
        setIsOwner(false);
        setIsMember(false);

    };



    return (
        <div style={{}}>
                <Form.Check // prettier-ignore
                    type="switch"
                    style={{float: "right"}}
                    label="Dark Mode"
                    defaultChecked="true"
                    onChange={() => {setDarkMode(!darkMode)}}
                />
            <div className={darkMode === true ? 'header' : 'headerL'}>


                        <h1 style={
                            darkMode === true ? {float:'left', fontSize:'1.1em', color: "white"} : {float:'left', fontSize:'1.1em'}
                        }>Logged in as:  {(userState.username === undefined) ? ("guest") : (userState.username)}</h1>

                        {userState ? (
                            // Pokud je uživatel přihlášen
                            <Nav>
                                <Button className={darkMode === true ? "headerbutton" : "headerbuttonL"} onClick={logoutHandler}>Logout</Button>
                            </Nav>
                        ) : (
                            // Pokud uživatel není přihlášen
                            <Nav>
                                <Button className={darkMode === true ? "headerbutton" : "headerbuttonL"}  onClick={() => setShowLogin(true)}>Login</Button>
                                <Button className={darkMode === true ? "headerbutton" : "headerbuttonL"} >Register</Button>
                            </Nav>
                        )}









                <Modal dialogClassName='loginModal' show={showLogin} onHide={hideLogin}>
                    <Form onSubmit={loginHandler}>
                        <Modal.Header closeButton>
                            <Modal.Title>Login</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            {loginFail && <Alert variant='danger'>
                                Incorrect username or password
                            </Alert>}
                            <FormGroup>
                                <FormControl
                                    label='Username'
                                    type='text'
                                    placeholder='Enter username'
                                    onChange={(event) => loginFormData.username = event.target.value}
                                />
                            </FormGroup>
                            <FormGroup>
                                <FormControl
                                    label='Password'
                                    type='password'
                                    placeholder='Enter password'
                                    onChange={(event) => loginFormData.password = event.target.value}
                                />
                            </FormGroup>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button type='submit'>Login</Button>
                        </Modal.Footer>
                    </Form>
                </Modal>

            </div>
        </div>
    )
}

export default Header;