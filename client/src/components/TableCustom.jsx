import React from 'react'

import {
    TableContainer,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    TablePagination,
    Table,
} from '@mui/material'
import { useTranslation } from 'react-i18next'


const TableCustom = ({
    columns,
    rows,
    style,
    className,
    onRowSelected,
}) => {
    const { t } = useTranslation()
    const [page, setPage] = React.useState(0)
    const [rowsPerPage, setRowsPerPage] = React.useState(10)
    const handleChangePage = (event, newPage) => {
        setPage(newPage)
    }

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value)
        setPage(0)
    }

    return (
        <div className='w-full' style={{ ...style }}>
            <TableContainer
                className={'border border-[#10b6cf] rounded-lg text-slate-900 dark:text-white ' + className}
                sx={{
                    maxHeight: '100%',
                    maxWidth: '100%'
                }}
            >
                <Table stickyHeader aria-label='sticky table ' className='bg-gray-100 dark:bg-slate-800 '>
                    <TableHead >
                        <TableRow>
                            {columns?.map((column) => (
                                <TableCell
                                    className='w-fit table-header'
                                    key={'header_' + column.id}
                                    align={column.align}
                                    style={{
                                        minWidth: column.minWidth,
                                        maxWidth: column.maxWidth,
                                    }}
                                >
                                    {column.label}
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows && rows?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map((row, rowIndex) => (
                                <TableRow
                                    hover
                                    role='checkbox'
                                    tabIndex={-1}
                                    key={'row_' + row._id}
                                    className={onRowSelected ? 'cursor-pointer' : ''}
                                    onClick={() => {
                                        if (onRowSelected) {
                                            onRowSelected(row)
                                        }
                                    }}
                                >
                                    {columns.map((column, index) => {
                                        const value = row[column.id]
                                        return (
                                            <TableCell
                                                className='text-slate-900 dark:text-white  ' key={column.id} align={column.align}>
                                                {column.format
                                                    ? column.format({ value, index, rowIndex, row })
                                                    : value}
                                            </TableCell>
                                        )
                                    })}
                                </TableRow>
                            ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                sx={{
                    '.MuiSvgIcon-root ': {
                        fill: "white !important",
                    }
                }}
                className='text-slate-900 dark:text-white '
                labelRowsPerPage={t('itemsPerPage')}
                rowsPerPageOptions={[10, 25, 100]}
                component='div'
                count={rows?.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </div>
    )
}

export default TableCustom
