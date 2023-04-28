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
                className={'border border-stale-100 rounded-lg ' + className}
                sx={{
                    maxHeight: '100%',
                    maxWidth: 'calc(100vw - 420px) !important',
                }}
            >
                <Table stickyHeader aria-label='sticky table'>
                    <TableHead>
                        <TableRow>
                            {columns.map((column) => (
                                <TableCell
                                    className='bg-gray-100 w-fit'
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
                        {rows
                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map((row, rowIndex) => (
                                <TableRow
                                    hover
                                    role='checkbox'
                                    tabIndex={-1}
                                    key={'row_' + row.id}
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
                                            <TableCell key={column.id} align={column.align}>
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
                labelRowsPerPage={t('itemsPerPage')}
                rowsPerPageOptions={[10, 25, 100]}
                component='div'
                count={rows.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </div>
    )
}

export default TableCustom
