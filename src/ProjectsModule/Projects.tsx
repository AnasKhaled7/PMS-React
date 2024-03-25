import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { projectURLs } from "../lib/APIs";
import DeleteModal from "./components/DeleteModal";
import Pagination from "../SharedModule/components/Pagination/Pagination";
import LocalSearch from "../SharedModule/components/LocalSearch/LocalSearch";
import Loading from "../SharedModule/components/Loading/Loading";
import Error from "../SharedModule/components/Error/Error";

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
  const { token } = useContext(AuthContext);

  const [projects, setProjects] = useState<ProjectsResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const [pageNumber, setPageNumber] = useState(1);
  const [title, setTitle] = useState("");

  const getProjects = async (
    pageNumber: number,
    pageSize: number,
    title: string
  ) => {
    setIsLoading(true);
    try {
      const result = await axios.get<ProjectsResponse>(projectURLs.base, {
        headers: { Authorization: token },
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
      getProjects(pageNumber, 15, title);
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
          onChange={(e) => {
            setTitle(e.target.value);
            setPageNumber(1);
          }}
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
                        getProjects={() => getProjects(pageNumber, 15, title)}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>

            <Pagination
              pageNumber={pageNumber}
              setPageNumber={setPageNumber}
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
