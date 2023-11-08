'use client'
import "./table.scss"
import {useAppStore} from "../../lib/store/store";
import {useEffect, useState} from "react";
import {Button, Pagination} from "@mui/material";
import Modal from "../../components/Modal";
import Loader from "../../components/Loader";
import {useActions} from "../../hooks/actions";
import {useGetTable1Query} from "../../redux/features/table.api";
import {useAppSelector} from "../../hooks/redux";

const Table = () => {
    const {table, getTable, clearLoginResult} = useAppStore();
    const LIMIT = 10;
    let [offset, setOffset] = useState(0)
    let [pageNumber, setPageNumber] = useState(1);
    let countOfPages = table ? table?.count && Math.ceil(table?.count / LIMIT) : 0;
    let [existUser, setExistRow] = useState((typeof window !== 'undefined') && localStorage.getItem('user') || null)
    // const router = useRouter();
    const [openModal, setOpenModal] = useState(false)
    const [currentRow, setCurrentRow] = useState(null)



    const handlePageChange = (event, value) => {
        setPageNumber(value);
        setOffset(LIMIT * (value) - LIMIT)
    }

    const handleClearLoginResult = () => {
        if (typeof window !== 'undefined') {localStorage.removeItem('user');}
        clearLoginResult();
        setExistRow( (typeof window !== 'undefined') && localStorage.getItem('user'));
    }

    const handleOpenModal = () => {
        setOpenModal(true);
    }

    const handleOpenEditModal = (user) => {
        setOpenModal(true)
        setCurrentRow(user)
    }

    useEffect(() => {
        getTable(String(LIMIT), String(offset))
    }, [pageNumber, offset, openModal]);


    const {data: table1} = useGetTable1Query(String(LIMIT), String(offset), {refetchOnMountOrArgChange: true})
    const {setTable} = useActions()
    setTable(table1)
    // const myTable = useAppSelector((state) => state.data.table);
    // console.log('myTable', myTable)


    // useEffect(() => {
    //     if (!existUser) router.push('/')
    // }, [existUser]);

    return (
        <main className='table'>
            {table?.count
                ? <>
                    <div className='table__top'>
                        <h1 className='table__title'>Table</h1>
                        <Button variant="outlined" onClick={() => handleOpenModal()}>ADD</Button>
                        <Button variant="outlined" onClick={() => handleClearLoginResult()}>Logout</Button>
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
                    currentRow={currentRow}
                    setCurrentRow={setCurrentRow}
                />
            )}
        </main>
    )
};
export default Table;