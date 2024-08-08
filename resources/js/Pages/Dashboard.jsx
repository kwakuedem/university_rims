import React from "react";
import { Head, Link, usePage } from "@inertiajs/react";
import Chart from "react-apexcharts";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";

const Dashboard = ({ auth, statistics }) => {
    // Example data for the chart
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

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Dashboard
                </h2>
            }
        >
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <h3 className="text-lg font-semibold mb-4">
                                Welcome, {auth.user.name}!
                            </h3>

                            <div className="cards grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 w-full py-3">
                                <Link className="flex flex-col py-4 border-2 border-blue-900/80 items-center justify-center rounded-md shadow-md shadow-blue-600/70">
                                    <p className="text-xl font-bold text-blue-900">
                                        100
                                    </p>
                                    <p className="text-xl font-bold text-blue-900">
                                        Publications
                                    </p>
                                </Link>

                                <Link className="flex flex-col py-4 bottom-1 border-blue-900/80 items-center justify-center rounded-md shadow-md shadow-blue-600/70">
                                    <p className="text-xl font-bold text-blue-900">
                                        300
                                    </p>
                                    <p className="text-xl font-bold text-blue-900">
                                        Submissions
                                    </p>
                                </Link>

                                <Link className="flex flex-col py-4 bottom-1 border-blue-900/80 items-center justify-center rounded-md shadow-md shadow-blue-600/70">
                                    <p className="text-xl font-bold text-blue-900">
                                        45
                                    </p>
                                    <p className="text-xl font-bold text-blue-900">
                                        Collaborators
                                    </p>
                                </Link>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
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
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
};

export default Dashboard;
