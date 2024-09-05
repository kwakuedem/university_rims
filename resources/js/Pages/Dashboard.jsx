import React from "react";
import { Head, Link, usePage } from "@inertiajs/react";
import Chart from "react-apexcharts";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";

const Dashboard = ({
    auth,
    statistics,
    numberOfCollaborations,
    numberOfNoCollaborations,
    numberOfResearch,
}) => {
    const commonChartOptions = {
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

    const publicationWithOutCollaborationChartOptions = {
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
                text: "Uncollaborated Works of the Year",
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

    const publicationChartSeries = [
        {
            name: "Publications",
            data: statistics.publications,
        },
    ];

    const publicationWithOutCollaborationChartSeries = [
        {
            name: "Uncollaborated Works for the Year",
            data: statistics.notcollaborations,
        },
    ];

    const collaborationChartSeries = [
        {
            name: "Collaborations",
            data: statistics.collaborations,
        },
    ];

    // const publicationChartSeries = statistics.publications;
    // const collaborationChartSeries = statistics.collaborations;

    return (
        <AuthenticatedLayout
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

                            <div className="cards flex w-[70%] m-auto gap-3 py-3">
                                <Link
                                    href={route("publications.index")}
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
                                    href={route("publications.index")}
                                    className="flex flex-col py-4 border-b-4 w-full rounded-b-md border-purple-900 items-center justify-center  shadow-md shadow-blue-600/70"
                                >
                                    <p className="text-lg font-extrabold text-purple-900">
                                        {numberOfNoCollaborations}
                                    </p>
                                    <p className="text-sm font-bold text-purple-900">
                                        Uncollaborated Works
                                    </p>
                                </Link>

                                <Link
                                    href={route("collaborations.index")}
                                    className="flex w-full flex-col border-b-4 rounded-b-md py-4 border-orange-400 items-center justify-center rounded-md shadow-md shadow-blue-600/70"
                                >
                                    <p className="text-lg font-extrabold text-orange-400">
                                        {numberOfCollaborations}
                                    </p>
                                    <p className="text-sm font-bold text-orange-400">
                                        Collaborated Works
                                    </p>
                                </Link>
                            </div>
                            <div className="grid justify-center items-center grid-cols-1 md:grid-cols-2 lg:grid-cols-3 lg:w-[80%] lg:m-auto gap-6 mt-6">
                                <div className="bg-white p-4 shadow rounded-lg">
                                    <Chart
                                        options={commonChartOptions}
                                        series={publicationChartSeries}
                                        type="bar"
                                        height={300}
                                    />
                                </div>

                                <div className="bg-white p-4 shadow rounded-lg">
                                    <Chart
                                        options={
                                            publicationWithOutCollaborationChartOptions
                                        }
                                        series={
                                            publicationWithOutCollaborationChartSeries
                                        }
                                        type="bar"
                                        height={300}
                                    />
                                </div>

                                {/* Add more sections here as needed */}
                                <div className="bg-white p-4 shadow rounded-lg">
                                    <Chart
                                        options={collaborationChartOptions}
                                        series={collaborationChartSeries}
                                        type="bar"
                                        height={300}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
};

export default Dashboard;
