import React, { useEffect, useState } from "react";
import { getResumeData } from "../features/resumeSlice";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import loader from "../assets/page-loader.gif";
import ResumeTemplate1 from "./Templates/ResumeTemplate1";
import ResumeTemplate2 from "./Templates/ResumeTemplate2";
import ResumeTemplate3 from "./Templates/ResumeTemplate3";
import ResumeTemplate4 from "./Templates/ResumeTemplate4";
import ResumeTemplate5 from "./Templates/ResumeTemplate5";

function ResumeView() {
  const { templateId } = useParams();
  const { resumeId } = useParams();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [resumeData, setResumeData] = useState(null);
  console.log(resumeId);

  useEffect(() => {
    try {
      dispatch(getResumeData({ resumeId: resumeId })).then((response) => {
        if (response) {
          const data = response.payload.data;
          console.log(data);

          setResumeData(response.payload.data);
          setLoading(false);
        } else {
          console.log("getting error");
        }
      });
    } catch (error) {
      console.log("resume's data not found");
      setLoading(false);
    }
  }, []);

  if (loading) {
    return <div className="h-[75vh] w-full flex items-center justify-center">
    <img src={loader} alt="Loading.." className="h-40" />
  </div>
  }

  switch (templateId) {
    case 't1':
      return <ResumeTemplate1 data={resumeData} />;
    case 't2':
      return <ResumeTemplate2 data={resumeData} />;
    case 't3':
      return <ResumeTemplate3 data={resumeData} />;
    case 't4':
      return <ResumeTemplate4 data={resumeData} />;
    case 't5':
      return <ResumeTemplate5 data={resumeData} />;
    default:
      break;
  }
}

export default ResumeView;
