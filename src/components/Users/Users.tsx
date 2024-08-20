import { useEffect, useMemo, useState } from 'react';
import { API_HEADERS, USER_DATA_URL } from '../../constants/apiEndpoints';
import { useDispatch, useSelector } from 'react-redux';
import { deleteUser, setUserData } from '../../features/userDataSlice';
import { useTable, Column, CellProps } from 'react-table';
import { RootState } from '../../store/store';
import { Button } from '@mui/material';
import UserEditModal from '../UserEditModal/UserEditModal';
import ConfirmationModal from '../ConfirmationModal/ConfirmationModal';
import AddNewUserModal from '../AddNewUserModal/AddNewUserModal';
import { decryptData, encryptData } from '../../helpers/encryptData';

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
    const registeredUsers = decryptData(localStorage.getItem('registeredUsers'));
    const dispatch = useDispatch();
    const userData = useSelector((state: RootState) => state.userData.userData);
    const [selectedUser, setSelectedUser] = useState<User | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);
    const [isAddUserModalOpen, setIsAddUserModalOpen] = useState(false);

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
    const fetchUserData = async (apiMethod: string, reqBody: unknown) => {
        const userData = await fetch(USER_DATA_URL, {
            method: apiMethod,
            body: reqBody ? JSON.stringify(reqBody) : undefined,
            headers: API_HEADERS,
        });

        if (userData?.ok && userData?.status === 200) {
            const finalUserData = await userData.json();
            dispatch(setUserData(finalUserData.users.concat(registeredUsers?.map((item: User, index: number) => { return { ...item, id: finalUserData.users.length + (index + 1) } }))));
        }
        else {
            //Handle Error Here
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

    //Hanldes User Record Delete Action
    const handleDeleteClick = (user: User) => {
        setSelectedUser(user);
        setIsConfirmationOpen(true);
    };

    const handleConfirmDelete = () => {
        if (selectedUser) {
            dispatch(deleteUser(selectedUser.id));
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
        fetchUserData('GET', undefined);
    }, []);

    useEffect(() => {
        localStorage.setItem('userData', encryptData(userData) || '')
    }, [userData]);


    return (
        <>
            <div style={{ marginRight: '15px', marginTop: '15px', display: 'flex', justifyContent: 'flex-end' }}>
                <Button variant="contained" color="primary" onClick={() => setIsAddUserModalOpen(true)}>
                    Add New User
                </Button>
            </div>
            <table {...getTableProps()} style={{ width: '100%', borderCollapse: 'collapse', }}>
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