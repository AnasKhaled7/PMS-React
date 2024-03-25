import axios from "axios";
import { useCallback, useContext, useEffect, useState } from "react";
import { FieldError, SubmitHandler, useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { AuthContext } from "../context/AuthContext";
import { projectURLs } from "../lib/APIs";
import Loading from "../SharedModule/components/Loading/Loading";
import Error from "../SharedModule/components/Error/Error";

interface ProjectData {
  title: string;
  description: string;
  id: number;
}

const ProjectForm = () => {
  const { token } = useContext(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();

  const [type, setType] = useState("");

  const [project, setProject] = useState<ProjectData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  type Inputs = {
    title: string;
    description: string;
  };

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<Inputs>();

  useEffect(() => {
    if (location.pathname.includes("add")) setType("Add");
    else if (location.pathname.includes("edit")) setType("Edit");
  }, [location]);

  const getProject = useCallback(async () => {
    setIsLoading(true);
    try {
      const projectId = location.pathname.split("/").pop();
      const result = await axios.get(`${projectURLs.base}/${projectId}`, {
        headers: { Authorization: token },
      });
      setProject(result.data);
    } catch (error) {
      setError(
        "An error occurred while fetching the project. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  }, [location, token]);

  useEffect(() => {
    if (type === "Edit") getProject();
  }, [type]);

  const onSubmit: SubmitHandler<Inputs> = async (data: Inputs) => {
    try {
      if (type === "Add") {
        await axios.post(projectURLs.base, data, {
          headers: { Authorization: token },
        });
        toast.success("Project added successfully.");
        navigate("/dashboard/projects");
      } else if (type === "Edit") {
        await axios.put(`${projectURLs.base}/${project?.id}`, data, {
          headers: { Authorization: token },
        });
        toast.success("Project updated successfully.");
        navigate("/dashboard/projects");
      }
    } catch (error) {
      setError(
        `An error occurred while ${
          type === "Add" ? "adding" : "editing"
        } the project. Please try again.`
      );
    }
  };

  useEffect(() => {
    if (project) {
      setValue("title", project.title);
      setValue("description", project.description);
    }
  }, [project, setValue]);

  return (
    <>
      <div className="d-flex flex-column gap-2 bg-body p-4">
        <Link
          to="/dashboard/projects"
          className="text-body text-decoration-none"
        >
          <i className="fa-solid fa-arrow-left me-2"></i>
          View All Projects
        </Link>

        <h2>{type} Project</h2>
      </div>

      <div className="p-4">
        {isLoading ? (
          <Loading />
        ) : error ? (
          <Error message={error} />
        ) : (
          <form
            noValidate
            autoComplete="off"
            className="bg-white rounded-4 shadow-sm"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className="p-4">
              <div className="mb-3">
                <label htmlFor="title" className="form-label text-dark">
                  Title
                </label>
                <input
                  type="text"
                  className="form-control rounded-3"
                  id="title"
                  placeholder="Title"
                  {...register("title", {
                    required: "Title is required",
                    maxLength: {
                      value: 100,
                      message: "Title must not be more than 100 characters",
                    },
                  })}
                />
              </div>
              {errors.title && (
                <div className="alert alert-danger py-1" aria-live="assertive">
                  {(errors.title as FieldError).message}
                </div>
              )}

              <div className="mb-3">
                <label htmlFor="description" className="form-label text-dark">
                  Description
                </label>
                <textarea
                  className="form-control rounded-3"
                  id="description"
                  placeholder="Description"
                  rows={5}
                  {...register("description", {
                    required: "Description is required",
                    maxLength: {
                      value: 500,
                      message:
                        "Description must not be more than 500 characters",
                    },
                  })}
                />
              </div>
              {errors.description && (
                <div className="alert alert-danger py-1" aria-live="assertive">
                  {(errors.description as FieldError).message}
                </div>
              )}
            </div>

            <hr className="my-0" />

            <div className="p-4">
              <button
                type="submit"
                disabled={isSubmitting}
                className="btn btn-warning rounded-pill"
              >
                {isSubmitting ? "Submitting..." : `${type} Project`}
              </button>
            </div>
          </form>
        )}
      </div>
    </>
  );
};

export default ProjectForm;
