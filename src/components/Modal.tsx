import React, {useEffect, useState} from 'react';
import './Modal.scss'
import {Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle} from "@mui/material";
import {TextValidator, ValidatorForm} from "react-material-ui-form-validator";
import {useAppStore} from "../lib/store/store";
import {IInitialUser} from "../lib/slices/createTableSlice";

interface IModalProps {
    setOpenModal: (isOpenModal: boolean) => void,
    currentUser: IInitialUser,
    setCurrentUser: (user: IInitialUser | null) => void,
}

const Modal: React.FC<IModalProps> = ({ setOpenModal, currentUser, setCurrentUser}) => {
    const {user, addUser, removeInfo, editUser} = useAppStore();

    const initialUser = currentUser || {
        name: '',
        email: '',
        birthday_date: '',
        phone_number: '',
        address: '',
    }

    const [newUser, setNewUser] = useState(initialUser);

    const handleCloseModal = () => {
        setOpenModal(false)
        setNewUser(initialUser)
        removeInfo();
        setCurrentUser(null);
    }

    const addNewUser = async (event) => {
        event.preventDefault();
        addUser(newUser);
    }

    const editExistUser = async (event) => {
        event.preventDefault();
        editUser(currentUser.id, newUser);
    }

    useEffect(() => {
        if (user?.name === newUser.name) {
            setOpenModal(false);
            setNewUser(initialUser)
            removeInfo();
            setCurrentUser(null);
        }
    }, [user]);

    useEffect(() => {
        currentUser && setNewUser(currentUser);
    }, [currentUser]);

    return (
        <Dialog open={true} onClose={() => handleCloseModal()}>

            <DialogTitle>
                <div>Add new user</div>
                <div className='modal__close' onClick={() => handleCloseModal()}>✖</div>
            </DialogTitle>

            <ValidatorForm onSubmit={(event) => currentUser ? editExistUser(event): addNewUser(event)}>
                <DialogContent>
                    <DialogContentText>
                        Please fill out the form below. All fields are required.
                    </DialogContentText>

                    <div className='modal__inputs'>
                        <div className='modal__inputs-item'>
                            <TextValidator
                                label="Name"
                                name='name'
                                type="text"
                                variant="standard"
                                value={newUser.name}
                                onChange={(event) => setNewUser({...newUser, name: event.target.value})}
                                validators={['required', 'maxStringLength:255']}
                                errorMessages={['Required field.', 'Max length is 255 characters.']}
                            />
                            {user?.name?.[0] && <p className='modal__error'>{user?.name?.[0]}</p>}
                        </div>

                        <div className='modal__inputs-item'>
                            <TextValidator
                                label="Birthday date"
                                name='birthday_date'
                                type="text"
                                variant="standard"
                                value={newUser.birthday_date}
                                onChange={(event) => setNewUser({...newUser, birthday_date: event.target.value})}
                                validators={['required']}
                                errorMessages={['Required field.']}
                            />
                            {user?.birthday_date?.[0] && <p className='modal__error'>{user?.birthday_date?.[0]}</p>}
                        </div>

                        <div className='modal__inputs-item'>
                            <TextValidator
                                label="Email"
                                name='email'
                                type="email"
                                variant="standard"
                                value={newUser.email}
                                onChange={(event) => setNewUser({...newUser, email: event.target.value})}
                                validators={['required', 'isEmail', 'maxStringLength:254']}
                                errorMessages={['Required field.', 'This is not a valid email.', 'Max length is 254 characters.']}
                            />
                            {user?.email?.[0] && <p className='modal__error'>{user?.email?.[0]}</p>}
                        </div>

                        <div className='modal__inputs-item'>
                            <TextValidator
                                label="Address"
                                name='address'
                                type="text"
                                variant="standard"
                                value={newUser.address}
                                onChange={(event) => setNewUser({...newUser, address: event.target.value})}
                                validators={['required']}
                                errorMessages={['Required field.']}
                            />
                            {user?.address?.[0] && <p className='modal__error'>{user?.address?.[0]}</p>}
                        </div>

                        <div className='modal__inputs-item'>
                            <TextValidator
                                label="Phone number"
                                name='phone_number'
                                type='text'
                                variant="standard"
                                value={newUser.phone_number}
                                onChange={(event) => {
                                    const sanitizedValue = event.target.value.replace(/[^0-9\W]/g, '');
                                    setNewUser({ ...newUser, phone_number: sanitizedValue });
                                }}
                                validators={['required', 'maxStringLength:20']}
                                errorMessages={['Required field.', 'Max length is 20 characters.']}
                            />
                            {user?.phone_number?.[0] && <p className='modal__error'>{user?.phone_number?.[0]}</p>}
                        </div>
                    </div>
                </DialogContent>

                <DialogActions>
                    <Button
                        variant="outlined"
                        onClick={() => handleCloseModal()}
                    >Cancel
                    </Button>
                    <Button
                        variant="outlined"
                        type='submit'

                    >{currentUser ? 'Edit' : 'Add'}
                    </Button>
                </DialogActions>
            </ValidatorForm>

        </Dialog>

    );
};

export default Modal;