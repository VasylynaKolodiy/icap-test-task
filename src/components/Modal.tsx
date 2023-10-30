import React, {useEffect, useState} from 'react';
import './Modal.scss'
import {Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle} from "@mui/material";
import {TextValidator, ValidatorForm} from "react-material-ui-form-validator";
import {useAppStore} from "../lib/store/store";
import {IRow} from "../models/interfaces";

interface IModalProps {
    setOpenModal: (isOpenModal: boolean) => void,
    currentRow: IRow,
    setCurrentRow: (row: IRow | null) => void,
}

const Modal: React.FC<IModalProps> = ({ setOpenModal, currentRow, setCurrentRow}) => {
    const {row, addRow, clearRow, editRow} = useAppStore();

    const initialRow = currentRow || {
        name: '',
        email: '',
        birthday_date: '',
        phone_number: '',
        address: '',
    }

    const [newRow, setNewRow] = useState(initialRow);

    const handleCloseModal = () => {
        setOpenModal(false)
        setNewRow(initialRow)
        clearRow();
        setCurrentRow(null);
    }

    const addNewRow = async (event) => {
        event.preventDefault();
        addRow(newRow);
    }

    const editExistRow = async (event) => {
        event.preventDefault();
        editRow(currentRow.id, newRow);
    }

    useEffect(() => {
        if (row?.name === newRow.name) {
            setOpenModal(false);
            setNewRow(initialRow)
            clearRow();
            setCurrentRow(null);
        }
    }, [row]);

    useEffect(() => {
        currentRow && setNewRow(currentRow);
    }, [currentRow]);

    return (
        <Dialog open={true} onClose={() => handleCloseModal()}>

            <DialogTitle>
                <div>Add new row</div>
                <div className='modal__close' onClick={() => handleCloseModal()}>✖</div>
            </DialogTitle>

            <ValidatorForm onSubmit={(event) => currentRow ? editExistRow(event): addNewRow(event)}>
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
                                value={newRow.name}
                                onChange={(event) => setNewRow({...newRow, name: event.target.value})}
                                validators={['required', 'maxStringLength:255']}
                                errorMessages={['Required field.', 'Max length is 255 characters.']}
                            />
                            {row?.name?.[0] && <p className='modal__error'>{row?.name?.[0]}</p>}
                        </div>

                        <div className='modal__inputs-item'>
                            <TextValidator
                                label="Birthday date"
                                name='birthday_date'
                                type="text"
                                variant="standard"
                                value={newRow.birthday_date}
                                onChange={(event) => setNewRow({...newRow, birthday_date: event.target.value})}
                                validators={['required']}
                                errorMessages={['Required field.']}
                            />
                            {row?.birthday_date?.[0] && <p className='modal__error'>{row?.birthday_date?.[0]}</p>}
                        </div>

                        <div className='modal__inputs-item'>
                            <TextValidator
                                label="Email"
                                name='email'
                                type="email"
                                variant="standard"
                                value={newRow.email}
                                onChange={(event) => setNewRow({...newRow, email: event.target.value})}
                                validators={['required', 'isEmail', 'maxStringLength:254']}
                                errorMessages={['Required field.', 'This is not a valid email.', 'Max length is 254 characters.']}
                            />
                            {row?.email?.[0] && <p className='modal__error'>{row?.email?.[0]}</p>}
                        </div>

                        <div className='modal__inputs-item'>
                            <TextValidator
                                label="Address"
                                name='address'
                                type="text"
                                variant="standard"
                                value={newRow.address}
                                onChange={(event) => setNewRow({...newRow, address: event.target.value})}
                                validators={['required']}
                                errorMessages={['Required field.']}
                            />
                            {row?.address?.[0] && <p className='modal__error'>{row?.address?.[0]}</p>}
                        </div>

                        <div className='modal__inputs-item'>
                            <TextValidator
                                label="Phone number"
                                name='phone_number'
                                type='text'
                                variant="standard"
                                value={newRow.phone_number}
                                onChange={(event) => {
                                    const sanitizedValue = event.target.value.replace(/[^0-9\W]/g, '');
                                    setNewRow({ ...newRow, phone_number: sanitizedValue });
                                }}
                                validators={['required', 'maxStringLength:20']}
                                errorMessages={['Required field.', 'Max length is 20 characters.']}
                            />
                            {row?.phone_number?.[0] && <p className='modal__error'>{row?.phone_number?.[0]}</p>}
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

                    >{currentRow ? 'Edit' : 'Add'}
                    </Button>
                </DialogActions>
            </ValidatorForm>

        </Dialog>

    );
};

export default Modal;