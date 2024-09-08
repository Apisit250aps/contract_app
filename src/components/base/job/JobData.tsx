import { FC } from "react"
// import Pagination from "../../navigate/paginations/Pagination"

const JobData: FC = () => {
  //   const [currentPage, setCurrentPage] = useState<number>(1)
  //   const [totalPages, setTotalPage] = useState<number>(1)

  return (
    <>
      <div className="card p-3 bg-base-100 shadow-lg">
        <div className="card-title flex flex-row justify-between items-center">
          <div className=" px-3">
            <h1>Jobs</h1>
          </div>
          <div className="actions flex flex-row items-center justify-end">
            <div className="">
              <button className="btn btn-ghost">
                <i className="bx bx-dots-vertical-rounded"></i>
              </button>
            </div>
          </div>
        </div>
        <div className="card-body"></div>
        {/* <div className=" card-actions">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={() => {}}
          />
        </div>
         */}
      </div>
    </>
  )
}

export default JobData
