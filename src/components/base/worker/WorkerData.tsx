import React, { FC, useCallback, useEffect, useState } from "react";
import Swal from "sweetalert2";
import workerService, { IWorker } from "../../../services/worker.service";
import { AxiosResponse } from "axios";

interface WorkerDataProps {
  limit?: number;
  page?: number;
  currentPage?: number;
  totalPages?: number;
  totalItems?: number;
  onPaginationChange: (currentPage: number, totalPages: number, totalItems: number) => void;
  onSelectionChange?: (selectedWorkers: IWorker[]) => void;
}

const WorkerData: FC<WorkerDataProps> = ({
  limit = 10,
  page = 1,
  onPaginationChange,
  onSelectionChange
}) => {
  const [workerData, setWorkerData] = useState<IWorker[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedWorkers, setSelectedWorkers] = useState<Set<string>>(new Set());

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      const response = (await workerService.getAllWorker({
        limit,
        page
      })) as AxiosResponse;
      setWorkerData(response.data.data);
      onPaginationChange(
        response.data.currentPage,
        response.data.totalPages,
        response.data.totalItems
      );
    } catch (error) {
      console.error("Error fetching workers:", error);
      Swal.fire({
        title: "Error",
        text: "Failed to fetch workers. Please try again.",
        icon: "error"
      });
    } finally {
      setLoading(false);
    }
  }, [limit, page, onPaginationChange]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleCheckboxChange = useCallback((workerId: string) => {
    setSelectedWorkers((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(workerId)) {
        newSet.delete(workerId);
      } else {
        newSet.add(workerId);
      }
      return newSet;
    });
  }, []);

  useEffect(() => {
    if (onSelectionChange) {
      const selectedWorkersList = workerData.filter((worker) =>
        selectedWorkers.has(worker._id as string)
      );
      onSelectionChange(selectedWorkersList);
    }
  }, [selectedWorkers, workerData, onSelectionChange]);

  const handleSelectAll = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      if (event.target.checked) {
        setSelectedWorkers(
          new Set(workerData.map((worker) => worker._id as string))
        );
      } else {
        setSelectedWorkers(new Set());
      }
    },
    [workerData]
  );

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="overflow-x-auto">
      <table className="table w-full">
        <thead>
          <tr>
            <th>
              <input
                type="checkbox"
                className="checkbox"
                onChange={handleSelectAll}
                checked={selectedWorkers.size === workerData.length}
              />
            </th>
            <th>Name</th>
            <th>Contact Info</th>
          </tr>
        </thead>
        <tbody>
          {workerData.map((worker, index) => (
            <tr key={worker._id} className={index % 2 === 0 ? "" : "hover"}>
              <td>
                <input
                  className="checkbox"
                  type="checkbox"
                  checked={selectedWorkers.has(worker._id as string)}
                  onChange={() => handleCheckboxChange(worker._id as string)}
                />
              </td>
              <td>{worker.name}</td>
              <td>{worker.contactInfo}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default WorkerData;