import { useState } from "react";

interface ImportantFieldsProps {
    form: any;
}

function ImportantFields({ form }: ImportantFieldsProps) {
    const [cities, setCities] = useState<string[]>([]);
    const [locations, setLocations] = useState<string[]>([""]);
    const [responsibilities, setResponsibilities] = useState<string[]>([""]);
    const [roleType, setRoleType] = useState<string>("");
    const [restrictedLocation, setRestrictedLocation] = useState<boolean>(false);
    const [allowCountryRemoval, setAllowCountryRemoval] = useState<boolean>(false);

    const timezones = [
        { id: "utc", label: "UTC (Coordinated Universal Time)" },
        { id: "gmt", label: "GMT (Greenwich Mean Time)" },
        { id: "est", label: "EST (Eastern Standard Time)" },
        { id: "cst", label: "CST (Central Standard Time)" },
        { id: "mst", label: "MST (Mountain Standard Time)" },
        { id: "pst", label: "PST (Pacific Standard Time)" },
        { id: "ist", label: "IST (Indian Standard Time)" },
        { id: "cet", label: "CET (Central European Time)" },
        { id: "eet", label: "EET (Eastern European Time)" },
        { id: "aest", label: "AEST (Australian Eastern Standard Time)" },
        { id: "acst", label: "ACST (Australian Central Standard Time)" },
        { id: "hst", label: "HST (Hawaii Standard Time)" },
        { id: "akst", label: "AKST (Alaska Standard Time)" },
        { id: "jst", label: "JST (Japan Standard Time)" },
        { id: "kst", label: "KST (Korea Standard Time)" },
        { id: "nzst", label: "NZST (New Zealand Standard Time)" },
        { id: "bst", label: "BST (British Summer Time)" },
        { id: "aedt", label: "AEDT (Australian Eastern Daylight Time)" },
        { id: "ast", label: "AST (Atlantic Standard Time)" }
    ];


    return (
        <section className="flex flex-col gap-3">
            {/* Job Title */}
            <form.Field
                className="flex flex-col gap-5"
                name="jobTitle"
                children={(field: any) => {
                    return (
                        <div className="">
                            <label
                                htmlFor={field.name}
                                className="text-sm text-gray-700 mt-7 eqp-required-field"
                            >
                                Job Title
                            </label>
                            <input
                                id={field.name}
                                name={field.name}
                                value={field.state.value || ""}
                                onBlur={field.handleBlur}
                                onChange={(e) => {
                                    field.handleChange(e.target.value);
                                }}
                                type="text"
                                className="text-sm font-light text-gray-500 ring-0 border border-gray-300 w-full py-2 px-3 rounded-lg req-input-field"
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
                                            className="w-4 h-4 accent-blue-900 cursor-pointer req-input-field"
                                            type="radio"
                                            name={field.name}
                                            value={option.label}
                                            checked={field.state.value === option.label}
                                            onBlur={field.handleBlur}
                                            onChange={(e) => {
                                                setRoleType(e.target.value);
                                                field.handleChange(e.target.value);
                                            }}
                                        />
                                        <label
                                            htmlFor={option.id}
                                            className="text-sm font-light text-gray-700 cursor-pointer"
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

            {/* Policy */}
            {roleType === 'Hybrid' && (
                <form.Field
                    name="policy"
                    children={(field: any) => {
                        return (
                            <div>
                                <label htmlFor={field.name} className="text-sm text-gray-700 eqp-required-field">
                                    Policy
                                </label>
                                <input
                                    id={field.name}
                                    name={field.name}
                                    value={field.state.value || ""}
                                    onBlur={field.handleBlur}
                                    onChange={(e) => field.handleChange(e.target.value)}
                                    type="text"
                                    className="text-sm font-light text-gray-500 ring-0 border border-gray-300 w-full py-2 px-3 rounded-lg mt-1 req-input-field"
                                    placeholder="Ex. 3 days/week WFH"
                                />
                            </div>
                        );
                    }}
                />
            )}

            {/* Location */}
            <div>
                <span className={`text-sm text-gray-700 ${roleType !== 'Remote' ? 'eqp-required-field' : ''}`}>
                    {roleType !== 'Remote' ? 'Location(s)' : ''}
                    {roleType === 'Remote' && (
                        <form.Field
                            name="restrictedLocation"
                            children={(field: any) => {
                                return (
                                    <label
                                        htmlFor={field.name}
                                        className="flex items-center gap-2"
                                    >
                                        <input
                                            type="checkbox"
                                            name={field.name}
                                            onBlur={field.handleBlur}
                                            checked={field.state.value || false}
                                            onChange={(e) => {
                                                setRestrictedLocation(e.target.checked);
                                                field.handleChange(e.target.checked);
                                            }}
                                            className="w-3 h-3 accent-blue-900 cursor-pointer"
                                        />

                                        Restricted Location
                                    </label>
                                );
                            }}
                        />
                    )}
                </span>

                {((roleType === 'Remote' && restrictedLocation) || (roleType !== 'Remote')) && (
                    <div className={`${roleType === 'Remote' ? 'mx-5 mt-1' : ''}`}>
                        {locations.map((loc, locIndex) => (
                            <form.Field
                                key={loc}
                                name={`location${locIndex}`}
                                children={(field: any) => {
                                    return (
                                        <div>
                                            <div className="flex items-center justify-between gap-2">
                                                <select
                                                    name={field.name}
                                                    value={loc ?? field.state.value ?? ""}
                                                    className={`text-sm font-light text-gray-500 ring-0 border border-gray-300 w-full py-2 px-3 rounded-lg mt-1 ${((roleType === 'Remote' && restrictedLocation) || (roleType !== 'Remote')) ? 'req-input-field' : ''}`}
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
                                                    <option
                                                        value="China"
                                                        disabled={locations.includes("China")}
                                                    >
                                                        China
                                                    </option>
                                                    <option
                                                        value="India"
                                                        disabled={locations.includes("India")}
                                                    >
                                                        India
                                                    </option>
                                                </select>
                                                {allowCountryRemoval && locIndex > 0 && (roleType !== 'Remote') && (
                                                    <svg 
                                                        className="w-5 text-gray-500 cursor-pointer"
                                                        onClick={() => {
                                                            setLocations((prev) => {
                                                                const newLocations = prev.filter((_, index) => {
                                                                    return index !== locIndex;
                                                                });
                                                                return newLocations;
                                                            });
                                                        }}
                                                        xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"
                                                    >
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                                                    </svg>
                                                )}
                                            </div>

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
                )}

                {roleType !== 'Remote' && (
                    <button
                        disabled={locations.some((loc) => loc === "")}
                        title={
                            locations.some((loc) => loc === "")
                                ? "Please add at least one country"
                                : ""
                        }
                        className={`text-sm text-blue-500 mt-2 block ${locations.some((loc) => loc === "") ? "opacity-50" : "active:scale-95 transition-all duration-150 ease-in-out"
                            }`}
                        onClick={(e) => {
                            e.preventDefault();
                            setLocations((prev) => [...prev, ""]);
                            setAllowCountryRemoval(true);
                        }}
                    >
                        Add Country +
                    </button>
                )}
            </div>

            {/* Timezone Restriction if role type is Remote */}
            {roleType === 'Remote' && (
                <form.Field
                    name="timezoneRestriction"
                    children={(field: any) => {
                        return (
                            <>
                                <label htmlFor={field.name} className="text-sm text-gray-700 flex items-center gap-2 w-fit cursor-pointer">
                                    <input
                                        id={field.name}
                                        name={field.name}
                                        onBlur={field.handleBlur}
                                        checked={field.state.value || false}
                                        onChange={(e) => field.handleChange(e.target.checked)}
                                        type="checkbox"
                                        className="w-3 h-3 accent-blue-900 cursor-pointer"
                                    />
                                    Timezone Restriction
                                </label>

                                {field.state.value && (
                                    <div className="flex max-sm:flex-col gap-2 sm:items-center mx-5 text-sm font-light text-gray-700">
                                        <form.Field
                                            name="timezoneRestrictionHours"
                                            children={(field: any) => {
                                                return (
                                                    <label
                                                        htmlFor={field.name}
                                                        className="flex items-center gap-2"
                                                    >
                                                        <span className="max-sm:w-14 inline-block text-center">+/-</span>
                                                        <input
                                                            type="number"
                                                            name={field.name}
                                                            value={field.state.value || ""}
                                                            onBlur={field.handleBlur}
                                                            onChange={(e) => field.handleChange(e.target.value)}
                                                            className="text-sm font-light text-gray-500 ring-0 border border-gray-300 w-20 py-1.5 px-2 rounded-lg"
                                                            placeholder="Ex: 5"
                                                        />
                                                    </label>
                                                );
                                            }}
                                        />

                                        <form.Field
                                            name="timezoneRestrictionLocation"
                                            children={(field: any) => {
                                                return (
                                                    <div className="flex items-center gap-2 w-full">
                                                        <label htmlFor={field.name} className="max-sm:w-14 inline-block whitespace-nowrap">
                                                            hours of
                                                        </label>
                                                        <select
                                                            name={field.name}
                                                            value={field.state.value || ""}
                                                            className="text-sm font-light text-gray-500 ring-0 border border-gray-300 w-full max-w-52 py-1.5 px-2 rounded-lg"
                                                            onBlur={field.handleBlur}
                                                            onChange={(e) => field.handleChange(e.target.value)}
                                                        >
                                                            {timezones.map((timezone) => (
                                                                <option key={timezone.id} value={timezone.id}>
                                                                    {timezone.label}
                                                                </option>
                                                            ))}
                                                        </select>
                                                    </div>
                                                );
                                            }}
                                        />
                                    </div>
                                )}
                            </>
                        );
                    }}
                />
            )}

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
                                value={field.state.value || ""}
                                onBlur={field.handleBlur}
                                onChange={(e) => {
                                    field.handleChange(e.target.value);
                                }}
                                className="text-sm font-light text-gray-500 ring-0 border border-gray-300 w-full py-2 px-3 rounded-lg mt-1 req-input-field"
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
                                        value={field.state.value || ""}
                                        onBlur={field.handleBlur}
                                        onChange={(e) => {
                                            field.handleChange(e.target.value);
                                        }}
                                        className="text-sm font-light text-gray-500 ring-0 border border-gray-300 w-full py-2 px-3 rounded-lg mt-1 req-input-field"
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
                                        value={field.state.value || ""}
                                        onBlur={field.handleBlur}
                                        onChange={(e) => {
                                            field.handleChange(e.target.value);
                                        }}
                                        className="text-sm font-light text-gray-500 ring-0 border border-gray-300 w-full py-2 px-3 rounded-lg mt-1 req-input-field"
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
                                value={field.state.value || ""}
                                onBlur={field.handleBlur}
                                onChange={(e) => {
                                    field.handleChange(e.target.value);
                                }}
                                className="text-sm font-light text-gray-500 ring-0 border border-gray-300 w-full py-2 px-3 rounded-lg mt-1 req-input-field"
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
                                value={field.state.value || ""}
                                onBlur={field.handleBlur}
                                onChange={(e) => {
                                    field.handleChange(e.target.value);
                                }}
                                className="text-sm font-light text-gray-500 ring-0 border border-gray-300 w-full py-2 px-3 rounded-lg mt-1 req-input-field"
                                placeholder="Enter Job Description"
                            ></textarea>
                        </div>
                    );
                }}
            />

            {/* Salary */}
            <div>
                <span className="text-sm text-gray-700">
                    Salary
                </span>
                <div className="flex items-center gap-3 mt-1">
                    <form.Field
                        name="salaryCurrency"
                        children={(field: any) => (
                            <select
                                name={field.name}
                                value={field.state.value || ""}
                                onBlur={field.handleBlur}
                                onChange={(e) => field.handleChange(e.target.value)}
                                className="text-sm font-light text-gray-500 ring-0 border border-gray-300 py-2 px-3 rounded-lg w-24"
                            >
                                <option value="usd">USD</option>
                                <option value="inr">INR</option>
                            </select>
                        )}
                    />
                    <form.Field
                        name="salaryMin"
                        children={(field: any) => (
                            <input
                                type="number"
                                name={field.name}
                                value={field.state.value || ""}
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
                                value={field.state.value || ""}
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
                                        className="text-sm font-light text-gray-500 ring-0 border border-gray-300 w-full py-2 px-3 rounded-lg mt-1 req-input-field"
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
                                        : "active:scale-95 transition-all duration-150 ease-in-out"
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
                name="tentativeStartDate"
                children={(field: any) => {
                    return (
                        <div>
                            <label htmlFor={field.name} className="text-sm text-gray-700">
                                Tentative Start Date
                            </label>
                            <input
                                id={field.name}
                                type="month"
                                name={field.name}
                                value={field.state.value || ""}
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
                                value={field.state.value || ""}
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
                            <span className="text-sm text-gray-700 eqp-required-field">
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
                                            className="w-4 h-4 accent-blue-900 req-input-field"
                                            type="radio"
                                            name={field.name}
                                            defaultChecked={field.state.value === option.value}
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
        </section>
    );
}
export default ImportantFields;
