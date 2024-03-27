import axios from "axios";
import { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import { Link, useSearchParams } from "react-router-dom";
import Error from "../SharedModule/components/Error/Error";
import Loading from "../SharedModule/components/Loading/Loading";
import LocalSearch from "../SharedModule/components/LocalSearch/LocalSearch";
import Pagination from "../SharedModule/components/Pagination/Pagination";
import { projectURLs } from "../lib/APIs";
import DeleteModal from "./components/DeleteModal";

interface Project {
  id: string;
  title: string;
  creationDate: string;
}

interface ProjectsResponse {
  totalNumberOfRecords: number;
  totalNumberOfPages: number;
  data: Project[];
}

const Projects = () => {
  const [searchParams, setSearchParams] = useSearchParams({
    pageNumber: "1",
    title: "",
  });
  const pageNumber = parseInt(searchParams.get("pageNumber") || "1");
  const title = searchParams.get("title") || "";

  const [projects, setProjects] = useState<ProjectsResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const getProjects = async ({
    pageNumber = 1,
    pageSize = 15,
    title,
  }: {
    pageNumber: number;
    pageSize?: number;
    title: string;
  }) => {
    setIsLoading(true);
    try {
      const result = await axios.get<ProjectsResponse>(projectURLs.base, {
        headers: { Authorization: localStorage.getItem("token") },
        params: { pageNumber, pageSize, title },
      });
      setProjects(result?.data);
    } catch (error) {
      setError("An error occurred while fetching projects. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const getSearchData = setTimeout(() => {
      getProjects({ pageNumber, title });
    }, 500);

    return () => clearTimeout(getSearchData);
  }, [title, pageNumber]);

  return (
    <>
      <div className="d-flex flex-column flex-sm-row gap-2 justify-content-between align-items-center bg-body p-4">
        <h2>Projects</h2>

        <Link to="add-project" className="btn btn-warning rounded-pill">
          <i className="fa-solid fa-plus me-2"></i>
          Add New Project
        </Link>
      </div>

      <div className="p-4 d-flex flex-column gap-4">
        <LocalSearch
          placeholder="Search by Title"
          value={title}
          onChange={(e) =>
            setSearchParams(
              { title: e.target.value, pageNumber: "1" },
              { replace: true }
            )
          }
        />

        {isLoading ? (
          <Loading />
        ) : error ? (
          <Error message={error} />
        ) : projects?.totalNumberOfRecords ? (
          <>
            <Table striped responsive className="text-center rounded-4">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Title</th>
                  <th>Date Created</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {projects?.data.map((project) => (
                  <tr key={project.id}>
                    <td>{project.id}</td>
                    <td>{project.title}</td>
                    <td>
                      {new Date(project.creationDate).toLocaleDateString()}
                    </td>
                    <td>
                      <Link
                        to={`edit-project/${project.id}`}
                        className="btn btn-warning rounded-pill btn-sm me-2"
                      >
                        <i className="fa-solid fa-pencil me-2"></i>
                        Edit
                      </Link>

                      <DeleteModal
                        id={project?.id}
                        getProjects={() => getProjects({ pageNumber, title })}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>

            <Pagination
              pageNumber={pageNumber}
              setPageNumber={(pageNumber: number) =>
                setSearchParams(
                  { title, pageNumber: pageNumber.toString() },
                  { replace: true }
                )
              }
              totalNumberOfPages={projects.totalNumberOfPages}
            />
          </>
        ) : (
          <p>No projects found.</p>
        )}
      </div>
    </>
  );
};
export default Projects;
