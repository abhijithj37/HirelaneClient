import {
  createBrowserRouter,
  RouterProvider,
  createRoutesFromElements,
  Route,
  Navigate,

} from "react-router-dom";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { useDispatch, useSelector } from "react-redux";
import Register from "./pages/SeekerPages/Register";
import EmployerSignUp from "./pages/EmployerPages/EmployerSignUp";
import EmployerLogin from "./pages/EmployerPages/EmplyerLogin";
import Dashboard from "./pages/EmployerPages/employer";
import Home from "./pages/SeekerPages/Home";
import Login from "./pages/SeekerPages/Login";
import { useEffect, useState } from "react";
import { verifyEmployer, verifySeeker } from "./Utils/api";
import { setEmployer } from "./app/features/employerSlice";
import { setSeeker } from "./app/features/seekerSlice";
import CreateNewPost from "./pages/EmployerPages/CreateNewPost";
import PostedJobs from "./pages/EmployerPages/PostedJobs";
import EmployerJobDetails from "./pages/EmployerPages/EmployerJobDetails";
import EditJob from "./pages/EmployerPages/EditJob";
import Resume from "./pages/SeekerPages/Resume";
import BuildResume from "./pages/SeekerPages/BuildResume";
import Apply from "./pages/SeekerPages/Apply";
import MyJobs from "./pages/SeekerPages/MyJobs";
import EmployerApplication from "./pages/EmployerPages/EmployerApplication";
import ApplicationDetails from "./pages/EmployerPages/ApplicationDetails";
import CandidateDetails from "./pages/EmployerPages/CandidateDetails";
import EmployerChat from './pages/EmployerPages/EmployerChat'
 import Messages from "./pages/SeekerPages/Chat";
import JobDetails from "./pages/SeekerPages/JobDetails";

function App() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const { seeker } = useSelector((state) => state.seeker);
  const { employer } = useSelector((state) => state.employer);

  useEffect(() => {
    setLoading(true);
    Promise.allSettled([verifyEmployer(), verifySeeker()])
      .then(([employer, jobSeeker]) => {
        if (employer && employer.status === "fulfilled") {
          dispatch(setEmployer(employer.value));
        }
        if (jobSeeker && jobSeeker.status === "fulfilled") {
          console.log(jobSeeker, "seeker result");
          dispatch(setSeeker(jobSeeker.value));
        }
        setLoading(false);
      })
      .catch((error) => {
        if(error.message==="Unauthorized") {
          console.log(error);
        }
      });
  }, []);

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route>
        <Route path="/" element={<Home />} />
        <Route
          path="/login"
          element={seeker?<Navigate to={"/"}/>:<Login/>}
        />
        <Route
          path="/signup"
          element={seeker?<Navigate  to={"/"}/>:<Register />}
        />
        <Route
          path="/profile" 
          element={seeker?<BuildResume/>:<Navigate to={"/login"}/>}
        ></Route>
        <Route path="/myjobs" element={<MyJobs/>}></Route>
        <Route
          path="/resume"

          element={seeker&&seeker.modified?<Resume/>:<Navigate to={"/profile"}/>}
        >

        </Route>
        <Route path="/jobDetails/:id" element={<JobDetails/>}></Route>
        <Route path="/messages" element={<Messages/>}></Route>

        <Route path="/apply/:id" element={<Apply/>}>
         
        </Route>
        <Route
          path="/employerSignup"
          element={
            employer?<Navigate to={"/employer"}/>:<EmployerSignUp/>
          }
        />
        <Route
          path="/employerLogin"
          element={employer?<Navigate to={"/employer"}/>:<EmployerLogin/>}
        ></Route>
        <Route
          path="/employer"
          element={employer?<Dashboard/>:<Navigate to="/employerLogin" replace/>}
        >
          <Route index element={<PostedJobs/>}></Route>
          <Route path="postJob" element={<CreateNewPost />}></Route>
          <Route path="jobDetails/:id" element={<EmployerJobDetails />}></Route>
          <Route path="editJob/:id" element={<EditJob />}></Route>
          <Route path="employerapplications" element={<EmployerApplication/>}></Route>
          <Route path="applicationdetails/:id" element={<ApplicationDetails/>}></Route>
          <Route path="employerChat" element={<EmployerChat/>}></Route>
 
        </Route>

      </Route>
    )
  );
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>

      <div className="App">
        {loading?<div></div>:<RouterProvider router={router}/>}
      </div>

    </LocalizationProvider>
  );
}

export default App;