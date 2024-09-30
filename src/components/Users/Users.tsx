import { useEffect, useMemo, useState } from 'react';
import { API_HEADERS } from '../../constants/apiEndpoints';
import { useDispatch, useSelector } from 'react-redux';
import { deleteUser, setUserData } from '../../features/userDataSlice';
import { useTable, Column, CellProps } from 'react-table';
import { RootState } from '../../store/store';
import { Button, Typography } from '@mui/material';
import UserEditModal from '../UserEditModal/UserEditModal';
import ConfirmationModal from '../ConfirmationModal/ConfirmationModal';
import AddNewUserModal from '../AddNewUserModal/AddNewUserModal';
import { decryptData, encryptData } from '../../helpers/encryptData';
import './users.scss';
import InfiniteScroll from 'react-infinite-scroll-component';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

//User Object Structure Interface
export interface User {
    id: number;
    firstName: string;
    lastName: string;
    age: number,
    email: string,
    phone: string,
    ip: string,
    macAddress: string,
    company: {
        items: Record<string, unknown>;
        name?: string;
    };
    role: string
}

function Users() {
    //Users Comp Control Variables
    const registeredUsers = decryptData(localStorage.getItem('registeredUsers')) as User[] | null;
    const dispatch = useDispatch();
    const userData = useSelector((state: RootState) => state.userData.userData);
    const [selectedUser, setSelectedUser] = useState<User | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);
    const [isAddUserModalOpen, setIsAddUserModalOpen] = useState(false);
    const [hasMore, setHasMore] = useState(true);
    const [initialLimit, setInitialLimit] = useState(30);

    //Defines Columns for Table
    const columns: Column<User>[] = useMemo(
        () => [
            {
                Header: 'ID',
                accessor: 'id' as keyof User,
            },
            {
                Header: 'First Name',
                accessor: 'firstName' as keyof User,
            },
            {
                Header: 'Last Name',
                accessor: 'lastName' as keyof User,
            },
            {
                Header: 'Age',
                accessor: 'age' as keyof User,
            },
            {
                Header: 'Email ID',
                accessor: 'email' as keyof User,
            },
            {
                Header: 'Phone No.',
                accessor: 'phone' as keyof User,
            },
            {
                Header: 'IP Address',
                accessor: 'ip' as keyof User,
            },
            {
                Header: 'MAC Address',
                accessor: 'macAddress' as keyof User,
            },
            {
                Header: 'User Role',
                accessor: 'role' as keyof User,
            },
            {
                Header: 'Company',
                accessor: 'company' as keyof User,
                Cell: (cell: CellProps<User>) => cell.row.original?.company?.name || '-'
            },
            {
                Header: 'Actions',
                Cell: ({ row }) => (
                    <div>
                        <Button
                            variant="contained"
                            color="primary"
                            size="small"
                            style={{ marginRight: '8px' }}
                            onClick={() => {
                                setSelectedUser(row.original);
                                setIsModalOpen(true);
                            }}>
                            Edit
                        </Button>
                        <Button variant="contained" color="secondary" size="small" onClick={() => handleDeleteClick(row.original)}>
                            Delete
                        </Button>
                    </div>
                ),
            },
        ],
        []
    );

    //Fetches User Data from Dummy Json & Sets them as User Data in Global Store
    const fetchUserData = async () => {
        const userData = await fetch(`https://dummyjson.com/users?limit=${initialLimit}&select=id,firstName,lastName,age,email,phone,birthData,ip,macAddress,company,role,password`, {
            method: 'GET',
            body: undefined,
            headers: API_HEADERS,
        });

        const storedUserData = await fetch(`${import.meta.env.VITE_APP_BACK_END_URL}/user/get-user-data/`, {
            method: 'GET',
            // body: JSON.stringify(reqBody),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
            credentials: 'include',
        });

        const storedUserDataJson = await storedUserData.json();

        if (userData?.ok && userData?.status === 200 && storedUserDataJson?.title === 'User Data') {
            const finalUserData = await userData.json();

            const finalStoredUserData = storedUserDataJson?.data?.map((item, index) => ({
                ...item,
                id: index + 1,
                firstName: item?.first_name,
                lastName: item?.last_name,
                age: Number(item?.profile?.age),
                phone: String(item?.profile?.phone_number),
                role: item?.profile?.role,
                company: { name: item?.profile?.company }
            }));

            finalUserData.users = finalUserData?.users?.map((item, index) => ({ ...item, id: finalStoredUserData?.length + index + 1 }))

            dispatch(setUserData(finalStoredUserData?.concat(finalUserData.users)));

            if (finalUserData.users.length >= finalUserData.total) {
                setHasMore(false);
            }
            else {
                setInitialLimit((prevState) => (prevState + 20));
            }
        }
        else {
            toast.error(`Something went wrong while Fetching data from DummyJson API.`, {
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
        }
    }

    //Gets Table Props by Passing Columns & User Data used to Render Table
    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
    } = useTable({ columns, data: userData.length ? userData : [] });

    //Handles User Record Delete Action
    const handleDeleteClick = (user: User) => {
        setSelectedUser(user);
        setIsConfirmationOpen(true);
    };

    //Handles User Record Delete Confirmation
    const handleConfirmDelete = () => {
        if (selectedUser) {
            dispatch(deleteUser(selectedUser.id));
            toast.success(`User Deleted Successfully.`, {
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
        }
        setIsConfirmationOpen(false);
        setSelectedUser(null);
    };

    const handleCloseConfirmation = () => {
        setIsConfirmationOpen(false);
        setSelectedUser(null);
    };

    //Calls Fetch Function on Comp Mount, Sets User Data Locally to Response of Fetch Function 
    useEffect(() => {
        fetchUserData();
    }, []);

    //Sets User Data Locally whenever UserData is Updated
    useEffect(() => {
        localStorage.setItem('userData', encryptData(userData) || '')
    }, [userData]);


    return (
        <>
            <ToastContainer
                position="top-center"
                autoClose={3000}
                hideProgressBar={true}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                theme="dark"
            />
            <div style={{ marginRight: '15px', marginBottom: '15px', marginTop: '15px', display: 'flex', justifyContent: 'flex-end' }}>
                <Button variant="contained" color="primary" onClick={() => setIsAddUserModalOpen(true)}>
                    Add New User
                </Button>
            </div>
            <InfiniteScroll
                dataLength={userData.length}
                next={fetchUserData}
                hasMore={hasMore}
                loader={
                    <div style={{ display: 'flex', justifyContent: 'center', padding: '20px' }}>
                        <div style={{
                            border: '4px solid rgba(0, 0, 0, 0.1)',
                            borderTop: '4px solid #3498db',
                            borderRadius: '50%',
                            width: '40px',
                            height: '40px',
                            animation: 'spin 1s linear infinite'
                        }} />
                    </div>
                }
                endMessage={
                    <Typography id="edit-modal-title" variant="h6" component="h2" gutterBottom style={{ textAlign: 'center' }}>
                        ~No More Data Available~
                    </Typography>
                }
            >
                <table className="react-table" {...getTableProps()} style={{ width: '100%', borderCollapse: 'collapse', fontFamily: 'Helvetica, sans-serif' }}>
                    <thead>
                        {headerGroups.map(headerGroup => (
                            <tr {...headerGroup.getHeaderGroupProps()} key={headerGroup.id}>
                                {headerGroup.headers.map(column => (
                                    <th
                                        {...column.getHeaderProps()}
                                        style={{ borderBottom: '1px solid #ddd', padding: '10px', textAlign: 'left' }}
                                        key={column.id}
                                    >
                                        {column.render('Header')}
                                    </th>
                                ))}
                            </tr>
                        ))}
                    </thead>
                    <tbody {...getTableBodyProps()}>
                        {rows.map(row => {
                            prepareRow(row);
                            return (
                                <tr {...row.getRowProps()} key={row.id}>
                                    {row.cells.map(cell => (
                                        <td
                                            {...cell.getCellProps()}
                                            style={{ padding: '10px', borderBottom: '1px solid #ddd' }}
                                            key={cell.column.id}
                                        >
                                            {cell.render('Cell')}
                                        </td>
                                    ))}
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </InfiniteScroll>

            {selectedUser && (
                <ConfirmationModal
                    open={isConfirmationOpen}
                    onClose={handleCloseConfirmation}
                    onConfirm={handleConfirmDelete}
                    userName={selectedUser.firstName + ' ' + selectedUser.lastName}
                />
            )}
            <UserEditModal
                open={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                user={selectedUser}
                onSubmit={() => setIsModalOpen(false)}
            />
            <AddNewUserModal
                open={isAddUserModalOpen}
                onClose={() => setIsAddUserModalOpen(false)}
            />
        </>
    )
}

export default Users