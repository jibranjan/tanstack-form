import FormHeading from "./FormHeading.tsx";

interface ImportantFieldsProps {
    form: any;
}

function ImportantFields({ form }: ImportantFieldsProps) {
    return (
        <section className="flex flex-col gap-3 bg-white rounded-lg px-5 py-3 shadow-md relative">
            <FormHeading fieldName="Important Fields" />

            {/* JD Upload */}
            <form.Field className="flex flex-col gap-5 relative" name="jdUpload">
                <label className="text-sm text-gray-700">
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
                        type="url"
                        className="text-sm font-light text-gray-500 ring-0 border border-gray-300 w-full py-2 px-3 rounded-lg"
                        placeholder="https://job.example.co/post=1"
                    />
                </div>
            </form.Field>

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
                validators={{
                    onChangeAsyncDebounceMs: 500,
                    onChangeAsync: ({ value }: any) =>
                        value.length < 3
                            ? 'Job title must be at least 3 characters'
                            : undefined,
                }}
                children={(field: any) => {
                    // const { isTouched, isPristine, isDirty } = field.state.meta
                    return (
                        <>
                            <label className="text-sm text-gray-700 mt-7 eqp-required-field">Job Title</label>
                            <input
                                name={field.name}
                                value={field.state.value}
                                onBlur={field.handleBlur}
                                onChange={(e) => {
                                    field.handleChange(e.target.value)
                                    console.log(field.state.errors)
                                }}
                                type="text"
                                className="text-sm font-light text-gray-500 ring-0 border border-gray-300 w-full py-2 px-3 rounded-lg"
                                placeholder="Ex. Software Engineer"
                            />
                            {field.state.meta.errors.length > 0 && <p className="text-red-500 text-xs">{field.state.meta.errors[0]}</p>}
                        </>
                    )
                }}
            />

            {/* Role Type */}
            <div className="mt-3">
                <span className="text-sm text-gray-700 eqp-required-field">Role Type</span>
                <div className="flex items-center gap-3 mt-1">
                    {[
                        { id: "role-type-1", label: "On-site" },
                        { id: "role-type-2", label: "Hybrid" },
                        { id: "role-type-3", label: "Remote" }
                    ].map((option) => (
                        <form.Field
                            key={option.id}
                            name="roleType"
                            children={(field: any) => (
                                <span className="flex items-center gap-1.5">
                                    <input
                                        id={option.id}
                                        className="w-4 h-4 accent-blue-900"
                                        type="radio"
                                        name={field.name}
                                        value={option.label}
                                        checked={field.state.value === option.label}
                                        onChange={(e) => field.handleChange(e.target.value)}
                                    />
                                    <label htmlFor={option.id} className="text-sm font-light text-gray-700">
                                        {option.label}
                                    </label>
                                </span>
                            )}
                        />
                    ))}
                </div>
            </div>

            {/* Location */}
            <form.Field
                name="locations"
                children={(field: any) => {
                    const countries = [
                        { name: "United States" },
                        { name: "Canada" },
                        { name: "United Kingdom" }
                    ];
                    const cities = [
                        { name: "New York" },
                        { name: "Toronto" },
                        { name: "London" }
                    ];
                    return (
                        <div id="locations-container">
                            <label className="text-sm text-gray-700 eqp-required-field">
                                Location(s)
                            </label>

                            {field.state.value.map((location: any, index: number) => (
                                <div key={index} className="country-section mb-4">
                                    <select
                                        className="job-location-select text-sm mt-1 font-light text-gray-500 ring-1 ring-gray-300 w-full py-2 px-3 rounded-lg border-r-8 border-r-transparent"
                                        value={location.country}
                                        onChange={(e) => {
                                            const newLocations = [...field.state.value];
                                            newLocations[index].country = e.target.value;
                                            field.handleChange(newLocations);
                                        }}
                                    >
                                        <option value="" disabled>Select Country</option>
                                        {countries.map((country) => (
                                            <option key={country.name} value={country.name}>
                                                {country.name}
                                            </option>
                                        ))}
                                    </select>

                                    <div className="flex items-center gap-2 mt-2">
                                        <div className="selected-cities-ctr flex flex-wrap gap-2">
                                            {location.cities.map((city: string, cityIndex: number) => (
                                                <div key={cityIndex} className="flex items-center gap-2 bg-blue-50 text-blue-900 px-3 py-1.5 rounded-full text-xs border border-blue-200">
                                                    <span>{city}</span>
                                                    <button
                                                        type="button"
                                                        className="hover:text-blue-700 focus:outline-none"
                                                        onClick={() => {
                                                            const newLocations = [...field.state.value];
                                                            newLocations[index].cities = newLocations[index].cities.filter((_, i) => i !== cityIndex);
                                                            field.handleChange(newLocations);
                                                        }}
                                                    >
                                                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                                        </svg>
                                                    </button>
                                                </div>
                                            ))}

                                            <select
                                                className="job-location-city text-sm mt-1 font-light text-gray-700 w-20 outline-none"
                                                value=""
                                                onChange={(e) => {
                                                    if (e.target.value) {
                                                        const newLocations = [...field.state.value];
                                                        newLocations[index].cities.push(e.target.value);
                                                        field.handleChange(newLocations);
                                                        e.target.value = "";
                                                    }
                                                }}
                                            >
                                                <option value="" disabled>Add City</option>
                                                {cities
                                                    .filter((city) => !location.cities.includes(city.name))
                                                    .map((city) => (
                                                        <option key={city.name} value={city.name}>
                                                            {city.name}
                                                        </option>
                                                    ))}
                                            </select>
                                        </div>
                                    </div>
                                </div>
                            ))}

                            <div
                                className="flex items-center gap-1.5 mt-2 cursor-pointer"
                                onClick={() => {
                                    field.handleChange([
                                        ...field.state.value,
                                        { country: "", cities: [] }
                                    ]);
                                }}
                            >
                                <svg className="w-5 h-5 text-blue-600 stroke-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                                </svg>
                                <span className="text-sm text-blue-600">Add Country</span>
                            </div>
                        </div>
                    )
                }}
            />


        </section>
    );
}

export default ImportantFields;
