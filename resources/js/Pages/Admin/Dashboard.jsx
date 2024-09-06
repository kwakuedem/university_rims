import React from "react";
import { Head, Link, usePage } from "@inertiajs/react";
import Chart from "react-apexcharts";
import AdminLayout from "../../Layouts/AdminLayout ";
import { Bounce, Fade, Slide } from "react-awesome-reveal";

const Dashboard = ({
    auth,
    statistics,
    statusstatistics,
    numberOfUsers,
    numberOfResearch,
    numberOfPublished,
    numberOfDepartments,
    numberOfUnpublished,
    publicationByDepartmentstatistics,
    numberOfpublicationsWithCollaborations,
    numberOfpublicationsWithoutCollaborations,
}) => {
    const users = statistics.users;
    const departments = statistics.departments;
    const departmentNames = publicationByDepartmentstatistics.map(
        (stat) => stat.department
    );
    const publicationCounts = publicationByDepartmentstatistics.map(
        (stat) => stat.publication_count
    );
    // const users = [10, 25, 8, 15, 12];

    // Define chart options
    const options = {
        chart: {
            type: "pie",
            height: 250,
        },
        labels: statistics.departments,
        colors: [
            "#C5CAE9",
            "#3F51B5",
            "#FF8A66",
            "#66FF8A",
            "#C5CAE9",
            "#9F66FF",
            "#668AFF",
            "#F366FF",
            "#668AFF",
            "#66FFF5",
        ],
        dataLabels: {
            enabled: true,
            style: {
                fontSize: "10px",
                fontFamily: "Arial, sans-serif",
                colors: ["#FFFF00"],
            },

            offset: -8, // Adjust this value to move the labels closer or further away from the chart
        },
        legend: {
            position: "right", // Change this to 'top', 'bottom', or 'left' based on your layout preference
            offsetX: 0, // Adjust horizontal offset
            offsetY: 0, // Adjust vertical offset
            labels: {
                colors: "#000", // Customize legend text color if needed
            },
        },
        responsive: [
            {
                breakpoint: 480,
                options: {
                    chart: {
                        width: 220,
                    },
                    legend: {
                        position: "bottom",
                    },
                },
            },
        ],
    };

    const statusoptions = {
        chart: {
            type: "pie",
            height: 250,
        },
        labels: ["Published", "Unpublished"],
        colors: ["#F333FF", "#33FFF2"], // Customize colors as needed
        dataLabels: {
            enabled: true,
            style: {
                fontSize: "10px",
                fontFamily: "Arial, sans-serif",
                colors: ["#1D4ED8"],
            },
            offset: -8, // Adjust this value to move the labels closer or further away from the chart
        },
        legend: {
            position: "right", // Change this to 'top', 'bottom', or 'left' based on your layout preference
            offsetX: 0, // Adjust horizontal offset
            offsetY: 0, // Adjust vertical offset
            labels: {
                colors: "#000", // Customize legend text color if needed
            },
        },
        responsive: [
            {
                breakpoint: 480,
                options: {
                    chart: {
                        width: 220,
                    },
                    legend: {
                        position: "bottom",
                    },
                },
            },
        ],
    };

    const publicationChartOptions = {
        chart: {
            type: "bar",
            height: 350,
        },
        plotOptions: {
            bar: {
                horizontal: false,
                columnWidth: "40%",
                endingShape: "rounded",
            },
        },
        dataLabels: {
            enabled: false,
        },
        stroke: {
            show: true,
            width: 2,
            colors: ["transparent"],
        },
        xaxis: {
            categories: statistics.years,
        },
        yaxis: {
            title: {
                text: "Total Publications of the Year",
            },
        },
        fill: {
            colors: ["#032B44"], // Orange color
            opacity: 1,
        },
        tooltip: {
            y: {
                formatter: (val) => val,
            },
        },
    };

    const collaborationChartOptions = {
        chart: {
            type: "bar",
            height: 350,
        },
        plotOptions: {
            bar: {
                horizontal: false,
                columnWidth: "40%",
                endingShape: "rounded",
            },
        },
        dataLabels: {
            enabled: false,
        },
        stroke: {
            show: true,
            width: 2,
            colors: ["transparent"],
        },
        xaxis: {
            categories: statistics.years,
        },
        yaxis: {
            title: {
                text: "Collaboration works for the Year",
            },
        },
        fill: {
            colors: ["#FFA500"], // Orange color
            opacity: 1,
        },
        tooltip: {
            y: {
                formatter: (val) => val,
            },
        },
    };

    const notcollaborationChartOptions = {
        chart: {
            type: "bar",
            height: 350,
        },
        plotOptions: {
            bar: {
                horizontal: false,
                columnWidth: "40%",
                endingShape: "rounded",
            },
        },
        dataLabels: {
            enabled: false,
        },
        stroke: {
            show: true,
            width: 2,
            colors: ["transparent"],
        },
        xaxis: {
            categories: statistics.years,
        },
        yaxis: {
            title: {
                text: "Uncollaborated Works for the Year",
            },
        },
        fill: {
            colors: ["#3B0F6F"], // Orange color
            opacity: 1,
        },
        tooltip: {
            y: {
                formatter: (val) => val,
            },
        },
    };

    const publicationByDepartmentstatisticsoptions = {
        chart: {
            type: "pie",
            height: 250,
        },
        labels: departmentNames,
        colors: ["#FF7F50", "#6A5ACD", "#20B2AA", "#FF6347", "#4682B4"],
        dataLabels: {
            enabled: true,
            style: {
                fontSize: "10px",
                fontFamily: "Arial, sans-serif",
                colors: ["#004080"],
            },
            offset: -8, // Adjust this value to move the labels closer or further away from the chart
        },
        legend: {
            position: "right", // Change this to 'top', 'bottom', or 'left' based on your layout preference
            offsetX: 0, // Adjust horizontal offset
            offsetY: 0, // Adjust vertical offset
            labels: {
                colors: "#000", // Customize legend text color if needed
            },
        },
        responsive: [
            {
                breakpoint: 480,
                options: {
                    chart: {
                        width: 220,
                    },
                    legend: {
                        position: "bottom",
                    },
                },
            },
        ],
    };

    const publicationChartSeries = [
        {
            name: "Publications",
            data: statistics.publications,
        },
    ];

    const collaborationChartSeries = [
        {
            name: "Collaborations",
            data: statistics.collaborations,
        },
    ];

    const notcollaborationChartSeries = [
        {
            name: "Not Collaborations",
            data: statistics.notcollaborations,
        },
    ];

    const series = statistics.users;
    const statusseries = [
        statusstatistics.published,
        statusstatistics.unpublished,
    ];

    const publicationsByDepartmentseries = publicationCounts;

    return (
        <AdminLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-sm text-gray-800/60 leading-tight">
                    Dashboard
                </h2>
            }
        >
            <Head title="Dashboard" />

            <div className="pb-12 pt-6">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <h3 className="text-md font-semibold mb-4 text-black/60">
                                Welcome, {auth.user.name}!
                            </h3>

                            <div className="flex flex-row">
                                <div className="w-[95%] flex flex-col gap-3 m-auto">
                                    <div className="full flex flex-row">
                                        {" "}
                                        <div className="cards flex w-[65%] m-auto gap-3">
                                            <Bounce
                                                direction="top"
                                                duration={2000}
                                                triggerOnce={false}
                                                className="pt-6  border-b-4 w-full rounded-b-md border-blue-900 items-center justify-center   shadow-blue-600/70"
                                            >
                                                <Link
                                                    href={route(
                                                        "admin.publications.index"
                                                    )}
                                                    className="flex flex-col items-center"
                                                >
                                                    <p className="text-sm font-extrabold text-blue-900">
                                                        {numberOfResearch}
                                                    </p>
                                                    <p className="text-xs font-bold text-blue-900">
                                                        Total Submissions
                                                    </p>
                                                </Link>
                                            </Bounce>

                                            <Bounce
                                                direction="top"
                                                duration={2000}
                                                triggerOnce={false}
                                                className="pt-6  border-b-4 w-full rounded-b-md border-blue-600 items-center justify-center   shadow-blue-600/70"
                                            >
                                                <Link
                                                    href={route(
                                                        "admin.publications.index"
                                                    )}
                                                    className="flex flex-col items-center"
                                                >
                                                    <p className="text-sm font-extrabold text-blue-900">
                                                        {numberOfPublished}
                                                    </p>
                                                    <p className="text-xs font-bold text-blue-600">
                                                        Published
                                                    </p>
                                                </Link>
                                            </Bounce>
                                            <Bounce
                                                direction="top"
                                                duration={2000}
                                                triggerOnce={false}
                                                className="pt-6  border-b-4 w-full rounded-b-md border-purple-500 items-center justify-center   shadow-blue-600/70"
                                            >
                                                <Link
                                                    href={route(
                                                        "admin.publications.index"
                                                    )}
                                                    className="flex flex-col items-center"
                                                >
                                                    <p className="text-sm font-extrabold text-purple-500">
                                                        {numberOfUnpublished}
                                                    </p>
                                                    <p className="text-xs font-bold text-purple-500">
                                                        Unpublished
                                                    </p>
                                                </Link>
                                            </Bounce>
                                            <Bounce
                                                direction="top"
                                                duration={2000}
                                                triggerOnce={false}
                                                className="pt-6  border-b-4 w-full rounded-b-md border-purple-900 items-center justify-center   shadow-blue-600/70"
                                            >
                                                <Link
                                                    href={route(
                                                        "admin.collaborations.index"
                                                    )}
                                                    className="flex  flex-col items-center "
                                                >
                                                    <p className="text-sm font-extrabold text-purple-900">
                                                        {
                                                            numberOfpublicationsWithoutCollaborations
                                                        }
                                                    </p>
                                                    <p className="text-xs font-bold text-purple-900">
                                                        Uncollaborated
                                                    </p>
                                                </Link>
                                            </Bounce>

                                            <Bounce
                                                direction="top"
                                                duration={2000}
                                                triggerOnce={true}
                                                className="pt-6  border-b-4 w-full rounded-b-md border-orange-400 items-center justify-center   shadow-blue-600/70"
                                            >
                                                <Link
                                                    href={route(
                                                        "admin.collaborations.index"
                                                    )}
                                                    className="flex flex-col pb-2 items-center"
                                                >
                                                    <p className="text-sm font-extrabold text-orange-400">
                                                        {
                                                            numberOfpublicationsWithCollaborations
                                                        }
                                                    </p>
                                                    <p className="text-xs font-bold text-orange-400">
                                                        Collaborated
                                                    </p>
                                                </Link>
                                            </Bounce>
                                        </div>
                                        <div className="right-side grid grid-cols-2 w-[25%] m-auto gap-3">
                                            <Bounce
                                                direction="top"
                                                duration={2000}
                                                triggerOnce={true}
                                                className="pt-4 border-b-4 w-full rounded-b-md border-indigo-900 items-center justify-center   shadow-blue-600/70"
                                            >
                                                <Link
                                                    href={route(
                                                        "admin.departments.index"
                                                    )}
                                                    className="flex flex-col pb-2 items-center"
                                                >
                                                    <p className="text-sm font-extrabold text-indigo-900">
                                                        {numberOfDepartments}
                                                    </p>
                                                    <p className="text-xs font-bold text-indigo-900">
                                                        Departments
                                                    </p>
                                                </Link>
                                            </Bounce>
                                            <Bounce
                                                direction="top"
                                                duration={2000}
                                                triggerOnce={true}
                                                className="pt-4 border-b-4 w-full rounded-b-md  border-green-900 items-center justify-center   shadow-blue-600/70"
                                            >
                                                <Link
                                                    href={route("admin.users")}
                                                    className="flex flex-col items-center pb-2"
                                                >
                                                    <p className="text-sm font-extrabold text-green-900">
                                                        {numberOfUsers}
                                                    </p>
                                                    <p className="text-xs font-bold text-green-900">
                                                        Users
                                                    </p>
                                                </Link>
                                            </Bounce>
                                        </div>
                                    </div>
                                    <div className="charts flex flex-row gap-3">
                                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6 w-[70%] m-auto lg:m-auto">
                                            <div className="bg-white p-4 shadow rounded-lg">
                                                <Chart
                                                    options={
                                                        publicationChartOptions
                                                    }
                                                    series={
                                                        publicationChartSeries
                                                    }
                                                    type="bar"
                                                    height={300}
                                                />
                                            </div>

                                            {/* Add more sections here as needed */}
                                            <div className="bg-white p-4 shadow rounded-lg">
                                                <Chart
                                                    options={
                                                        notcollaborationChartOptions
                                                    }
                                                    series={
                                                        notcollaborationChartSeries
                                                    }
                                                    type="bar"
                                                    height={300}
                                                />
                                            </div>

                                            {/* Add more sections here as needed */}
                                            <div className="bg-white p-4 shadow rounded-lg">
                                                <Chart
                                                    options={
                                                        collaborationChartOptions
                                                    }
                                                    series={
                                                        collaborationChartSeries
                                                    }
                                                    type="bar"
                                                    height={300}
                                                />
                                            </div>
                                        </div>
                                        <div className="right-charts w-[30%] flex flex-col justify-start">
                                            <div className="bg-white px-4 shadow rounded-lg pie-chart ">
                                                <p className="text-sm text-black/70 py-1">
                                                    users per department
                                                </p>
                                                <Chart
                                                    options={options}
                                                    series={series}
                                                    type="pie"
                                                    width="300"
                                                />
                                            </div>
                                            <div className="bg-white px-4 shadow rounded-lg pie-chart mt-1">
                                                <p className="text-sm text-black/70 py-1">
                                                    publications per status
                                                </p>
                                                <Chart
                                                    options={statusoptions}
                                                    series={statusseries}
                                                    type="pie"
                                                    width="260"
                                                />
                                            </div>
                                            <div className="bg-white px-4 shadow rounded-lg pie-chart mt-1">
                                                <p className="text-sm text-black/70 py-1">
                                                    publications per department
                                                </p>
                                                <Chart
                                                    options={
                                                        publicationByDepartmentstatisticsoptions
                                                    }
                                                    series={
                                                        publicationsByDepartmentseries
                                                    }
                                                    type="pie"
                                                    width="300"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
};

export default Dashboard;
