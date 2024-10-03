import { useState } from 'react';
import styles from '../page.module.scss';
import { FaArrowUp, FaArrowDown } from "react-icons/fa";

interface PagenationProps {
    postCnt: number;
    postsPerPage: number;
    onPageChange: (page: number) => void;
}

export default function Pagenation({ postCnt, postsPerPage, onPageChange }: PagenationProps) {
    const totalPages = Math.ceil(postCnt / postsPerPage);
    const [currentPage, setCurrentPage] = useState(1);

    const handleNext = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
            onPageChange(currentPage + 1); 
        }
    };

    const handlePrevious = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
            onPageChange(currentPage - 1); 
        }
    };

    const handlePageClick = (pageNumber: number) => {
        setCurrentPage(pageNumber);
        onPageChange(pageNumber); 
    };

    return (
        <div className={styles.pageBlock}>
            <div className={styles.arrowWrapper} onClick={handlePrevious}>
                <FaArrowUp className={styles.arrowIcon} />
            </div>
            <div className={styles.numberList}>
                {[...Array(totalPages)].map((_, index) => {
                    const pageNum = index + 1;
                    return (
                        <div
                            key={pageNum}
                            className={`${styles.number} ${currentPage === pageNum ? styles.highlight : ''}`}
                            onClick={() => handlePageClick(pageNum)}
                        >
                            {pageNum.toString().padStart(2, '0')}
                        </div>
                    );
                })}
            </div>
            <div className={styles.arrowWrapper} onClick={handleNext}>
                <FaArrowDown className={styles.arrowIcon} />
            </div>
        </div>
    );
}
