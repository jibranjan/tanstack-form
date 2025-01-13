import { useState } from "react";
import FormHeading from "./FormHeading.tsx";

interface ImportantFieldsProps {
    form: any;
}

function ImportantFields({ form }: ImportantFieldsProps) {
    const [cities, setCities] = useState<string[]>([]);
    const [locations, setLocations] = useState<string[]>([""]);
    const [responsibilities, setResponsibilities] = useState<string[]>([""]);

    const [isExpanded, setIsExpanded] = useState(true);

    return (
        <section className="flex flex-col gap-3 bg-white rounded-lg px-5 py-3 shadow-md relative border border-gray-200">
            <FormHeading
                fieldName="Important Fields"
                isExpanded={isExpanded}
                onToggle={() => setIsExpanded(!isExpanded)}
            />

            {isExpanded && (
                <>
                    {/* JD Upload */}
                    <form.Field
                        className="flex flex-col gap-5 relative"
                        name="jdUpload"
                        children={(field: any) => {
                            return (
                                <div>
                                    <label htmlFor={field.name} className="text-sm text-gray-700">
                                        Upload or provide link to JD
                                    </label>
                                    <div className="flex items-center gap-2 mt-1">
                                        <button
                                            className="flex items-center gap-2 bg-indigo-200 border-indigo-200 text-indigo-900 text-sm px-3 py-2 rounded-lg"
                                            onClick={() => {
                                                /* Handle upload */
                                            }}
                                        >
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                strokeWidth={1.5}
                                                stroke="currentColor"
                                                className="w-4 h-4"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5"
                                                />
                                            </svg>
                                            Upload
                                        </button>
                                        <span className="text-sm font-light text-gray-500">or</span>
                                        <input
                                            id={field.name}
                                            name={field.name}
                                            value={field.state.value}
                                            onBlur={field.handleBlur}
                                            onChange={(e) => {
                                                field.handleChange(e.target.value);
                                            }}
                                            type="url"
                                            className="text-sm font-light text-gray-500 ring-0 border border-gray-300 w-full py-2 px-3 rounded-lg"
                                            placeholder="https://job.example.co/post=1"
                                        />
                                    </div>
                                </div>
                            );
                        }}
                    />

                    {/* AI Auto Populate */}
                    <div className="flex items-center gap-2 cursor-pointer w-fit ml-auto absolute right-2 top-36">
                        <svg
                            className="w-5 h-5"
                            viewBox="0 0 18 18"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M8.25005 3L7.87505 2.25L7.50005 3L6.75005 3.09375L7.37555 3.62475L7.12505 4.5L7.87505 4.0005L8.62505 4.5L8.37455 3.62475L9.00005 3.09375L8.25005 3ZM14.5005 10.9995L13.875 9.75L13.2495 10.9995L12 11.1562L13.0418 12.042L12.6255 13.5L13.875 12.6667L15.1245 13.5L14.7083 12.042L15.75 11.1562L14.5005 10.9995ZM5.0003 4.74975L4.50005 3.75L3.9998 4.74975L3.00005 4.875L3.8333 5.583L3.5003 6.75L4.50005 6.08325L5.4998 6.75L5.1668 5.583L6.00005 4.875L5.0003 4.74975ZM2.56055 12.75C2.56055 13.1505 2.71655 13.527 3.00005 13.8105L4.18955 15C4.47305 15.2835 4.84955 15.4395 5.25005 15.4395C5.65055 15.4395 6.02705 15.2835 6.31055 15L15 6.3105C15.2835 6.027 15.4395 5.6505 15.4395 5.25C15.4395 4.8495 15.2835 4.473 15 4.1895L13.8105 3C13.2435 2.433 12.2565 2.433 11.6895 3L3.00005 11.6895C2.71655 11.973 2.56055 12.3495 2.56055 12.75ZM12.75 4.0605L13.9395 5.25L11.25 7.9395L10.0605 6.75L12.75 4.0605Z"
                                fill="#3B82F6"
                            />
                        </svg>
                        <span className="text-sm text-blue-500">Auto-populate</span>
                    </div>

                    {/* Job Title */}
                    <form.Field
                        className="flex flex-col gap-5"
                        name="jobTitle"
                        children={(field: any) => {
                            return (
                                <div className="mt-10">
                                    <label
                                        htmlFor={field.name}
                                        className="text-sm text-gray-700 mt-7 eqp-required-field"
                                    >
                                        Job Title
                                    </label>
                                    <input
                                        id={field.name}
                                        name={field.name}
                                        value={field.state.value}
                                        onBlur={field.handleBlur}
                                        onChange={(e) => {
                                            field.handleChange(e.target.value);
                                        }}
                                        type="text"
                                        className="text-sm font-light text-gray-500 ring-0 border border-gray-300 w-full py-2 px-3 rounded-lg"
                                        placeholder="Ex. Software Engineer"
                                    />
                                </div>
                            );
                        }}
                    />

                    {/* Role Type */}
                    <div className="mt-3">
                        <span className="text-sm text-gray-700 eqp-required-field">
                            Role Type
                        </span>
                        <div className="flex items-center gap-3 mt-1">
                            {[
                                { id: "role-type-1", label: "On-site" },
                                { id: "role-type-2", label: "Hybrid" },
                                { id: "role-type-3", label: "Remote" },
                            ].map((option) => (
                                <form.Field
                                    key={option.id}
                                    name="roleType"
                                    children={(field: any) => {
                                        return (
                                            <span className="flex items-center gap-1.5">
                                                <input
                                                    id={option.id}
                                                    className="w-4 h-4 accent-blue-900"
                                                    type="radio"
                                                    name={field.name}
                                                    value={option.label}
                                                    checked={field.state.value === option.label}
                                                    onBlur={field.handleBlur}
                                                    onChange={(e) => field.handleChange(e.target.value)}
                                                />
                                                <label
                                                    htmlFor={option.id}
                                                    className="text-sm font-light text-gray-700"
                                                >
                                                    {option.label}
                                                </label>
                                            </span>
                                        );
                                    }}
                                />
                            ))}
                        </div>
                    </div>

                    {/* Location */}
                    <div className="mt-3">
                        <span className="text-sm text-gray-700 eqp-required-field">
                            Location(s)
                        </span>
                        <div>
                            {locations.map((loc, locIndex) => (
                                <form.Field
                                    key={loc + locIndex}
                                    name={`location${locIndex}`}
                                    children={(field: any) => {
                                        return (
                                            <div>
                                                <select
                                                    value={field.state.value}
                                                    defaultValue=""
                                                    className="text-sm font-light text-gray-500 ring-0 border border-gray-300 w-full py-2 px-3 rounded-lg mt-1"
                                                    onBlur={field.handleBlur}
                                                    onChange={(e) => {
                                                        field.handleChange(e.target.value);
                                                        setLocations((prev) =>
                                                            prev.map((location, index) =>
                                                                index === locIndex ? e.target.value : location
                                                            )
                                                        );
                                                    }}
                                                >
                                                    <option value="" disabled>
                                                        Select Country
                                                    </option>
                                                    <option
                                                        value="United States"
                                                        disabled={locations.includes("United States")}
                                                    >
                                                        United States
                                                    </option>
                                                    <option
                                                        value="Canada"
                                                        disabled={locations.includes("Canada")}
                                                    >
                                                        Canada
                                                    </option>
                                                    <option
                                                        value="United Kingdom"
                                                        disabled={locations.includes("United Kingdom")}
                                                    >
                                                        United Kingdom
                                                    </option>
                                                </select>

                                                <div className="flex flex-wrap gap-2 mt-1">
                                                    {cities.map((city) => (
                                                        <div
                                                            key={city}
                                                            className="flex items-center gap-2 bg-blue-50 text-blue-900 px-3 py-0.5 rounded-full text-xs border border-blue-200 w-fit"
                                                        >
                                                            <span>{city}</span>
                                                            <span
                                                                className="font-light text-base rotate-45 cursor-pointer"
                                                                onClick={() => {
                                                                    const newCities = cities.filter(
                                                                        (c) => c !== city
                                                                    );
                                                                    setCities(newCities);
                                                                }}
                                                            >
                                                                +
                                                            </span>
                                                        </div>
                                                    ))}
                                                </div>

                                                {field.state.value && (
                                                    <>
                                                        <form.Field
                                                            name="city"
                                                            children={(field: any) => {
                                                                return (
                                                                    <select
                                                                        value=""
                                                                        data-value={field.state.value}
                                                                        className="text-sm mt-1.5 font-light text-gray-700 w-20 outline-none"
                                                                        onBlur={field.handleBlur}
                                                                        onChange={(e) => {
                                                                            setCities((prevCities: string[]) => {
                                                                                const newCities = [...prevCities];
                                                                                newCities.push(e.target.value);
                                                                                return newCities;
                                                                            });
                                                                        }}
                                                                    >
                                                                        <option value="" disabled>
                                                                            Add City
                                                                        </option>
                                                                        <option
                                                                            value="Srinagar"
                                                                            disabled={cities.includes("Srinagar")}
                                                                        >
                                                                            Srinagar
                                                                        </option>
                                                                        <option
                                                                            value="Toronto"
                                                                            disabled={cities.includes("Toronto")}
                                                                        >
                                                                            Toronto
                                                                        </option>
                                                                        <option
                                                                            value="London"
                                                                            disabled={cities.includes("London")}
                                                                        >
                                                                            London
                                                                        </option>
                                                                        <option
                                                                            value="New York"
                                                                            disabled={cities.includes("New York")}
                                                                        >
                                                                            New York
                                                                        </option>
                                                                        <option
                                                                            value="San Francisco"
                                                                            disabled={cities.includes(
                                                                                "San Francisco"
                                                                            )}
                                                                        >
                                                                            San Francisco
                                                                        </option>
                                                                        <option
                                                                            value="Los Angeles"
                                                                            disabled={cities.includes("Los Angeles")}
                                                                        >
                                                                            Los Angeles
                                                                        </option>
                                                                        <option
                                                                            value="Chicago"
                                                                            disabled={cities.includes("Chicago")}
                                                                        >
                                                                            Chicago
                                                                        </option>
                                                                        <option
                                                                            value="Houston"
                                                                            disabled={cities.includes("Houston")}
                                                                        >
                                                                            Houston
                                                                        </option>
                                                                        <option
                                                                            value="Miami"
                                                                            disabled={cities.includes("Miami")}
                                                                        >
                                                                            Miami
                                                                        </option>
                                                                        <option
                                                                            value="Seattle"
                                                                            disabled={cities.includes("Seattle")}
                                                                        >
                                                                            Seattle
                                                                        </option>
                                                                        <option
                                                                            value="Boston"
                                                                            disabled={cities.includes("Boston")}
                                                                        >
                                                                            Boston
                                                                        </option>
                                                                        <option
                                                                            value="Washington D.C."
                                                                            disabled={cities.includes(
                                                                                "Washington D.C."
                                                                            )}
                                                                        >
                                                                            Washington D.C.
                                                                        </option>
                                                                    </select>
                                                                );
                                                            }}
                                                        />
                                                    </>
                                                )}
                                            </div>
                                        );
                                    }}
                                />
                            ))}
                        </div>

                        <button
                            disabled={locations.some((loc) => loc === "")}
                            title={
                                locations.some((loc) => loc === "")
                                    ? "Please add at least one country"
                                    : ""
                            }
                            className={`text-sm text-blue-500 mt-2 block ${locations.some((loc) => loc === "") ? "opacity-50" : ""
                                }`}
                            onClick={(e) => {
                                e.preventDefault();
                                setLocations((prev) => [...prev, ""]);
                            }}
                        >
                            Add Country +
                        </button>
                    </div>

                    {/* Job type */}
                    <form.Field
                        className="flex flex-col gap-5"
                        name="jobType"
                        children={(field: any) => {
                            return (
                                <div>
                                    <label
                                        htmlFor={field.name}
                                        className="text-sm text-gray-700 eqp-required-field"
                                    >
                                        Job Type
                                    </label>
                                    <select
                                        id={field.name}
                                        name={field.name}
                                        value={field.state.value}
                                        onBlur={field.handleBlur}
                                        onChange={(e) => {
                                            field.handleChange(e.target.value);
                                        }}
                                        className="text-sm font-light text-gray-500 ring-0 border border-gray-300 w-full py-2 px-3 rounded-lg mt-1"
                                    >
                                        <option value="" disabled>
                                            Select Job Type
                                        </option>
                                        <option value="Full-time">Full-time</option>
                                        <option value="Part-time">Part-time</option>
                                        <option value="Contract">Contract</option>
                                        <option value="Internship">Internship</option>
                                    </select>
                                </div>
                            );
                        }}
                    />

                    {/* Experience */}
                    <div>
                        <span className="text-sm text-gray-700 eqp-required-field">
                            Experience
                        </span>
                        <div className="flex items-center justify-between mt-1 gap-3">
                            <form.Field
                                name="experienceMin"
                                children={(field: any) => {
                                    return (
                                        <div className="w-full">
                                            <input
                                                type="number"
                                                name={field.name}
                                                value={field.state.value}
                                                onBlur={field.handleBlur}
                                                onChange={(e) => {
                                                    field.handleChange(e.target.value);
                                                }}
                                                className="text-sm font-light text-gray-500 ring-0 border border-gray-300 w-full py-2 px-3 rounded-lg mt-1"
                                                placeholder="Min Years"
                                            />
                                        </div>
                                    );
                                }}
                            />
                            <form.Field
                                name="experienceMax"
                                children={(field: any) => {
                                    return (
                                        <div className="w-full">
                                            <input
                                                type="number"
                                                name={field.name}
                                                value={field.state.value}
                                                onBlur={field.handleBlur}
                                                onChange={(e) => {
                                                    field.handleChange(e.target.value);
                                                }}
                                                className="text-sm font-light text-gray-500 ring-0 border border-gray-300 w-full py-2 px-3 rounded-lg mt-1"
                                                placeholder="Max Years"
                                            />
                                        </div>
                                    );
                                }}
                            />
                        </div>
                    </div>

                    {/* Skills */}
                    <form.Field
                        className="flex flex-col gap-5"
                        name="skills"
                        children={(field: any) => {
                            return (
                                <div>
                                    <label
                                        htmlFor={field.name}
                                        className="text-sm text-gray-700 eqp-required-field"
                                    >
                                        Skills
                                    </label>
                                    <select
                                        id={field.name}
                                        name={field.name}
                                        value={field.state.value}
                                        onBlur={field.handleBlur}
                                        onChange={(e) => {
                                            field.handleChange(e.target.value);
                                        }}
                                        className="text-sm font-light text-gray-500 ring-0 border border-gray-300 w-full py-2 px-3 rounded-lg mt-1"
                                    >
                                        <option value="" disabled>
                                            Select Skills
                                        </option>
                                        <option value="Python">Python</option>
                                        <option value="JavaScript">JavaScript</option>
                                        <option value="React">React</option>
                                        <option value="Node.js">Node.js</option>
                                    </select>
                                </div>
                            );
                        }}
                    />

                    {/* Job Description */}
                    <form.Field
                        className="flex flex-col gap-5"
                        name="jobDescription"
                        children={(field: any) => {
                            return (
                                <div>
                                    <label
                                        htmlFor={field.name}
                                        className="text-sm text-gray-700 eqp-required-field"
                                    >
                                        Job Description
                                    </label>
                                    {/* Later will use TipTap here */}
                                    <textarea
                                        id={field.name}
                                        name={field.name}
                                        value={field.state.value}
                                        onBlur={field.handleBlur}
                                        onChange={(e) => {
                                            field.handleChange(e.target.value);
                                        }}
                                        className="text-sm font-light text-gray-500 ring-0 border border-gray-300 w-full py-2 px-3 rounded-lg mt-1"
                                        placeholder="Enter Job Description"
                                    ></textarea>
                                </div>
                            );
                        }}
                    />

                    {/* Salary */}
                    <div>
                        <span className="text-sm text-gray-700 eqp-required-field">
                            Salary
                        </span>
                        <div className="flex items-center gap-3 mt-1">
                            <form.Field
                                name="salaryCurrency"
                                children={(field: any) => (
                                    <select
                                        name={field.name}
                                        value={field.state.value}
                                        onBlur={field.handleBlur}
                                        onChange={(e) => field.handleChange(e.target.value)}
                                        className="text-sm font-light text-gray-500 ring-0 border border-gray-300 py-2 px-3 rounded-lg w-24"
                                    >
                                        <option value="usd">$</option>
                                        <option value="inr">₹</option>
                                    </select>
                                )}
                            />
                            <form.Field
                                name="salaryMin"
                                children={(field: any) => (
                                    <input
                                        type="number"
                                        name={field.name}
                                        value={field.state.value}
                                        onBlur={field.handleBlur}
                                        onChange={(e) => field.handleChange(e.target.value)}
                                        className="text-sm font-light text-gray-500 ring-0 border border-gray-300 w-full py-2 px-3 rounded-lg"
                                        placeholder="Min salary"
                                    />
                                )}
                            />
                            <form.Field
                                name="salaryMax"
                                children={(field: any) => (
                                    <input
                                        type="number"
                                        name={field.name}
                                        value={field.state.value}
                                        onBlur={field.handleBlur}
                                        onChange={(e) => field.handleChange(e.target.value)}
                                        className="text-sm font-light text-gray-500 ring-0 border border-gray-300 w-full py-2 px-3 rounded-lg"
                                        placeholder="Max salary"
                                    />
                                )}
                            />
                        </div>
                    </div>

                    {/* Responsibilities */}
                    <form.Field
                        className="flex flex-col gap-5"
                        name="responsibilities"
                        children={(field: any) => {
                            return (
                                <div>
                                    <label className="text-sm text-gray-700 eqp-required-field">
                                        Responsibilities
                                    </label>
                                    {responsibilities.map((resp, respIndex) => (
                                        <div key={resp + respIndex}>
                                            <textarea
                                                name={`${field.name}-${respIndex}`}
                                                // value={field.state.value}
                                                defaultValue={resp}
                                                onBlur={(e) => {
                                                    field.handleBlur();
                                                    setResponsibilities((prev) =>
                                                        prev.map((resp, index) =>
                                                            index === respIndex ? e.target.value : resp
                                                        )
                                                    );
                                                }}
                                                onChange={(e) => {
                                                    field.handleChange(e.target.value);
                                                }}
                                                className="text-sm font-light text-gray-500 ring-0 border border-gray-300 w-full py-2 px-3 rounded-lg mt-1"
                                                placeholder="Enter Responsibilities"
                                            ></textarea>
                                        </div>
                                    ))}

                                    <button
                                        disabled={
                                            responsibilities[responsibilities.length - 1] === ""
                                        }
                                        className={`text-sm text-blue-500 cursor-pointer w-fit ${responsibilities[responsibilities.length - 1] === ""
                                                ? "opacity-50"
                                                : ""
                                            }`}
                                        title={
                                            responsibilities[responsibilities.length - 1] === ""
                                                ? "Please add at least one responsibility"
                                                : ""
                                        }
                                        onClick={(e) => {
                                            e.preventDefault();
                                            const allRespHaveValues = responsibilities.every(
                                                (resp) => resp !== ""
                                            );
                                            if (allRespHaveValues) {
                                                setResponsibilities((prev) => [...prev, ""]);
                                            }
                                        }}
                                    >
                                        Add more +
                                    </button>
                                </div>
                            );
                        }}
                    />

                    <form.Field
                        className="flex flex-col gap-5"
                        name="employmentStartDate"
                        children={(field: any) => {
                            return (
                                <div>
                                    <label htmlFor={field.name} className="text-sm text-gray-700">
                                        Employment Start Date
                                    </label>
                                    <input
                                        id={field.name}
                                        type="date"
                                        name={field.name}
                                        value={field.state.value}
                                        onBlur={field.handleBlur}
                                        onChange={(e) => field.handleChange(e.target.value)}
                                        className="text-sm font-light text-gray-500 ring-0 border border-gray-300 w-full py-2 px-3 rounded-lg mt-1"
                                    />
                                </div>
                            );
                        }}
                    />

                    {/* Application Deadline */}
                    <form.Field
                        className="flex flex-col gap-5"
                        name="applicationDeadline"
                        children={(field: any) => {
                            return (
                                <div>
                                    <label htmlFor={field.name} className="text-sm text-gray-700">
                                        Application Deadline
                                    </label>
                                    <input
                                        id={field.name}
                                        type="date"
                                        name={field.name}
                                        value={field.state.value}
                                        onBlur={field.handleBlur}
                                        onChange={(e) => field.handleChange(e.target.value)}
                                        className="text-sm font-light text-gray-500 ring-0 border border-gray-300 w-full py-2 px-3 rounded-lg mt-1"
                                    />
                                </div>
                            );
                        }}
                    />

                    {/* Show Company About */}
                    <form.Field
                        name="showCompanyAbout"
                        children={(field: any) => {
                            return (
                                <div>
                                    <span className="text-sm text-gray-700">
                                        Show Company About
                                    </span>
                                    <div className="flex items-center gap-3 mt-1">
                                        {[
                                            { id: "show-about-yes", value: true, label: "Yes" },
                                            { id: "show-about-no", value: false, label: "No" },
                                        ].map((option) => (
                                            <span
                                                key={option.id}
                                                className="flex items-center gap-1.5"
                                            >
                                                <input
                                                    id={option.id}
                                                    className="w-4 h-4 accent-blue-900"
                                                    type="radio"
                                                    name={field.name}
                                                    value={option.label}
                                                    checked={field.state.value === option.value}
                                                    onBlur={field.handleBlur}
                                                    onChange={(e) => field.handleChange(e.target.value)}
                                                />
                                                <label
                                                    htmlFor={option.id}
                                                    className="text-sm font-light text-gray-700"
                                                >
                                                    {option.label}
                                                </label>
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            );
                        }}
                    />
                </>
            )}
        </section>
    );
}
export default ImportantFields;
