import { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import Navbar from "@/components/Navbar";
import axios from "@/utils/axiosInstance";
import {
  Container,
  TextInput,
  Select,
  RangeSlider,
  Text,
  Box,
} from "@mantine/core";
const jobTypeEnumMap = {
  "Full-time": "FULL_TIME",
  "Part-time": "PART_TIME",
  "Contract": "CONTRACT",
  "Internship": "INTERNSHIP",
};


export default function Home() {
  const [showCreateJob, setShowCreateJob] = useState(false);
  const [jobs, setJobs] = useState([]);

  const [searchTitle, setSearchTitle] = useState("");
  const [filterLocation, setFilterLocation] = useState("");
  const [filterJobType, setFilterJobType] = useState("");
  const [filterSalaryRange, setFilterSalaryRange] = useState([10000, 100000]);

  const {
    register,
    handleSubmit,
    reset,control,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    axios
      .get("/jobs")
      .then((res) => {
        console.log("Jobs from backend:", res.data);
        setJobs(res.data);
      })
      .catch((err) => {
        console.error("Failed to fetch jobs", err);
      });
  }, []);

  const onSubmit = (data) => {
  console.log("Submitting job with data:", data);

  const formattedData = {
    ...data,
    salaryMin: parseInt(data.salaryMin),
    salaryMax: parseInt(data.salaryMax),
    jobType: jobTypeEnumMap[data.jobType],
  };

  axios
    .post("/jobs", formattedData)
    .then((res) => {
      setJobs((prev) => [...prev, res.data]);
      setShowCreateJob(false);
      reset();
      console.log("Job posted!", res);
    })
    .catch((err) => {
      console.error("Failed to publish job", err);
    });
};


  const filteredJobs = jobs.filter((job) => {
    const matchesTitle = searchTitle
      ? job.title.toLowerCase().includes(searchTitle.toLowerCase())
      : true;

    const matchesLocation = filterLocation
      ? job.location === filterLocation
      : true;

    // const matchesType = filterJobType ? job.jobType === filterJobType : true;
    const matchesType = filterJobType
    ? job.jobType === jobTypeEnumMap[filterJobType]
    : true;

    const matchesSalary =
      job.salaryMin >= filterSalaryRange[0] &&
      job.salaryMax <= filterSalaryRange[1];

    return matchesTitle && matchesLocation && matchesType && matchesSalary;
  });

  return (
    <div className="relative min-h-screen">
      {showCreateJob && (
        <div
          className="fixed top-0 left-0 w-full h-full z-50 bg-black bg-opacity-10 flex items-center justify-center"
          style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
        >
          <div
            className="w-[848px] h-[650px] bg-white rounded-[16px] shadow-[0_0_24px_0_#A9A9A940] px-10 py-4"
            style={{ backgroundColor: "#ffffff", opacity: 1 }}
          >
            <h2 className="text-center mt-6 text-xl font-semibold">
              Create Job Opening
            </h2>

            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="flex gap-6 mb-6">
                <div className="flex flex-col gap-4 w-1/2">
                  <TextInput
                    label="Job Title"
                    placeholder="e.g. Software Engineer"
                    className="h-[91px]"
                    {...register("title", { required: true })}
                  />

<Controller
  name="location"
  control={control}
  rules={{ required: true }}
  render={({ field }) => (
    <Select
      label="Location"
      placeholder="Select Location"
      data={["Chennai", "Bangalore", "Hyderabad", "Pune"]}
      {...field}
    />
  )}
/>


                  <div className="flex gap-2 h-[91px]">
                    <TextInput
                      label="Min Salary"
                      className="w-1/2"
                      type="number"
                      {...register("salaryMin", { required: true })}
                    />
                    <TextInput
                      label="Max Salary"
                      className="w-1/2"
                      type="number"
                      {...register("salaryMax", { required: true })}
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-4 w-1/2">
                  <TextInput
                    label="Company Name"
                    placeholder="e.g. OpenAI"
                    className="h-[91px]"
                    {...register("companyName", { required: true })}
                  />
<Controller
  name="jobType"
  control={control}
  rules={{ required: true }}
  render={({ field }) => (
    <Select
      label="Job Type"
      placeholder="Select Job Type"
      data={["Full-time", "Part-time", "Contract", "Internship"]}
      {...field}
    />
  )}
/>

                  <TextInput
                    label="Application Deadline"
                    type="date"
                    className="h-[91px]"
                    {...register("applicationDeadline", { required: true })}
                  />
                </div>
              </div>

              <div className="mb-4">
                <Text className="mb-2 font-medium">Job Description</Text>
                <textarea
                  className="w-full h-[202px] border border-gray-300 rounded-[10px] p-3 resize-none"
                  placeholder="Enter job responsibilities, requirements, etc..."
                  {...register("description", { required: true })}
                />
              </div>

              <div className="flex justify-between mt-6">
                <button
                  type="button"
                  className="w-[232px] h-[59px] border border-gray-400 rounded-[10px] px-[60px] py-4 text-gray-700 font-medium"
                >
                  Save Draft
                </button>

                <button
                  type="submit"
                  className="w-[232px] h-[59px] bg-[#007BFF] text-white rounded-[10px] px-[60px] py-4 font-medium"
                >
                  Publish
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <Container
        size="xl"
        px={0}
        py={0}
        className="w-full min-h-screen mx-auto relative"
      >
        <Navbar onCreateJobClick={() => setShowCreateJob(true)} />

        {/* Filters */}
        <Box className="w-full px-[26px] mt-[40px]">
          <div className="flex items-center justify-between gap-[32px]">
            <TextInput
              placeholder="Search By Job Title, Role"
              className="min-w-[200px] h-[48px] flex-1 placeholder:text-[16px] placeholder:font-medium placeholder:text-center"
              value={searchTitle}
              onChange={(e) => setSearchTitle(e.currentTarget.value)}
            />

            <div className="h-[48px] w-px bg-[#EAEAEA]" />

            <Select
              placeholder="Preferred Location"
              data={["Chennai", "Bangalore", "Hyderabad", "Pune"]}
              className="min-w-[200px] h-[48px] flex-1 placeholder:text-[16px] placeholder:font-medium placeholder:text-center"
              value={filterLocation}
              onChange={setFilterLocation}
            />

            <div className="h-[48px] w-px bg-[#EAEAEA]" />

            <Select
              placeholder="Job Type"
              data={["Full-time", "Part-time", "Contract", "Internship"]}
              className="min-w-[200px] h-[48px] flex-1 placeholder:text-[16px] placeholder:font-medium placeholder:text-center"
              value={filterJobType}
              onChange={setFilterJobType}
            />

            <div className="h-[48px] w-px bg-[#EAEAEA]" />

            <div className="flex flex-col min-w-[220px] flex-1">
              <Text fw={500} mb={4} className="text-[16px] text-center">
                Salary Per Month
              </Text>
              <RangeSlider
                min={10000}
                max={100000}
                step={1000}
                value={filterSalaryRange}
                onChange={setFilterSalaryRange}
                label={(value) => `₹${value / 1000}K`}
                labelAlwaysOn
                size="sm"
                styles={{
                  track: { backgroundColor: "#595959" },
                  bar: { backgroundColor: "#595959" },
                  thumb: {
                    width: 16,
                    height: 16,
                    border: "2px solid white",
                    backgroundColor: "#595959",
                  },
                }}
              />
            </div>
          </div>
        </Box>

        {/* Jobs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-10 px-6">
          {filteredJobs.length > 0 ? (
            filteredJobs.map((job, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-lg shadow-md border"
              >
                <h3 className="text-lg font-semibold mb-2">{job.title}</h3>
                <p className="text-gray-600 mb-1">
                  Company: {job.companyName}
                </p>
                <p className="text-gray-600 mb-1">Location: {job.location}</p>
                <p className="text-gray-600">
                  Salary: ₹{job.salaryMin} - ₹{job.salaryMax}
                </p>
              </div>
            ))
          ) : (
            <p className="text-center col-span-3 text-gray-500">No jobs found.</p>
          )}
        </div>
      </Container>
    </div>
  );
}
