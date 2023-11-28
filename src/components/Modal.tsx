import React, {useEffect, useState} from 'react';
import './Modal.scss'
import {Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle} from "@mui/material";
import {TextValidator, ValidatorForm} from "react-material-ui-form-validator";
import {IRow} from "../models/interfaces";
import {
    useAddRowMutation,
    useEditRowMutation,
} from "../redux/features/table.api";
import {useActions} from "../hooks/actions";

interface IModalProps {
    setOpenModal: (isOpenModal: boolean) => void,
    currentRow: IRow,
    setCurrentRow: (row: IRow | null) => void,
}

const Modal: React.FC<IModalProps> = ({ setOpenModal, currentRow, setCurrentRow}) => {
    const [editRow] = useEditRowMutation({refetchOnMountOrArgChange: true});
    const [addRow] = useAddRowMutation({refetchOnMountOrArgChange: true});
    const {clearRow} = useActions();
    const [errorMessage, setErrorMessage] = useState({});

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

    const reloadPage = (result) => {
        if (!result?.error) {
            setOpenModal(false);
            setNewRow(initialRow)
            clearRow();
            setCurrentRow(null);
            location.reload();
        } else {
            setErrorMessage(result.error.data)
        }
    }

    const addNewRow = async (event) => {
        event.preventDefault();
        const result = await addRow(newRow);
        reloadPage(result);
    }

    const editExistRow = async (event) => {
        event.preventDefault();
        const result = await editRow(newRow);
        reloadPage(result);
    }

    useEffect(() => {
        if (currentRow) {setNewRow(currentRow)}
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
                            {errorMessage['name'] && <p className='modal__error'>{errorMessage['name']}</p>}
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
                            {errorMessage['birthday_date'] && <p className='modal__error'>{errorMessage['birthday_date']}</p>}
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
                            {errorMessage['email'] && <p className='modal__error'>{errorMessage['email']}</p>}
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
                            {errorMessage['address'] && <p className='modal__error'>{errorMessage['address']}</p>}
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
                            {errorMessage['phone_number'] && <p className='modal__error'>{errorMessage['phone_number']}</p>}
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