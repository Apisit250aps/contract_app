import { FC } from "react"
import ContentCard from "../../components/card/ContentCard"
const EmployeePage: FC = () => {
    console.log(location.pathname.split("/"))
  return (
    <>
      <ContentCard>
        <div className="card-title">
          <h1>Employee</h1>
        </div>
        <div className="card-actions">
            
        </div>
      </ContentCard>
    </>
  )
}

export default EmployeePage
