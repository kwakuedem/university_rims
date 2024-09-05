import React from "react";
import { Head, Link, usePage } from "@inertiajs/react";
import Chart from "react-apexcharts";
import AdminLayout from "../../Layouts/AdminLayout ";

const Dashboard = ({
    auth,
    statistics,
    numberOfUsers,
    numberOfResearch,
    numberOfDepartments,
    numberOfpublicationsWithCollaborations,
    numberOfpublicationsWithoutCollaborations,
}) => {
    const users = statistics.users;
    const departments = statistics.departments;
    // const users = [10, 25, 8, 15, 12];

    // Define chart options
    const options = {
        chart: {
            type: "pie",
            height: 250,
        },
        labels: statistics.departments,
        colors: ["#FF5733", "#33FF57", "#3357FF", "#F333FF", "#33FFF2"], // Customize colors as needed
        dataLabels: {
            enabled: true,
            style: {
                fontSize: "12px",
                fontFamily: "Arial, sans-serif",
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

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <h3 className="text-md font-semibold mb-4 text-black/60">
                                Welcome, {auth.user.name}!
                            </h3>

                            <div className="flex flex-row">
                                <div className="w-[95%] flex flex-col gap-3 m-auto">
                                    <div className="cards w-full flex flex-row">
                                        <div className="cards flex w-[65%] m-auto gap-3 py-3">
                                            <Link
                                                href={route(
                                                    "admin.publications.index"
                                                )}
                                                className="flex flex-col py-4 border-b-4 w-full rounded-b-md border-blue-900 items-center justify-center  shadow-md shadow-blue-600/70"
                                            >
                                                <p className="text-lg font-extrabold text-blue-900">
                                                    {numberOfResearch}
                                                </p>
                                                <p className="text-sm font-bold text-blue-900">
                                                    Total Publications
                                                </p>
                                            </Link>

                                            <Link
                                                href={route(
                                                    "admin.collaborations.index"
                                                )}
                                                className="flex w-full flex-col border-b-4 rounded-b-md py-4 border-purple-900 items-center justify-center rounded-md shadow-md shadow-blue-600/70"
                                            >
                                                <p className="text-lg font-extrabold text-purple-900">
                                                    {
                                                        numberOfpublicationsWithoutCollaborations
                                                    }
                                                </p>
                                                <p className="text-sm font-bold text-purple-900">
                                                    Uncollaborated Works
                                                </p>
                                            </Link>

                                            <Link
                                                href={route(
                                                    "admin.collaborations.index"
                                                )}
                                                className="flex flex-col py-4 border-b-4 w-full rounded-b-md border-orange-400 items-center justify-center  shadow-md shadow-blue-600/70"
                                            >
                                                <p className="text-lg font-extrabold text-orange-400">
                                                    {
                                                        numberOfpublicationsWithCollaborations
                                                    }
                                                </p>
                                                <p className="text-sm font-bold text-orange-400">
                                                    Collaborated Work
                                                </p>
                                            </Link>
                                        </div>
                                        <div className="right-side grid grid-cols-2 w-[25%] m-auto gap-3">
                                            <Link
                                                href={route(
                                                    "admin.departments.index"
                                                )}
                                                className="flex flex-col py-4 border-b-4 w-full rounded-b-md border-indigo-900 items-center justify-center  shadow-md shadow-blue-600/70"
                                            >
                                                <p className="text-lg font-extrabold text-indigo-900">
                                                    {numberOfDepartments}
                                                </p>
                                                <p className="text-sm font-bold text-indigo-900">
                                                    Departments
                                                </p>
                                            </Link>
                                            <Link
                                                href={route("admin.users")}
                                                className="flex flex-col py-4 border-b-4 w-full rounded-b-md border-green-900 items-center justify-center  shadow-md shadow-blue-600/70"
                                            >
                                                <p className="text-lg font-extrabold text-green-900">
                                                    {numberOfUsers}
                                                </p>
                                                <p className="text-sm font-bold text-green-900">
                                                    Users
                                                </p>
                                            </Link>
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
                                        <div className="right-charts w-[30%] flex justify-start">
                                            <div className="bg-white p-4 shadow rounded-lg pie-chart flex justify-start">
                                                <Chart
                                                    options={options}
                                                    series={series}
                                                    type="pie"
                                                    width="350"
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
