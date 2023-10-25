'use client'
import "./table.scss"
import {useAppStore} from "../../lib/store/store";
import {useEffect, useState} from "react";
import {Button, Pagination} from "@mui/material";
import {useRouter} from "next/navigation";
import Modal from "../../components/Modal";
import Loader from "../../components/Loader";

const Table = () => {
    const {table, fetchTable, removeUserData} = useAppStore();
    const LIMIT = 10;
    let [offset, setOffset] = useState(0)
    let [pageNumber, setPageNumber] = useState(1);
    let countOfPages = table ? table?.count && Math.ceil(table?.count / LIMIT) : 0;
    let [existUser, setExistUser] = useState((typeof window !== 'undefined') && localStorage.getItem('user') || null)
    const router = useRouter();
    const [openModal, setOpenModal] = useState(false)
    const [currentUser, setCurrentUser] = useState(null)

    const handlePageChange = (event, value) => {
        setPageNumber(value);
        setOffset(LIMIT * (value) - LIMIT)
    }

    const handleRemoveUserData = () => {
        if (typeof window !== 'undefined') {localStorage.removeItem('user');}
        removeUserData();
        setExistUser( (typeof window !== 'undefined') && localStorage.getItem('user'));
    }

    const handleOpenModal = () => {
        setOpenModal(true);
    }

    const handleOpenEditModal = (user) => {
        setOpenModal(true)
        setCurrentUser(user)
    }

    useEffect(() => {
        fetchTable(String(LIMIT), String(offset))
    }, [pageNumber, offset, openModal]);


    useEffect(() => {
        if (!existUser) router.push('/')
    }, [existUser]);

    return (
        <main className='table'>
            {table?.count
                ? <>
                    <div className='table__top'>
                        <h1 className='table__title'>Table</h1>
                        <Button variant="outlined" onClick={() => handleOpenModal()}>ADD</Button>
                        <Button variant="outlined" onClick={() => handleRemoveUserData()}>Logout</Button>
                    </div>

                    <table className='table__body'>
                        <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Birthday date</th>
                            <th>Email</th>
                            <th>Address</th>
                            <th>Phone number</th>
                            <th>Buttons</th>
                        </tr>
                        </thead>

                        <tbody>
                        {table && table?.results.map((cell) => (
                            <tr key={cell.id}>
                                <td>{cell.id}</td>
                                <td>{cell.name}</td>
                                <td>{cell.birthday_date}</td>
                                <td>{cell.email}</td>
                                <td>{cell.address}</td>
                                <td>{cell.phone_number}</td>
                                <td>
                                    <div className='table__buttons'>
                                        <Button variant="outlined"
                                                onClick={() => handleOpenEditModal(cell)}>Edit</Button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>

                    {countOfPages > 1 &&
                    (<Pagination
                        className=' pagination'
                        count={countOfPages}
                        size="large"
                        page={pageNumber}
                        onChange={handlePageChange}
                    />)
                    }
                </>
                : <Loader/>
            }
            {openModal && (
                <Modal
                    setOpenModal={setOpenModal}
                    currentUser={currentUser}
                    setCurrentUser={setCurrentUser}
                />
            )}
        </main>
    )
};
export default Table;