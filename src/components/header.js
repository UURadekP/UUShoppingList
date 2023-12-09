import { useContext, useState } from 'react'
import { Button, Form, Modal, Nav, Alert, FormControl, FormGroup, NavDropdown } from 'react-bootstrap'
import userContext from "../userContext";
import login from './login';
import listContext from '../listContext';
import interfaceContext from '../interfaceContext';
import "../sidebar.css";
const flag_cz = require('../flag_cz.jpg');
const flag_en = require('../flag_en.png');


const Header = () => {

    const { userState, setUserState } = useContext(userContext);
    const { darkMode, setDarkMode, language, setLanguage } = useContext(interfaceContext);
    const { isOwner, setIsOwner, isMember, setIsMember } = useContext(listContext)
    const [loginFail, setLoginFail] = useState(false);
    const [showLogin, setShowLogin] = useState(false);
    // const [showRegister, setShowRegister] = useState(false); plánuji využít až s připojením backendu

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
                <div style={{float: 'right', flex: 'inline', flexWrap: 'wrap', width:'12vw', marginRight: '5%', marginTop: '1%'}}>
                <Form.Check // prettier-ignore
                    type="switch"
                    style={
                        darkMode === true ? {float: 'right', color: 'white', marginTop: '5%'}  :  {float: 'right', color: 'black', marginTop: '5%'}
                    } 
                    label="Mode"
                    defaultChecked="true"
                    onChange={() => {setDarkMode(!darkMode)}}
                />
 
            <Nav style={{float: 'right'}}>
                <NavDropdown
                    title="Language"
                    menuVariant="dark"
                >
                    <NavDropdown.Item onClick={() => setLanguage("english")}><img src={flag_en} style={{width: '20%', height: '20%'}}/> English</NavDropdown.Item>
                    <NavDropdown.Item onClick={() => setLanguage("czech")}><img src={flag_cz} style={{width: '20%', height: '20%'}}/> Czech</NavDropdown.Item>
                </NavDropdown>
            </Nav>
            </div>
            <div className={darkMode === true ? 'header' : 'headerL'}>


                        <h1 style={
                            darkMode === true ? {float: 'left', fontSize: '1em', color: 'white'} : {float: 'left', fontSize: '1em'}
                        }>{language === "english" ?'Logged in as: ' : 'Přihlášen jako: '} {(userState.username === undefined) ? ("guest") : (userState.username)}</h1>

                        {userState ? (
                            // Pokud je uživatel přihlášen
                            <Nav>
                                <Button className={darkMode === true ? "headerbutton" : "headerbuttonL"} onClick={logoutHandler}>{language === "english" ?'Logout' : 'Odhlásit'}</Button>
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
                                {language === "english" ? "Incorrect username or password" : "Nesprávné jméno nebo heslo"}
                            </Alert>}
                            <FormGroup>
                                <FormControl
                                    label={language === "english" ?'Username' : 'Jméno'}
                                    type='text'
                                    onChange={(event) => loginFormData.username = event.target.value}
                                />
                            </FormGroup>
                            <FormGroup>
                                <FormControl
                                    label={language === "english" ?'Password' : 'Heslo'}
                                    type='password'
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