import React from "react";
import { Head, Link, usePage } from "@inertiajs/react";
import Chart from "react-apexcharts";
import AdminLayout from "../../Layouts/AdminLayout ";

const Dashboard = ({
    auth,
    statistics,

    numberOfResearch,
    numberOfpublicationsWithCollaborations,
    numberOfpublicationsWithoutCollaborations,
}) => {
    const chartOptions = {
        chart: {
            type: "bar",
            height: 200,
        },
        plotOptions: {
            bar: {
                horizontal: false,
                columnWidth: "55%",
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
            fillColor: "#EB8C87",
            strokeColor: "#C23829",
        },
        xaxis: {
            categories: statistics.months,
        },
        yaxis: {
            title: {
                text: "Publications",
            },
        },
        fill: {
            opacity: 1,
        },
        tooltip: {
            y: {
                formatter: (val) => `${val} publications`,
            },
        },
    };
    //second
    const chartOptions2 = {
        chart: {
            type: "bar",
            height: 200,
        },
        plotOptions: {
            bar: {
                horizontal: false,
                columnWidth: "55%",
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
            categories: statistics.months,
        },
        yaxis: {
            title: {
                text: "Submissions",
            },
        },
        fill: {
            opacity: 1,
        },
        tooltip: {
            y: {
                formatter: (val) => `${val} publications`,
            },
        },
    };

    const chartSeries = [
        {
            name: "Publications",
            data: statistics.publications,
        },
    ];

    //second
    const chartSeries2 = [
        {
            name: "Submissions",
            data: statistics.publications,
        },
    ];

    //third
    const chartSeries3 = [
        {
            name: "Collaborations",
            data: statistics.publications,
        },
    ];

    const chartOptions3 = {
        chart: {
            type: "bar",
            height: 200,
        },
        plotOptions: {
            bar: {
                horizontal: false,
                columnWidth: "55%",
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
            categories: statistics.months,
        },
        yaxis: {
            title: {
                text: "Collaborations",
            },
        },
        fill: {
            opacity: 1,
        },
        tooltip: {
            y: {
                formatter: (val) => `${val} publications`,
            },
        },
    };

    // console.log(auth);
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

                            <div className="cards flex w-[70%] m-auto gap-3 py-3">
                                <Link
                                    href={route("publications.index")}
                                    className="flex flex-col py-4 border-b-4 w-full rounded-b-md border-blue-900/80 items-center justify-center  shadow-md shadow-blue-600/70"
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
                                    className="flex flex-col py-4 border-b-4 w-full rounded-b-md border-blue-900/80 items-center justify-center  shadow-md shadow-blue-600/70"
                                >
                                    <p className="text-lg font-extrabold text-blue-900">
                                        {numberOfpublicationsWithCollaborations}
                                    </p>
                                    <p className="text-sm font-bold text-blue-900">
                                        Collaborated Work
                                    </p>
                                </Link>

                                <Link
                                    href={route("collaborations.index")}
                                    className="flex w-full flex-col border-b-4 rounded-b-md py-4 border-blue-300 items-center justify-center rounded-md shadow-md shadow-blue-600/70"
                                >
                                    <p className="text-lg font-extrabold text-blue-900">
                                        {
                                            numberOfpublicationsWithoutCollaborations
                                        }
                                    </p>
                                    <p className="text-sm font-bold text-blue-900">
                                        Without Collaboration
                                    </p>
                                </Link>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
                                <div className="bg-white p-4 shadow rounded-lg">
                                    <h4 className="text-md font-semibold mb-2">
                                        Publication Statistics
                                    </h4>
                                    <Chart
                                        options={chartOptions}
                                        series={chartSeries}
                                        type="bar"
                                        height={200}
                                    />
                                </div>

                                {/* Add more sections here as needed */}
                                <div className="bg-white p-4 shadow rounded-lg">
                                    <h4 className="text-md font-semibold mb-2">
                                        Submission Statistics
                                    </h4>
                                    <Chart
                                        options={chartOptions2}
                                        series={chartSeries2}
                                        type="bar"
                                        height={200}
                                    />
                                </div>

                                {/* Add more sections here as needed */}
                                <div className="bg-white p-4 shadow rounded-lg">
                                    <h4 className="text-md font-semibold mb-2">
                                        Collaboration Statistics
                                    </h4>
                                    <Chart
                                        options={chartOptions3}
                                        series={chartSeries3}
                                        type="bar"
                                        height={200}
                                    />
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
