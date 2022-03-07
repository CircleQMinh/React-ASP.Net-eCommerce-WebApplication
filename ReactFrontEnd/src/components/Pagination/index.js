import Pagination from '@mui/material/Pagination';

export const PaginationPage = ({count, onChangePage, currentPage = 1}) => {
    const handleChangePage = (event, page) => {
        // console.log("event", event, page)
        onChangePage(page)
    }

    return (
        <Pagination count={count} defaultPage={currentPage} onChange={handleChangePage} variant="outlined" shape="rounded" color="primary"/>
    )
}