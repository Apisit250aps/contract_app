import { FC, FormEvent } from "react";
import InputLabelInside from "../inputs/InputLabelInside";

interface IProjectForm {
  projectName?: string;
  setProjectName?: (value: string) => void;
  startDate?: Date;
  setStartDate?: (value: Date) => void;
  endDate?: Date;
  setEndDate?: (value: Date) => void;
  status?: string;
  setStatus?: (value: string) => void;
  budget?: number;
  setBudget?: (value: number) => void;
  handleSubmit: (event: FormEvent<HTMLFormElement>) => void;
}

const ProjectForm: FC<IProjectForm> = ({
  projectName,
  setProjectName,
  startDate,
  setStartDate,
  endDate,
  setEndDate,
  status,
  setStatus,
  budget,
  setBudget,
  handleSubmit
}) => {
  const formatDate = (date: Date | undefined) => {
    return date ? date.toISOString().split('T')[0] : "";
  };

  return (
    <form onSubmit={handleSubmit}>
      {setProjectName && (
        <InputLabelInside
          label="Project Name"
          set={(e) => setProjectName(e.target.value)}
          placeholder="Enter project name"
          value={projectName || ""}
        />
      )}
      {setStartDate && (
        <InputLabelInside
          label="Start Date"
          type="date"
          set={(e) => setStartDate(new Date(e.target.value))}
          placeholder="Enter start date"
          value={formatDate(startDate)}
        />
      )}
      {setEndDate && (
        <InputLabelInside
          label="End Date"
          type="date"
          set={(e) => setEndDate(new Date(e.target.value))}
          placeholder="Enter end date"
          value={formatDate(endDate)}
        />
      )}
      {setStatus && (
        <InputLabelInside
          label="Status"
          set={(e) => setStatus(e.target.value)}
          placeholder="Enter project status"
          value={status || ""}
        />
      )}
      {setBudget && (
        <InputLabelInside
          label="Budget"
          type="number"
          set={(e) => setBudget(Number(e.target.value))}
          placeholder="Enter project budget"
          value={budget?.toString() || ""}
        />
      )}
    </form>
  );
};

export default ProjectForm;