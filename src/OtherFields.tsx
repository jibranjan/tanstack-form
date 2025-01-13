import { useState } from "react";
import FormHeading from "./FormHeading.tsx";

interface ImportantFieldsProps {
    form: any;
}

function OtherFields({ form }: OtherFieldsProps) {
    const [isExpanded, setIsExpanded] = useState(true);

    return (
        <section
            className="flex flex-col gap-3 bg-white rounded-lg px-5 py-3 shadow-md relative border border-gray-200"    
        >
            <FormHeading
                fieldName="Other Fields"
                isExpanded={isExpanded}
                onToggle={() => setIsExpanded(!isExpanded)}
            />

            {isExpanded && (
                <>
                    {/* Job Category */}
                    <form.Field
                        name="jobCategory"
                        children={(field: any) => {
                            return (
                                <div>
                                    <label htmlFor={field.name} className="text-sm text-gray-700">
                                        Job Category
                                    </label>
                                    <input
                                        id={field.name}
                                        name={field.name}
                                        value={field.state.value}
                                        onBlur={field.handleBlur}
                                        onChange={(e) => field.handleChange(e.target.value)}
                                        type="text"
                                        placeholder="Ex. Tech Team"
                                        className="text-sm font-light text-gray-500 ring-0 border border-gray-300 w-full py-2 px-3 rounded-lg mt-1"
                                    />
                                </div>
                            )
                        }}
                    />

                    {/* Education Required */}
                    <form.Field
                        name="educationRequired"
                        children={(field: any) => {
                            return (
                                <div>
                                    <label htmlFor={field.name} className="text-sm text-gray-700">
                                        Education Required
                                    </label>
                                    <select 
                                        id={field.name}
                                        name={field.name}
                                        value={field.state.value} 
                                        onBlur={field.handleBlur}
                                        onChange={(e) => field.handleChange(e.target.value)} 
                                        className="text-sm font-light text-gray-500 ring-0 border border-gray-300 w-full py-2 px-3 rounded-lg mt-1"
                                    >
                                        <option value="B.Tech">B.Tech</option>
                                        <option value="B.Sc">B.Sc</option>
                                        <option value="B.Com">B.Com</option>
                                    </select>
                                </div>
                            )
                        }}
                    />

                    {/* Perks */}
                    <form.Field
                        name="perks"
                        children={(field: any) => {
                            return (
                                <div>
                                    <label htmlFor={field.name} className="text-sm text-gray-700">Perks</label>
                                    <textarea
                                        id={field.name}
                                        name={field.name}
                                        value={field.state.value}
                                        onBlur={field.handleBlur}
                                        onChange={(e) => field.handleChange(e.target.value)}
                                        className="text-sm font-light text-gray-500 ring-0 border border-gray-300 w-full py-2 px-3 rounded-lg mt-1"
                                        placeholder="Compose an epic.."
                                    />
                                </div>
                            )
                        }}
                    />

                    {/* Application Instructions */}
                    <form.Field
                        name="appInstructions"
                        children={(field: any) => {
                            return (
                                <div>
                                    <label htmlFor={field.name} className="text-sm text-gray-700">Application Instructions</label>
                                    <textarea
                                        id={field.name}
                                        name={field.name}
                                        value={field.state.value}
                                        onBlur={field.handleBlur}
                                        onChange={(e) => field.handleChange(e.target.value)}
                                        className="text-sm font-light text-gray-500 ring-0 border border-gray-300 w-full py-2 px-3 rounded-lg mt-1"
                                        placeholder="Compose an epic.."
                                    />
                                </div>
                            )
                        }}
                    />

                    {/* Contact Person */}
                    <form.Field
                        name="contactPerson"
                        children={(field: any) => {
                            return (
                                <div>
                                    <label htmlFor={field.name} className="text-sm text-gray-700">
                                        Contact Person
                                    </label>
                                    <select 
                                        id={field.name}
                                        name={field.name}
                                        value={field.state.value} 
                                        onBlur={field.handleBlur}
                                        onChange={(e) => field.handleChange(e.target.value)} 
                                        className="text-sm font-light text-gray-500 ring-0 border border-gray-300 w-full py-2 px-3 rounded-lg mt-1"
                                    >
                                        <option value="John Doe">John Doe</option>
                                        <option value="Jane Doe">Jane Doe</option>
                                    </select>
                                </div>
                            )
                        }}
                    />

                    {/* Visa Sponsorship */}
                    <div>
                        <span className="text-sm text-gray-700">Will visa be sponsored?</span>
                        <div className="flex items-center gap-3 mt-1">
                        {['Yes', 'No', 'Not applicable'].map((option) => (
                                <form.Field
                                    key={option}
                                    name="visaSponsorship"
                                    children={(field: any) => (
                                        <label className="text-sm items-center flex gap-1.5 font-light text-gray-700">
                                            <input 
                                                type="radio"
                                                value={option}
                                                name={field.name} 
                                                onBlur={field.handleBlur}
                                                checked={field.state.value === option}
                                                onChange={(e) => field.handleChange(e.target.value)} 
                                                className="w-4 h-4 accent-blue-900"
                                            />
                                            {option}
                                        </label>
                                    )}
                                />
                            ))}
                        </div>
                    </div>

                    {/* Travel Requirements */}
                    <div>
                        <span className="text-sm text-gray-700">Job has travel requirements?</span>
                        <div className="flex items-center gap-3 mt-1">
                        {['Yes', 'No'].map((option) => (
                                <form.Field
                                    key={option}
                                    name="hasTravelRequirements"
                                    children={(field: any) => (
                                        <label className="text-sm items-center flex gap-1.5 font-light text-gray-700">
                                            <input 
                                                type="radio"
                                                value={option}
                                                name={field.name} 
                                                onBlur={field.handleBlur}
                                                checked={field.state.value === option}
                                                onChange={(e) => field.handleChange(e.target.value)} 
                                                className="w-4 h-4 accent-blue-900"
                                            />
                                            {option}
                                        </label>
                                    )}
                                />
                            ))}
                        </div>
                    </div>

                    {/* Attachment */}

                </>
            )}
        </section>
    )
}

export default OtherFields