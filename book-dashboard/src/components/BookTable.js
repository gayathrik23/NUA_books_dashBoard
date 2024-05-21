import React from 'react';

const BookTable = ({ books, sortColumn, onSort }) => {
    const raiseSort = (path) => {
        onSort(path);
    };

    return (
        <table className="table">
            <thead>
                <tr>
                    <th onClick={() => raiseSort('title')}>Title</th>
                    <th onClick={() => raiseSort('author_name')}>Author Name</th>
                    <th onClick={() => raiseSort('first_publish_year')}>First Publish Year</th>
                    <th onClick={() => raiseSort('subject')}>Subject</th>
                    <th onClick={() => raiseSort('author_birth_date')}>Author Birth Date</th>
                    <th onClick={() => raiseSort('author_top_work')}>Author Top Work</th>
                </tr>
            </thead>
            <tbody>
                {books.map((book, index) => (
                    <tr key={index}>
                        <td>{book.title}</td>
                        <td>{book.author_name}</td>
                        <td>{book.first_publish_year}</td>
                        <td>{book.subject}</td>
                        <td>{book.author_birth_date || 'N/A'}</td>
                        <td>{book.author_top_work || 'N/A'}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default BookTable;
