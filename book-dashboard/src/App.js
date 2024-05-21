import React, { useState, useEffect } from 'react';
import { fetchBooks } from './services/bookServices';
import BookTable from './components/BookTable';
import ReactPaginate from 'react-paginate';
import './App.css';

const App = () => {
    const [books, setBooks] = useState([]);
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(10);
    const [sortColumn, setSortColumn] = useState({ path: 'title', order: 'asc' });
    const [totalBooks, setTotalBooks] = useState(0);
    const [error, setError] = useState(null);

    const getBooks = async (page, limit) => {
        try {
            const data = await fetchBooks(page, limit);
            setBooks(data.books);
            setTotalBooks(data.numFound);
            setError(null); 
        } catch (err) {
            setError('Failed to fetch books. Please try again later.');
        }
    };

    useEffect(() => {
        getBooks(page, limit);
    }, [page, limit]);

    const handlePageChange = (event) => {
        setPage(event.selected + 1);
    };

    const handleLimitChange = (event) => {
        setLimit(parseInt(event.target.value, 10));
        setPage(1); // Reset to first page when changing the limit
    };

    const handleSort = (path) => {
        const order = sortColumn.path === path && sortColumn.order === 'asc' ? 'desc' : 'asc';
        setSortColumn({ path, order });

        const sortedBooks = [...books].sort((a, b) => {
            if (a[path] < b[path]) return order === 'asc' ? -1 : 1;
            if (a[path] > b[path]) return order === 'asc' ? 1 : -1;
            return 0;
        });
        setBooks(sortedBooks);
    };

    return (
        <div className="container">
            <h1>Book Dashboard</h1>
            {error && <p className="error">{error}</p>}
            <div className="select-wrapper">
                <label>
                    Records per page:
                    <select value={limit} onChange={handleLimitChange}>
                        <option value={10}>10</option>
                        <option value={50}>50</option>
                        <option value={100}>100</option>
                    </select>
                </label>
            </div>
            <BookTable books={books} sortColumn={sortColumn} onSort={handleSort} />
            <ReactPaginate
                previousLabel={'previous'}
                nextLabel={'next'}
                breakLabel={'...'}
                breakClassName={'break-me'}
                pageCount={Math.ceil(totalBooks / limit)}
                marginPagesDisplayed={2}
                pageRangeDisplayed={5}
                onPageChange={handlePageChange}
                containerClassName={'pagination'}
                subContainerClassName={'pages pagination'}
                activeClassName={'active'}
            />
        </div>
    );
};

export default App;
