import { FC, useCallback, useState } from "react"
import InputLabelInside from "../../components/forms/inputs/InputLabelInside"
import workerService, { IWorker } from "../../services/worker.service"
import Swal from "sweetalert2"
import axios from "axios"
const WorkerCreatePage: FC = () => {
  const [worker_name, setWorkerName] = useState<string>("")
  const [worker_contact, setWorkerContact] = useState<string>("")

  const handleSubmit = useCallback(
    async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault()
      const WorkerData: IWorker = {
        name: worker_name,
        contactInfo: worker_contact
      }

      try {
        const response = await workerService.createWorker(WorkerData)
        if (response.status === 201) {
          Swal.fire({
            text: "New Worker has created",
            icon: "success"
          })
        }
      } catch (error) {
        if (axios.isAxiosError(error)) {
          Swal.fire({
            text: "Create worker fail!",
            icon: "error"
          })
        }
      }
    },
    [worker_contact, worker_name]
  )

  return (
    <>
      <div className="grid grid-cols-3">
        <div className="col-span-1">
          <div className="card rounded-2xl shadow-lg p-3 bg-base-100">
            <div className="card-title flex items-center justify-between px-3">
              <div className="">
                <h1>New Worker</h1>
              </div>
            </div>
            <div className="card-body p-3 rounded-2xl">
              <form onSubmit={handleSubmit}>
                <InputLabelInside
                  label="Name"
                  value={worker_name}
                  set={(e) => setWorkerName(e.target.value)}
                  name="worker-name"
                />
                <InputLabelInside
                  label="Contact"
                  value={worker_contact}
                  set={(e) => setWorkerContact(e.target.value)}
                  name="worker-contact"
                />
                <div className="justify-end flex">
                  <button className="btn btn-primary">Create</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default WorkerCreatePage
