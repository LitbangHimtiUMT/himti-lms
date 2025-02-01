import React from "react";
import { LuMoveLeft, LuMoveRight } from "react-icons/lu";

interface IPaginationProps {
  totalPages: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

export const Pagination: React.FC<IPaginationProps> = ({
  currentPage,
  onPageChange,
  totalPages,
}) => {
  const handlePageChange = (page: number) => {
    if (page > 0 && page <= totalPages) {
      onPageChange(page);
    }
  };

  const renderPageNumbers = () => {
    const pageNumbers = [];
    const delta = 2;

    const range = {
      start: Math.max(2, currentPage - delta),
      end: Math.min(totalPages - 1, currentPage + delta),
    };

    pageNumbers.push(
      <button
        key={1}
        onClick={() => handlePageChange(1)}
        className={`w-14 h-14 rounded-full border border-gray-500 text-lg font-semibold transition duration-300 ${
          currentPage === 1
            ? "bg-gradient-to-tr from-blue-900 to-blue-800 text-white"
            : "bg-white text-black hover:bg-blue-700 hover:text-white"
        }`}
      >
        1
      </button>
    );

    if (range.start > 2) {
      pageNumbers.push(<span key="start-ellipsis">...</span>);
    }

    for (let i = range.start; i <= range.end; i++) {
      pageNumbers.push(
        <button
          key={i}
          onClick={() => handlePageChange(i)}
          className={`w-14 h-14 rounded-full border border-gray-500 text-lg font-semibold transition duration-300 ${
            i === currentPage
              ? "bg-gradient-to-tr from-blue-900 to-blue-800 text-white"
              : "bg-white text-black hover:bg-blue-700 hover:text-white"
          }`}
        >
          {i}
        </button>
      );
    }

    if (range.end < totalPages - 1) {
      pageNumbers.push(<span key="end-ellipsis">...</span>);
    }

    if (totalPages > 1) {
      pageNumbers.push(
        <button
          key={totalPages}
          onClick={() => handlePageChange(totalPages)}
          className={`w-14 h-14 rounded-full border border-gray-500 text-lg font-semibold transition duration-300 ${
            currentPage === totalPages
              ? "bg-gradient-to-tr from-blue-900 to-blue-800 text-white"
              : "bg-white text-black hover:bg-blue-700 hover:text-white"
          }`}
        >
          {totalPages}
        </button>
      );
    }

    return pageNumbers;
  };

  return (
    <div className="pagination my-6 flex items-center gap-2">
      <button
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={
          currentPage === 1
            ? "text-gray-400 px-2 text-5xl hover:cursor-not-allowed"
            : "text-black px-2 text-5xl hover:text-blue-800"
        }
      >
        <LuMoveLeft />
      </button>
      <div className="flex items-center gap-2">{renderPageNumbers()}</div>
      <button
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={
          currentPage === totalPages
            ? "text-gray-400 px-2 text-5xl hover:cursor-not-allowed"
            : "text-black px-2 text-5xl hover:text-blue-800"
        }
      >
        <LuMoveRight />
      </button>
    </div>
  );
};
