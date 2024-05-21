import axios from 'axios';

export const fetchBooks = async (page, limit) => {
    const url = `https://openlibrary.org/search.json?q=the&limit=${limit}&page=${page}`;
    try {
        const response = await axios.get(url);
        const books = response.data.docs.map((book) => ({
            title: book.title,
            author_name: book.author_name ? book.author_name.join(', ') : 'N/A',
            first_publish_year: book.first_publish_year || 'N/A',
            subject: book.subject ? book.subject.join(', ') : 'N/A',
            author_birth_date: book.author_birth_date || 'N/A',
            author_top_work: book.author_top_work || 'N/A',
        }));
        return { books, numFound: response.data.numFound };
    } catch (error) {
        console.error('Error fetching books:', error);
        throw error;
    }
};
