import React from "react";
import Card from "../ui/Card/Card";

const IndicatorsSkeleton = () => {
    const DATA_INDICATORS = [
        {
            title: "Ingresos totales",
            color: "bg-green-100",
        },
        {
            title: "Ventas realizadas",
            color: "bg-indigo-100",
        },
        {
            title: "Gastos totales",

            color: "bg-red-100",
        },
        {
            title: "Comisiones pagadas",
            color: "bg-yellow-100",
        },
    ];

    return (
        <div className="grid gap-4 lg:grid-cols-4 md:grid-cols-2 animate-pulse ">
            {DATA_INDICATORS.map((item, index) => (
                <Card
                    key={index}
                    className="flex-col flex-wrap items-center gap-4 h-36"
                >
                    <div
                        className={`inline-block rounded-md w-8 h-8 p-1 ${item.color}`}
                    ></div>
                    <div className="flex flex-col gap-2">
                        <h3 className="h-3 text-gray-700 bg-gray-100"></h3>
                        <div>
                            <h4 className="h-3 font-bold text-gray-700 bg-gray-100"></h4>
                        </div>
                        <h4 className="h-4 font-bold text-gray-700 bg-gray-200"></h4>
                    </div>
                </Card>
            ))}
        </div>
    );
};

export default IndicatorsSkeleton;
