import React from "react"

interface PaginationProps {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
  maxVisibleButtons?: number
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
  maxVisibleButtons = 5
}) => {
  const getPageNumbers = () => {
    const halfVisibleButtons = Math.floor(maxVisibleButtons / 2)
    let startPage = Math.max(currentPage - halfVisibleButtons, 1)
    const endPage = Math.min(startPage + maxVisibleButtons - 1, totalPages)

    if (endPage - startPage + 1 < maxVisibleButtons) {
      startPage = Math.max(endPage - maxVisibleButtons + 1, 1)
    }

    return Array.from(
      { length: endPage - startPage + 1 },
      (_, i) => startPage + i
    )
  }

  return (
    <div className="join">
      <button
        className="join-item btn"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        «
      </button>

      {getPageNumbers().map((pageNumber) => (
        <button
          key={pageNumber}
          className={`join-item btn ${
            pageNumber === currentPage ? "btn-active" : ""
          }`}
          onClick={() => onPageChange(pageNumber)}
        >
          {pageNumber}
        </button>
      ))}

      <button
        className="join-item btn"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        »
      </button>
    </div>
  )
}

export default Pagination
