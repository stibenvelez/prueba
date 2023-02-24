import React, { FC, Fragment } from "react";
import { Table, Row, Thead } from "../../components/ui/Table";

type SkeletonTableType = {
    rows?: number;
    columns?: number;
    paddingYRows?: number;
    arrayTitles?: string[];
};

const SkeletonTable: FC<SkeletonTableType> = ({
    rows = 4,
    columns = 2,
    paddingYRows = 2,
    arrayTitles = [],
}) => {
    const ArrayRows = Array.from({ length: rows }, (_, index) => index);
    const ArrayColumns = Array.from({ length: columns }, (_, index) => index);
    const modeTitle = () => arrayTitles.length? arrayTitles: ArrayColumns;


    return (
        <div className="animate-pulse">
            <Table>
                <Thead>
                    <tr className="">
                        {modeTitle().map((title, index) => (
                            <th scope="col" className="px-6 py-3" key={index}>
                                {arrayTitles.length !== 0 ? (
                                    title
                                ) : (
                                    <div
                                        className={`${
                                            !arrayTitles.length
                                                ? "bg-gray-200/50"
                                                : ""
                                        } w-full h-2  rounded-md my-1`}
                                    />
                                )}
                            </th>
                        ))}
                    </tr>
                </Thead>
                <tbody>
                    {ArrayRows.map((_, index) => (
                        <Row key={index}>
                            {ArrayColumns.map((_, index) => (
                                <Fragment key={index}>
                                    <th
                                        scope="row"
                                        className={`${
                                            "py-" + paddingYRows
                                        } px-6 py-2 font-medium text-gray-900 dark:text-white whitespace-nowrap`}
                                    >
                                        <div className="w-full h-3 my-1 bg-gray-200 rounded-md"></div>
                                    </th>
                                </Fragment>
                            ))}
                        </Row>
                    ))}
                </tbody>
            </Table>
        </div>
    );
};

export default SkeletonTable;
